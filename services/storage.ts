// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEYS = {
  USER_TOKEN: 'sportify_user_token',
  USER_DATA: '@sportify_user_data',
};

// Use SecureStore for sensitive data (tokens) on native, AsyncStorage for web
const isWeb = Platform.OS === 'web';

// ============ Authentication Storage ============
export const saveUserToken = async (token: string): Promise<boolean> => {
  try {
    // Validate token exists and is not undefined/null
    if (!token || token === 'undefined' || token === 'null') {
      console.error('Invalid token provided:', token);
      return false;
    }
    
    // Ensure token is a proper string
    const tokenString = String(token).trim();
    
    if (tokenString.length === 0) {
      console.error('Empty token string');
      return false;
    }
    
    console.log('Saving token, length:', tokenString.length);
    
    if (isWeb) {
      await AsyncStorage.setItem(KEYS.USER_TOKEN, tokenString);
    } else {
      await SecureStore.setItemAsync(KEYS.USER_TOKEN, tokenString);
    }
    return true;
  } catch (error) {
    console.error('Error saving token to storage:', error);
    return false;
  }
};

export const getUserToken = async (): Promise<string | null> => {
  try {
    if (isWeb) {
      return await AsyncStorage.getItem(KEYS.USER_TOKEN);
    } else {
      return await SecureStore.getItemAsync(KEYS.USER_TOKEN);
    }
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const saveUserData = async (userData: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(KEYS.USER_DATA, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

export const getUserData = async (): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.USER_DATA);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const clearAuthData = async (): Promise<boolean> => {
  try {
    if (isWeb) {
      await AsyncStorage.multiRemove([KEYS.USER_TOKEN, KEYS.USER_DATA]);
    } else {
      await SecureStore.deleteItemAsync(KEYS.USER_TOKEN);
      await AsyncStorage.removeItem(KEYS.USER_DATA);
    }
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};

export default {
  saveUserToken,
  getUserToken,
  saveUserData,
  getUserData,
  clearAuthData,
};