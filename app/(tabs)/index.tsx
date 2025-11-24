// // app/(tabs)/index.tsx
// import { Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import EmptyState from '../../components/EmptyState';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import MatchCard from '../../components/MatchCard';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { checkAuth, logout } from '../../redux/slices/authSlice';
// import { addFavorite, loadFavorites, removeFavorite } from '../../redux/slices/favoritesSlice';
// import { fetchRecentMatches, fetchUpcomingMatches } from '../../redux/slices/matchesSlice';
// import { LEAGUES } from '../../utils/constants';

// export default function HomeScreen() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
  
//   const { isAuthenticated, user } = useAppSelector((state) => state.auth);
//   const { upcomingMatches, recentMatches, loading } = useAppSelector((state) => state.matches);
//   const { items: favorites } = useAppSelector((state) => state.favorites);
  
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedTab, setSelectedTab] = useState<'upcoming' | 'recent'>('upcoming');

//   useEffect(() => {
//     // Check if user is authenticated
//     dispatch(checkAuth()).then((result: any) => {
//       if (!result.payload) {
//         router.replace('/(auth)/login');
//       }
//     });
//   }, [dispatch, router]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadMatches();
//       dispatch(loadFavorites());
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAuthenticated]);

//   const loadMatches = () => {
//     dispatch(fetchUpcomingMatches(LEAGUES.PREMIER_LEAGUE));
//     dispatch(fetchRecentMatches(LEAGUES.PREMIER_LEAGUE));
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadMatches();
//     setRefreshing(false);
//   };

//   const handleMatchPress = (matchId: string) => {
//     router.push(`/match/${matchId}` as any);
//   };

//   const handleFavoritePress = (match: any) => {
//     const isFavorite = favorites.some((fav) => fav.idEvent === match.idEvent);
    
//     if (isFavorite) {
//       dispatch(removeFavorite(match.idEvent));
//       Alert.alert('Removed', 'Removed from favorites');
//     } else {
//       dispatch(addFavorite(match));
//       Alert.alert('Added', 'Added to favorites');
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: () => {
//           dispatch(logout());
//           router.replace('/(auth)/login');
//         },
//       },
//     ]);
//   };

//   const displayMatches = selectedTab === 'upcoming' ? upcomingMatches : recentMatches;

//   if (!isAuthenticated) {
//     return <LoadingSpinner message="Checking authentication..." />;
//   }

//   if (loading && displayMatches.length === 0) {
//     return <LoadingSpinner message="Loading matches..." />;
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Welcome back,</Text>
//           <Text style={styles.username}>{user?.firstName || user?.username || 'User'}</Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Feather name="log-out" size={24} color="#FF3B30" />
//         </TouchableOpacity>
//       </View>

//       {/* Tab Selector */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
//           onPress={() => setSelectedTab('upcoming')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
//             Upcoming
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'recent' && styles.activeTab]}
//           onPress={() => setSelectedTab('recent')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'recent' && styles.activeTabText]}>
//             Recent
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Matches List */}
//       {displayMatches.length === 0 ? (
//         <EmptyState
//           icon="calendar"
//           title="No matches found"
//           message="Check back later for updates"
//         />
//       ) : (
//         <FlatList
//           data={displayMatches}
//           keyExtractor={(item) => item.idEvent}
//           renderItem={({ item }) => (
//             <MatchCard
//               match={item}
//               onPress={() => handleMatchPress(item.idEvent)}
//               onFavoritePress={() => handleFavoritePress(item)}
//               isFavorite={favorites.some((fav) => fav.idEvent === item.idEvent)}
//             />
//           )}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           contentContainerStyle={styles.listContent}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: '#fff',
//   },
//   greeting: {
//     fontSize: 14,
//     color: '#666',
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//     marginTop: 4,
//   },
//   logoutButton: {
//     padding: 8,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingBottom: 16,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//     marginHorizontal: 4,
//   },
//   activeTab: {
//     borderBottomColor: '#007AFF',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   listContent: {
//     paddingVertical: 8,
//   },
// });

