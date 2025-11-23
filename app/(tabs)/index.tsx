// app/(tabs)/index.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { checkAuth, logout } from '../../redux/slices/authSlice';

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    // Check if user is authenticated on mount
    dispatch(checkAuth()).then((result: any) => {
      if (!result.payload) {
        // Not authenticated, redirect to login
        router.replace('/(auth)/login');
      }
    });
  }, [dispatch, router]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  if (loading || !isAuthenticated) {
    return <LoadingSpinner message="Loading..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.username}>
          {user?.firstName || user?.username || 'User'}!
        </Text>
      </View>

      <View style={styles.content}>
        <Feather name="check-circle" size={80} color="#4CAF50" />
        <Text style={styles.successTitle}>Login Successful!</Text>
        <Text style={styles.successMessage}>
          You&apos;re now logged in to Sportify
        </Text>

        <View style={styles.userCard}>
          <View style={styles.userRow}>
            <Feather name="user" size={20} color="#666" />
            <Text style={styles.userLabel}>Username:</Text>
            <Text style={styles.userValue}>{user?.username}</Text>
          </View>

          {user?.email && (
            <View style={styles.userRow}>
              <Feather name="mail" size={20} color="#666" />
              <Text style={styles.userLabel}>Email:</Text>
              <Text style={styles.userValue}>{user?.email}</Text>
            </View>
          )}

          {user?.firstName && (
            <View style={styles.userRow}>
              <Feather name="user" size={20} color="#666" />
              <Text style={styles.userLabel}>Name:</Text>
              <Text style={styles.userValue}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 24,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    marginRight: 8,
  },
  userValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});