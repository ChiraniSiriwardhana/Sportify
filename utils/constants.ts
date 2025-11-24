// utils/constants.ts

export const APP_NAME = 'Sportify';
export const APP_VERSION = '1.0.0';

// Popular league IDs from TheSportsDB
export const LEAGUES = {
  PREMIER_LEAGUE: '4328',      // English Premier League
  LA_LIGA: '4335',             // Spanish La Liga
  SERIE_A: '4332',             // Italian Serie A
  BUNDESLIGA: '4331',          // German Bundesliga
  LIGUE_1: '4334',             // French Ligue 1
  NBA: '4387',                 // NBA
  NFL: '4391',                 // NFL
  MLB: '4424',                 // MLB
  NHL: '4380',                 // NHL
};

export const LEAGUE_NAMES: { [key: string]: string } = {
  '4328': 'Premier League',
  '4335': 'La Liga',
  '4332': 'Serie A',
  '4331': 'Bundesliga',
  '4334': 'Ligue 1',
  '4387': 'NBA',
  '4391': 'NFL',
  '4424': 'MLB',
  '4380': 'NHL',
};

export const MATCH_STATUS = {
  UPCOMING: 'Not Started',
  LIVE: 'In Play',
  FINISHED: 'Match Finished',
  POSTPONED: 'Postponed',
  CANCELLED: 'Cancelled',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  LOGIN_FAILED: 'Invalid username or password.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  FETCH_FAILED: 'Failed to load data. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites!',
};

// Dummy credentials for testing (DummyJSON API)
export const DEMO_CREDENTIALS = {
  username: 'emilys',
  password: 'emilyspass',
};

export const SCREEN_NAMES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
  MATCHES: 'Matches',
  FAVORITES: 'Favorites',
  PROFILE: 'Profile',
  MATCH_DETAILS: 'MatchDetails',
  TEAM_DETAILS: 'TeamDetails',
};

export default {
  APP_NAME,
  APP_VERSION,
  LEAGUES,
  LEAGUE_NAMES,
  MATCH_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEMO_CREDENTIALS,
  SCREEN_NAMES,
};