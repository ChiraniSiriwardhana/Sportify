// 

// styles/colors.ts

export const lightColors = {
  // Background colors
  background: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  backgroundTertiary: '#f9f9f9',
  
  // Text colors
  text: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  // Primary colors
  primary: '#007AFF',
  primaryLight: '#4A9EFF',
  primaryDark: '#0051D5',
  
  // Accent colors
  success: '#4CAF50',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
  
  // UI elements
  card: '#ffffff',
  border: '#dddddd',
  borderLight: '#f0f0f0',
  shadow: '#000000',
  
  // Input colors
  inputBackground: '#f9f9f9',
  inputBorder: '#dddddd',
  inputText: '#1a1a1a',
  inputPlaceholder: '#999999',
  
  // Tab bar
  tabBarBackground: '#ffffff',
  tabBarActiveTint: '#007AFF',
  tabBarInactiveTint: '#8e8e93',
  
  // ============================================
  // NEW: Additional Vibrant Colors for Sports App
  // ============================================
  
  // Extended accent colors
  purple: '#9c27b0',
  pink: '#E91E63',
  orange: '#FF5722',
  teal: '#009688',
  indigo: '#3F51B5',
  lime: '#CDDC39',
  
  // Match status colors - VIBRANT & CLEAR
  liveMatch: '#FF1744',        // Bright red - LIVE NOW!
  upcomingMatch: '#00E676',    // Bright green - Coming up
  finishedMatch: '#9E9E9E',    // Gray - Completed
  todayMatch: '#FF6F00',       // Bright orange - Today
  
  // Sport-specific colors
  football: '#00B140',         // Football field green
  trophy: '#FFD700',           // Gold trophy
  medal: '#C0C0C0',            // Silver medal
  stadium: '#1976D2',          // Blue stadium
  
  // League-specific accent colors (for league cards)
  premierLeague: '#3D195B',    // Premier League purple
  laLiga: '#EE8707',           // La Liga orange
  bundesliga: '#D20515',       // Bundesliga red
  serieA: '#024494',           // Serie A blue
  ligue1: '#DAE025',           // Ligue 1 yellow-green
  championsLeague: '#00326E',  // Champions League dark blue
  
  // Gradient colors
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
};

export const darkColors = {
  // Background colors
  background: '#000000',
  backgroundSecondary: '#1c1c1e',
  backgroundTertiary: '#2c2c2e',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#ebebf5',
  textTertiary: '#8e8e93',
  
  // Primary colors
  primary: '#0A84FF',
  primaryLight: '#409CFF',
  primaryDark: '#0040DD',
  
  // Accent colors
  success: '#32D74B',
  error: '#FF453A',
  warning: '#FF9F0A',
  info: '#0A84FF',
  
  // UI elements
  card: '#1c1c1e',
  border: '#38383a',
  borderLight: '#2c2c2e',
  shadow: '#000000',
  
  // Input colors
  inputBackground: '#1c1c1e',
  inputBorder: '#38383a',
  inputText: '#ffffff',
  inputPlaceholder: '#8e8e93',
  
  // Tab bar
  tabBarBackground: '#1c1c1e',
  tabBarActiveTint: '#0A84FF',
  tabBarInactiveTint: '#8e8e93',
  
  // ============================================
  // NEW: Additional Vibrant Colors for Sports App (Dark Mode Adjusted)
  // ============================================
  
  // Extended accent colors - brighter for dark backgrounds
  purple: '#AB47BC',
  pink: '#EC407A',
  orange: '#FF7043',
  teal: '#26A69A',
  indigo: '#5C6BC0',
  lime: '#D4E157',
  
  // Match status colors - adjusted for dark mode visibility
  liveMatch: '#FF5252',        // Bright red
  upcomingMatch: '#69F0AE',    // Bright green
  finishedMatch: '#757575',    // Medium gray
  todayMatch: '#FFAB40',       // Bright orange
  
  // Sport-specific colors
  football: '#00C853',         // Bright green
  trophy: '#FFD700',           // Gold (same in both modes)
  medal: '#E0E0E0',            // Light silver
  stadium: '#42A5F5',          // Light blue
  
  // League-specific accent colors (slightly brighter for dark mode)
  premierLeague: '#7E57C2',    // Lighter purple
  laLiga: '#FFA726',           // Lighter orange
  bundesliga: '#EF5350',       // Lighter red
  serieA: '#42A5F5',           // Lighter blue
  ligue1: '#DCE775',           // Lighter yellow-green
  championsLeague: '#5C6BC0',  // Lighter dark blue
  
  // Gradient colors (same in both modes)
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
};

export type Theme = typeof lightColors;

// Helper function to add opacity to any color
export const addOpacity = (color: string, opacity: number): string => {
  // Convert opacity (0-1) to hex (00-FF)
  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `${color}${opacityHex}`;
};

// Preset color combinations for common use cases
export const colorPresets = {
  // Light backgrounds for colored elements
  successLight: (theme: Theme) => addOpacity(theme.success, 0.1),
  errorLight: (theme: Theme) => addOpacity(theme.error, 0.1),
  warningLight: (theme: Theme) => addOpacity(theme.warning, 0.1),
  infoLight: (theme: Theme) => addOpacity(theme.info, 0.1),
  primaryLight: (theme: Theme) => addOpacity(theme.primary, 0.1),
  
  // Medium backgrounds
  successMedium: (theme: Theme) => addOpacity(theme.success, 0.2),
  errorMedium: (theme: Theme) => addOpacity(theme.error, 0.2),
  warningMedium: (theme: Theme) => addOpacity(theme.warning, 0.2),
  infoMedium: (theme: Theme) => addOpacity(theme.info, 0.2),
  primaryMedium: (theme: Theme) => addOpacity(theme.primary, 0.2),
};

export default {
  light: lightColors,
  dark: darkColors,
};