// utils/constants.ts

export const APP_NAME = 'Sportify';
export const APP_VERSION = '1.0.0';

// Dummy credentials for testing (DummyJSON API)
export const DEMO_CREDENTIALS = {
  username: 'emilys',
  password: 'emilyspass',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  LOGIN_FAILED: 'Invalid username or password.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
};

export default {
  APP_NAME,
  APP_VERSION,
  DEMO_CREDENTIALS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};