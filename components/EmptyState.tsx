// // components/EmptyState.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Feather } from '@expo/vector-icons';


// interface EmptyStateProps {
//   icon?: keyof typeof Feather.glyphMap;
//   title: string;
//   message?: string;
// }

// const EmptyState: React.FC<EmptyStateProps> = ({
//   icon = 'inbox',
//   title,
//   message,
// }) => {
//   return (
//     <View style={styles.container}>
//       <Feather name={icon} size={64} color="#ccc" />
//       <Text style={styles.title}>{title}</Text>
//       {message && <Text style={styles.message}>{message}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 32,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   message: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
// });

// export default EmptyState;

// components/EmptyState.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface EmptyStateProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  message,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Feather name={icon} size={64} color={theme.textTertiary} />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {message && (
        <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;