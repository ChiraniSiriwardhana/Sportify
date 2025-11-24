import { useTheme } from '@/contexts/ThemeContext';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function TabBarBackground() {
  const { isDark } = useTheme();

  return (
    <BlurView
      intensity={80}
      tint={isDark ? 'dark' : 'light'}
      style={StyleSheet.absoluteFill}
    />
  );
}
