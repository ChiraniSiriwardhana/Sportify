// // app/match/[id].tsx
// import { Feather } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
// import { fetchMatchDetails } from '../../redux/slices/matchesSlice';

// export default function MatchDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const { selectedMatch, loading } = useAppSelector((state) => state.matches);
//   const { items: favorites } = useAppSelector((state) => state.favorites);

//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchMatchDetails(id as string));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (selectedMatch) {
//       setIsFavorite(favorites.some((fav) => fav.idEvent === selectedMatch.idEvent));
//     }
//   }, [selectedMatch, favorites]);

//   const handleFavoritePress = () => {
//     if (!selectedMatch) return;

//     if (isFavorite) {
//       dispatch(removeFavorite(selectedMatch.idEvent));
//       Alert.alert('Removed', 'Removed from favorites');
//     } else {
//       dispatch(addFavorite(selectedMatch));
//       Alert.alert('Added', 'Added to favorites');
//     }
//   };

//   if (loading || !selectedMatch) {
//     return <LoadingSpinner message="Loading match details..." />;
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const hasScore =
//     selectedMatch.intHomeScore !== null && selectedMatch.intAwayScore !== null;

//   return (
//     <View style={styles.container}>
//       {/* Fixed Header */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => router.back()} 
//           style={styles.backButton}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         >
//           <Feather name="arrow-left" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Match Details</Text>
//         <TouchableOpacity 
//           onPress={handleFavoritePress} 
//           style={styles.favoriteButton}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         >
//           <Feather
//             name="heart"
//             size={24}
//             color={isFavorite ? '#FF3B30' : '#fff'}
//             fill={isFavorite ? '#FF3B30' : 'none'}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Scrollable Content */}
//       <ScrollView style={styles.content}>

//       {/* Match Info Card */}
//       <View style={styles.matchCard}>
//         <Text style={styles.league}>{selectedMatch.strLeague}</Text>

//         {/* Teams and Score */}
//         <View style={styles.teamsContainer}>
//           <View style={styles.teamSection}>
//             <Text style={styles.teamName}>{selectedMatch.strHomeTeam}</Text>
//             {hasScore && <Text style={styles.score}>{selectedMatch.intHomeScore}</Text>}
//           </View>

//           <View style={styles.vsSection}>
//             <Text style={styles.vsText}>{hasScore ? ':' : 'VS'}</Text>
//           </View>

//           <View style={styles.teamSection}>
//             <Text style={styles.teamName}>{selectedMatch.strAwayTeam}</Text>
//             {hasScore && <Text style={styles.score}>{selectedMatch.intAwayScore}</Text>}
//           </View>
//         </View>

//         {/* Date and Time */}
//         <View style={styles.dateTimeContainer}>
//           <Feather name="calendar" size={16} color="#666" />
//           <Text style={styles.dateText}>{formatDate(selectedMatch.dateEvent)}</Text>
//         </View>

//         {selectedMatch.strTime && (
//           <View style={styles.dateTimeContainer}>
//             <Feather name="clock" size={16} color="#666" />
//             <Text style={styles.dateText}>{selectedMatch.strTime} Local Time</Text>
//           </View>
//         )}

//         {selectedMatch.strStatus && (
//           <View style={styles.statusContainer}>
//             <Text style={styles.statusLabel}>Status:</Text>
//             <Text style={styles.statusValue}>{selectedMatch.strStatus}</Text>
//           </View>
//         )}
//       </View>

//       {/* Match Details */}
//       <View style={styles.detailsCard}>
//         <Text style={styles.sectionTitle}>Match Information</Text>

//         {selectedMatch.strVenue && (
//           <DetailRow icon="map-pin" label="Venue" value={selectedMatch.strVenue} />
//         )}

//         {selectedMatch.strSeason && (
//           <DetailRow icon="award" label="Season" value={selectedMatch.strSeason} />
//         )}

//         {selectedMatch.intRound && (
//           <DetailRow icon="activity" label="Round" value={`Round ${selectedMatch.intRound}`} />
//         )}

//         {selectedMatch.strCountry && (
//           <DetailRow icon="globe" label="Country" value={selectedMatch.strCountry} />
//         )}
//       </View>

//       {/* Description */}
//       {selectedMatch.strDescriptionEN && (
//         <View style={styles.detailsCard}>
//           <Text style={styles.sectionTitle}>About</Text>
//           <Text style={styles.description}>{selectedMatch.strDescriptionEN}</Text>
//         </View>
//       )}
//     </ScrollView>
//     </View>
//   );
// }

// // Helper Component
// const DetailRow = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
//   <View style={styles.detailRow}>
//     <View style={styles.detailLabel}>
//       <Feather name={icon} size={18} color="#666" />
//       <Text style={styles.detailLabelText}>{label}</Text>
//     </View>
//     <Text style={styles.detailValue}>{value}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#007AFF',
//     paddingTop: 50,
//     paddingBottom: 16,
//     paddingHorizontal: 16,
//   },
//   content: {
//     flex: 1,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   favoriteButton: {
//     padding: 8,
//   },
//   matchCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 20,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   league: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   teamsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   teamSection: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   teamName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
//   score: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   vsSection: {
//     marginHorizontal: 16,
//   },
//   vsText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#999',
//   },
//   dateTimeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#666',
//     marginLeft: 8,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   statusLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 8,
//   },
//   statusValue: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   detailsCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 20,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     marginBottom: 16,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   detailLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   detailLabelText: {
//     fontSize: 14,
//     color: '#666',
//     marginLeft: 8,
//   },
//   detailValue: {
//     fontSize: 14,
//     color: '#1a1a1a',
//     fontWeight: '500',
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 22,
//   },
// });

