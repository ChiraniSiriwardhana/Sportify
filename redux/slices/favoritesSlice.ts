// redux/slices/favoritesSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToFavorites, getFavorites, removeFromFavorites } from '../../services/storage';

interface FavoritesState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

// Load favorites from storage
export const loadFavorites = createAsyncThunk('favorites/load', async () => {
  const favorites = await getFavorites();
  return favorites;
});

// Add to favorites
export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (item: any, { rejectWithValue }) => {
    try {
      const result = await addToFavorites(item);
      
      if (result.success) {
        return result.favorites;
      } else {
        return rejectWithValue(result.message || 'Failed to add favorite');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add favorite');
    }
  }
);

// Remove from favorites
export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (itemId: string, { rejectWithValue }) => {
    try {
      const result = await removeFromFavorites(itemId);
      
      if (result.success) {
        return result.favorites;
      } else {
        return rejectWithValue('Failed to remove favorite');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove favorite');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load favorites
    builder.addCase(loadFavorites.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload || [];
    });
    builder.addCase(loadFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load favorites';
    });

    // Add favorite
    builder.addCase(addFavorite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload || [];
    });
    builder.addCase(addFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Remove favorite
    builder.addCase(removeFavorite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload || [];
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;