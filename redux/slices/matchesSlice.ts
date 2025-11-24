// redux/slices/matchesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sportsService } from '../../services/api';

interface MatchesState {
  upcomingMatches: any[];
  recentMatches: any[];
  selectedMatch: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  upcomingMatches: [],
  recentMatches: [],
  selectedMatch: null,
  loading: false,
  error: null,
};

// Fetch upcoming matches
export const fetchUpcomingMatches = createAsyncThunk(
  'matches/fetchUpcoming',
  async (leagueId: string = '4328', { rejectWithValue }) => {
    try {
      const response = await sportsService.getUpcomingMatches(leagueId);
      
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch matches');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch matches');
    }
  }
);

// Fetch recent matches
export const fetchRecentMatches = createAsyncThunk(
  'matches/fetchRecent',
  async (leagueId: string = '4328', { rejectWithValue }) => {
    try {
      const response = await sportsService.getRecentMatches(leagueId);
      
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch matches');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch matches');
    }
  }
);

// Fetch match details
export const fetchMatchDetails = createAsyncThunk(
  'matches/fetchDetails',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await sportsService.getMatchDetails(eventId);
      
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch match details');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch match details');
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearMatchDetails: (state) => {
      state.selectedMatch = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch upcoming matches
    builder.addCase(fetchUpcomingMatches.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUpcomingMatches.fulfilled, (state, action) => {
      state.loading = false;
      state.upcomingMatches = action.payload;
    });
    builder.addCase(fetchUpcomingMatches.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch recent matches
    builder.addCase(fetchRecentMatches.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecentMatches.fulfilled, (state, action) => {
      state.loading = false;
      state.recentMatches = action.payload;
    });
    builder.addCase(fetchRecentMatches.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch match details
    builder.addCase(fetchMatchDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMatchDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedMatch = action.payload;
    });
    builder.addCase(fetchMatchDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearMatchDetails, clearError } = matchesSlice.actions;
export default matchesSlice.reducer;