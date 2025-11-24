// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEYS = {
  USER_TOKEN: 'sportify_user_token',
  USER_DATA: '@sportify_user_data',
  FAVORITES: '@sportify_favorites',
  THEME: '@sportify_theme',

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

// ============ Favorites Storage ============
export const saveFavorites = async (favorites: any[]): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(KEYS.FAVORITES, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving favorites:', error);
    return false;
  }
};

export const getFavorites = async (): Promise<any[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.FAVORITES);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = async (item: any) => {
  try {
    const favorites = await getFavorites();
    const isAlreadyFavorite = favorites.some((fav: any) => fav.idEvent === item.idEvent);
    
    if (!isAlreadyFavorite) {
      favorites.push(item);
      await saveFavorites(favorites);
      return { success: true, favorites };
    }
    
    return { success: false, message: 'Already in favorites' };
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return { success: false, error };
  }
};

export const removeFromFavorites = async (itemId: string) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter((fav: any) => fav.idEvent !== itemId);
    await saveFavorites(updatedFavorites);
    return { success: true, favorites: updatedFavorites };
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return { success: false, error };
  }
};

// ============ Theme Storage ============
export const saveTheme = async (theme: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(KEYS.THEME, theme);
    return true;
  } catch (error) {
    console.error('Error saving theme:', error);
    return false;
  }
};

export const getTheme = async (): Promise<string> => {
  try {
    const theme = await AsyncStorage.getItem(KEYS.THEME);
    return theme || 'light';
  } catch (error) {
    console.error('Error getting theme:', error);
    return 'light';
  }
};

export default {
  saveUserToken,
  getUserToken,
  saveUserData,
  getUserData,
  clearAuthData,
  saveFavorites,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  saveTheme,
  getTheme,
};