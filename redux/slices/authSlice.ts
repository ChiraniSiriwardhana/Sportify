// redux/slices/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/api';
import {
    clearAuthData,
    getUserData,
    getUserToken,
    saveUserData,
    saveUserToken
} from '../../services/storage';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(username, password);
      
      if (response.success && response.data) {
        // DummyJSON API returns 'accessToken', normalize to 'token'
        const token = response.data.accessToken || response.data.token;
        
        console.log('Login response data:', JSON.stringify(response.data, null, 2));
        console.log('Extracted token:', token, 'Type:', typeof token);
        
        if (!token) {
          return rejectWithValue('No token received from server');
        }
        
        // Save to storage
        const tokenSaved = await saveUserToken(token);
        const dataSaved = await saveUserData({ ...response.data, token });
        
        if (!tokenSaved || !dataSaved) {
          console.warn('Failed to save auth data to storage, but login was successful');
        }
        
        return { ...response.data, token };
      } else {
        return rejectWithValue(response.error || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const register = createAsyncThunk(
  'auth/register',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.register(username, email, password);
      
      if (response.success && response.data) {
        // Save to storage
        const tokenSaved = await saveUserToken(response.data.token);
        const dataSaved = await saveUserData(response.data);
        
        if (!tokenSaved || !dataSaved) {
          console.warn('Failed to save auth data to storage, but registration was successful');
        }
        
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Registration failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk to check if user is already logged in
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = await getUserToken();
  const userData = await getUserData();
  
  if (token && userData) {
    return { token, user: userData };
  }
  
  return null;
});

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await clearAuthData();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Check Auth
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;