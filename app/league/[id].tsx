// app/league/[id].tsx
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
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
import {
    addFavorite,
    removeFavorite,
} from '../../redux/slices/favoritesSlice';
import {
    fetchRecentMatches,
    fetchUpcomingMatches,
} from '../../redux/slices/matchesSlice';

export default function LeagueDetailsScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { upcomingMatches, recentMatches, loading } = useAppSelector(
    (state) => state.matches
  );
  const { items: favorites } = useAppSelector((state) => state.favorites);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'recent'>(
    'upcoming'
  );

  const loadMatches = useCallback(() => {
    if (id) {
      dispatch(fetchUpcomingMatches(id as string));
      dispatch(fetchRecentMatches(id as string));
    }
  }, [dispatch, id]);

  // Reload matches when league ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchUpcomingMatches(id as string));
      dispatch(fetchRecentMatches(id as string));
    }
  }, [id, dispatch]);

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
    } else {
      dispatch(addFavorite(match));
    }
  };

  const displayMatches =
    selectedTab === 'upcoming' ? upcomingMatches : recentMatches;

  if (loading && displayMatches.length === 0) {
    return <LoadingSpinner message={`Loading ${name} matches...`} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      {/* Header */}
      <LinearGradient
        colors={[theme.primary, theme.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {name || 'League'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {displayMatches.length} matches
          </Text>
        </View>

        <View style={styles.backButton} />
      </LinearGradient>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'upcoming' && {
              borderBottomColor: theme.primary,
            },
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === 'upcoming'
                    ? theme.primary
                    : theme.textSecondary,
              },
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'recent' && {
              borderBottomColor: theme.primary,
            },
          ]}
          onPress={() => setSelectedTab('recent')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === 'recent'
                    ? theme.primary
                    : theme.textSecondary,
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
          title={`No ${selectedTab} matches`}
          message={`There are no ${selectedTab} matches for this league at the moment.`}
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
              isFavorite={favorites.some((fav) => fav.idEvent === item.idEvent)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {loading && displayMatches.length > 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={theme.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: 'rgba(255,255,255,0.9)',
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
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingOverlay: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