// app/match/[id].tsx
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
import { fetchMatchDetails } from '../../redux/slices/matchesSlice';

export default function MatchDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { selectedMatch, loading } = useAppSelector((state) => state.matches);
  const { items: favorites } = useAppSelector((state) => state.favorites);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMatchDetails(id as string));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedMatch) {
      setIsFavorite(favorites.some((fav) => fav.idEvent === selectedMatch.idEvent));
    }
  }, [selectedMatch, favorites]);

  const handleFavoritePress = () => {
    if (!selectedMatch) return;

    if (isFavorite) {
      dispatch(removeFavorite(selectedMatch.idEvent));
      Alert.alert('Removed', 'Removed from favorites');
    } else {
      dispatch(addFavorite(selectedMatch));
      Alert.alert('Added', 'Added to favorites');
    }
  };

  if (loading || !selectedMatch) {
    return <LoadingSpinner message="Loading match details..." />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const hasScore =
    selectedMatch.intHomeScore !== null && selectedMatch.intAwayScore !== null;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>Match Details</Text>

        <TouchableOpacity
          onPress={handleFavoritePress}
          style={styles.favoriteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather
            name="heart"
            size={24}
            color={isFavorite ? theme.error : theme.textSecondary}
            fill={isFavorite ? theme.error : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Match Info Card */}
        <View
          style={[
            styles.matchCard,
            {
              backgroundColor: theme.card,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <Text style={[styles.league, { color: theme.textSecondary }]}>
            {selectedMatch.strLeague}
          </Text>

          {/* Teams and Score */}
          <View style={styles.teamsContainer}>
            <View style={styles.teamSection}>
              <Text style={[styles.teamName, { color: theme.text }]}>
                {selectedMatch.strHomeTeam}
              </Text>
              {hasScore && (
                <Text style={[styles.score, { color: theme.primary }]}>
                  {selectedMatch.intHomeScore}
                </Text>
              )}
            </View>

            <View style={styles.vsSection}>
              <Text style={[styles.vsText, { color: theme.textTertiary }]}>
                {hasScore ? ':' : 'VS'}
              </Text>
            </View>

            <View style={styles.teamSection}>
              <Text style={[styles.teamName, { color: theme.text }]}>
                {selectedMatch.strAwayTeam}
              </Text>
              {hasScore && (
                <Text style={[styles.score, { color: theme.primary }]}>
                  {selectedMatch.intAwayScore}
                </Text>
              )}
            </View>
          </View>

          {/* Date */}
          <View style={styles.dateTimeContainer}>
            <Feather name="calendar" size={16} color={theme.textSecondary} />
            <Text style={[styles.dateText, { color: theme.textSecondary }]}>
              {formatDate(selectedMatch.dateEvent)}
            </Text>
          </View>

          {/* Time */}
          {selectedMatch.strTime && (
            <View style={styles.dateTimeContainer}>
              <Feather name="clock" size={16} color={theme.textSecondary} />
              <Text style={[styles.dateText, { color: theme.textSecondary }]}>
                {selectedMatch.strTime} Local Time
              </Text>
            </View>
          )}

          {/* Status */}
          {selectedMatch.strStatus && (
            <View
              style={[
                styles.statusContainer,
                { borderTopColor: theme.borderLight },
              ]}
            >
              <Text style={[styles.statusLabel, { color: theme.textSecondary }]}>
                Status:
              </Text>
              <Text style={[styles.statusValue, { color: theme.primary }]}>
                {selectedMatch.strStatus}
              </Text>
            </View>
          )}
        </View>

        {/* Details Card */}
        <View
          style={[
            styles.detailsCard,
            { backgroundColor: theme.card, shadowColor: theme.shadow },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Match Information</Text>

          {selectedMatch.strVenue && (
            <DetailRow
              icon="map-pin"
              label="Venue"
              value={selectedMatch.strVenue}
              theme={theme}
            />
          )}

          {selectedMatch.strSeason && (
            <DetailRow
              icon="award"
              label="Season"
              value={selectedMatch.strSeason}
              theme={theme}
            />
          )}

          {selectedMatch.intRound && (
            <DetailRow
              icon="activity"
              label="Round"
              value={`Round ${selectedMatch.intRound}`}
              theme={theme}
            />
          )}

          {selectedMatch.strCountry && (
            <DetailRow
              icon="globe"
              label="Country"
              value={selectedMatch.strCountry}
              theme={theme}
            />
          )}
        </View>

        {/* Description */}
        {selectedMatch.strDescriptionEN && (
          <View
            style={[
              styles.detailsCard,
              { backgroundColor: theme.card, shadowColor: theme.shadow },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {selectedMatch.strDescriptionEN}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Helper Component
const DetailRow = ({ icon, label, value, theme }: any) => (
  <View style={[styles.detailRow, { borderBottomColor: theme.borderLight }]}>
    <View style={styles.detailLabel}>
      <Feather name={icon} size={18} color={theme.textSecondary} />
      <Text style={[styles.detailLabelText, { color: theme.textSecondary }]}>
        {label}
      </Text>
    </View>
    <Text style={[styles.detailValue, { color: theme.text }]}>{value}</Text>
  </View>
);

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
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 8,
  },
  matchCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  league: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  vsSection: {
    marginHorizontal: 16,
  },
  vsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    marginLeft: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  statusLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabelText: {
    fontSize: 14,
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
});
