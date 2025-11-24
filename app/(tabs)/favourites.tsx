// // app/(tabs)/favorites.tsx
// import { useRouter } from 'expo-router';
// import React, { useEffect } from 'react';
// import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
// import EmptyState from '../../components/EmptyState';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import MatchCard from '../../components/MatchCard';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { loadFavorites, removeFavorite } from '../../redux/slices/favoritesSlice';

// export default function FavoritesScreen() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { items: favorites, loading } = useAppSelector((state) => state.favorites);

//   useEffect(() => {
//     dispatch(loadFavorites());
//   }, [dispatch]);

//   const handleMatchPress = (matchId: string) => {
//     router.push(`/match/${matchId}` as any);
//   };

//   const handleRemoveFavorite = (match: any) => {
//     Alert.alert(
//       'Remove Favorite',
//       `Remove ${match.strEvent} from favorites?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => {
//             dispatch(removeFavorite(match.idEvent));
//             Alert.alert('Removed', 'Removed from favorites');
//           },
//         },
//       ]
//     );
//   };

//   if (loading) {
//     return <LoadingSpinner message="Loading favorites..." />;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Favorites</Text>
//         <Text style={styles.count}>
//           {favorites.length} {favorites.length === 1 ? 'match' : 'matches'}
//         </Text>
//       </View>

//       {favorites.length === 0 ? (
//         <EmptyState
//           icon="heart"
//           title="No favorites yet"
//           message="Matches you favorite will appear here"
//         />
//       ) : (
//         <FlatList
//           data={favorites}
//           keyExtractor={(item) => item.idEvent}
//           renderItem={({ item }) => (
//             <MatchCard
//               match={item}
//               onPress={() => handleMatchPress(item.idEvent)}
//               onFavoritePress={() => handleRemoveFavorite(item)}
//               isFavorite={true}
//             />
//           )}
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
//     backgroundColor: '#fff',
//     padding: 20,
//     paddingTop: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//   },
//   count: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   listContent: {
//     paddingVertical: 8,
//   },
// });

// app/(tabs)/favorites.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import MatchCard from '../../components/MatchCard';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loadFavorites, removeFavorite } from '../../redux/slices/favoritesSlice';

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { items: favorites, loading } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleMatchPress = (matchId: string) => {
    router.push(`/match/${matchId}`);
  };

  const handleRemoveFavorite = (match: any) => {
    Alert.alert(
      'Remove Favorite',
      `Remove ${match.strEvent} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFavorite(match.idEvent));
            Alert.alert('Removed', 'Removed from favorites');
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading favorites..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      <LinearGradient
        colors={[theme.primary, theme.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>🤍 Favourites</Text>
        <Text style={styles.count}>
          {favorites.length} {favorites.length === 1 ? 'match' : 'matches'}
        </Text>
      </LinearGradient>

      {favorites.length === 0 ? (
        <EmptyState
          icon="heart"
          title="No favorites yet"
          message="Matches you favorite will appear here"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idEvent}
          renderItem={({ item }) => (
            <MatchCard
              match={item}
              onPress={() => handleMatchPress(item.idEvent)}
              onFavoritePress={() => handleRemoveFavorite(item)}
              isFavorite={true}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  count: {
    fontSize: 14,
    marginTop: 4,
    color: 'rgba(255,255,255,0.9)',
  },
  listContent: {
    paddingVertical: 8,
  },
});
