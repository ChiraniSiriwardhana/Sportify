// services/api.ts
import axios from 'axios';

const AUTH_API_BASE_URL = 'https://dummyjson.com';
const SPORTS_API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

const sportsApi = axios.create({
  baseURL: SPORTS_API_BASE_URL,
  timeout: 10000,
});


const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  timeout: 10000,
});

export interface LoginResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface Match {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strLeague: string;
  strThumb?: string;
  strStatus?: string;
}

// ============ Authentication APIs ============
export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await authApi.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  register: async (username: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      return {
        success: true,
        data: {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email,
          firstName: username,
          lastName: 'User',
          token: 'mock_token_' + Date.now(),
        },
      };
    } catch {
      return {
        success: false,
        error: 'Registration failed',
      };
    }
  },
};

// ============ Sports APIs ============
export const sportsService = {
  getUpcomingMatches: async (leagueId: string = '4328') => {
    try {
      const response = await sportsApi.get(`/eventsnextleague.php?id=${leagueId}`);
      return {
        success: true,
        data: response.data.events || [],
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch matches',
        data: [],
      };
    }
  },

  getRecentMatches: async (leagueId: string = '4328') => {
    try {
      const response = await sportsApi.get(`/eventspastleague.php?id=${leagueId}`);
      return {
        success: true,
        data: response.data.events || [],
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch recent matches',
        data: [],
      };
    }
  },

  getMatchDetails: async (eventId: string) => {
    try {
      const response = await sportsApi.get(`/lookupevent.php?id=${eventId}`);
      return {
        success: true,
        data: response.data.events?.[0] || null,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch match details',
        data: null,
      };
    }
  },

  searchTeams: async (teamName: string) => {
    try {
      const response = await sportsApi.get(`/searchteams.php?t=${teamName}`);
      return {
        success: true,
        data: response.data.teams || [],
      };
    } catch {
      return {
        success: false,
        error: 'Failed to search teams',
        data: [],
      };
    }
  },

  getTeamDetails: async (teamId: string) => {
    try {
      const response = await sportsApi.get(`/lookupteam.php?id=${teamId}`);
      return {
        success: true,
        data: response.data.teams?.[0] || null,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch team details',
        data: null,
      };
    }
  },
};

export default {
  authService,
  sportsService,
};