// app/(tabs)/index.tsx
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import MatchCard from '../../components/MatchCard';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { checkAuth } from '../../redux/slices/authSlice';
import {
  addFavorite,
  loadFavorites,
  removeFavorite,
} from '../../redux/slices/favoritesSlice';
import {
  fetchRecentMatches,
  fetchUpcomingMatches,
} from '../../redux/slices/matchesSlice';
import { LEAGUES } from '../../utils/constants';

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { upcomingMatches, recentMatches, loading } = useAppSelector(
    (state) => state.matches
  );
  const { items: favorites } = useAppSelector((state) => state.favorites);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'recent'>(
    'upcoming'
  );

  // Load matches function with useCallback
  const loadMatches = useCallback(() => {
    dispatch(fetchUpcomingMatches(LEAGUES.PREMIER_LEAGUE));
    dispatch(fetchRecentMatches(LEAGUES.PREMIER_LEAGUE));
  }, [dispatch]);

  // Authentication check
  useEffect(() => {
    dispatch(checkAuth()).then((result: any) => {
      if (!result.payload) {
        router.replace('/(auth)/login');
      }
    });
  }, [dispatch, router]);

  // Load matches + favorites after login
  useEffect(() => {
    if (isAuthenticated) {
      loadMatches();
      dispatch(loadFavorites());
    }
  }, [isAuthenticated, dispatch, loadMatches]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMatches();
    setRefreshing(false);
  };

  const handleMatchPress = (matchId: string) => {
    router.push(`/match/${matchId}`);
  };

  const handleFavoritePress = (match: any) => {
    const isFavorite = favorites.some((fav) => fav.idEvent === match.idEvent);

    if (isFavorite) {
      dispatch(removeFavorite(match.idEvent));
      Alert.alert('Removed', 'Removed from favorites');
    } else {
      dispatch(addFavorite(match));
      Alert.alert('Added', 'Added to favorites');
    }
  };

  const displayMatches =
    selectedTab === 'upcoming' ? upcomingMatches : recentMatches;

  if (!isAuthenticated) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (loading && displayMatches.length === 0) {
    return <LoadingSpinner message="Loading matches..." />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundSecondary },
      ]}
    >
      {/* Header with Gradient */}
      <LinearGradient
        colors={[theme.primary, theme.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View>
          <Text style={[styles.greeting, { color: 'rgba(255,255,255,0.9)' }]}>
            Welcome back,
          </Text>
          <Text style={[styles.username, { color: '#ffffff' }]}>
            {user?.firstName || user?.username || 'User'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <View style={styles.profileIcon}>
            <Feather name="user" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'upcoming' && { borderBottomColor: theme.upcomingMatch },
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === 'upcoming'
                    ? theme.upcomingMatch
                    : theme.textSecondary,
                fontWeight: selectedTab === 'upcoming' ? '700' : '500',
              },
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'recent' && { borderBottomColor: theme.finishedMatch },
          ]}
          onPress={() => setSelectedTab('recent')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === 'recent'
                    ? theme.finishedMatch
                    : theme.textSecondary,
                fontWeight: selectedTab === 'recent' ? '700' : '500',
              },
            ]}
          >
            Recent
          </Text>
        </TouchableOpacity>
      </View>

      {/* Matches List */}
      {displayMatches.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No matches found"
          message="Check back later for updates"
        />
      ) : (
        <FlatList
          data={displayMatches}
          keyExtractor={(item) => item.idEvent}
          renderItem={({ item }) => (
            <MatchCard
              match={item}
              onPress={() => handleMatchPress(item.idEvent)}
              onFavoritePress={() => handleFavoritePress(item)}
              isFavorite={favorites.some(
                (fav) => fav.idEvent === item.idEvent
              )}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    padding: 20,
  },

  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },

  profileButton: {
    padding: 4,
  },

  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    marginHorizontal: 4,
  },

  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },

  listContent: {
    paddingVertical: 8,
  },
});
