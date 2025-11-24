// // components/MatchCard.tsx
// import { Feather } from '@expo/vector-icons';
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// interface MatchCardProps {
//   match: {
//     idEvent: string;
//     strEvent: string;
//     strHomeTeam: string;
//     strAwayTeam: string;
//     intHomeScore?: string | null;
//     intAwayScore?: string | null;
//     dateEvent: string;
//     strTime?: string;
//     strLeague?: string;
//     strThumb?: string;
//     strStatus?: string;
//   };
//   onPress: () => void;
//   onFavoritePress?: () => void;
//   isFavorite?: boolean;
// }

// const MatchCard: React.FC<MatchCardProps> = ({
//   match,
//   onPress,
//   onFavoritePress,
//   isFavorite = false,
// }) => {
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   const getStatusColor = (status?: string) => {
//     if (!status) return '#666';
//     if (status.includes('Finished')) return '#4CAF50';
//     if (status.includes('In Play')) return '#FF5722';
//     return '#2196F3';
//   };

//   const hasScore = match.intHomeScore !== null && match.intAwayScore !== null;

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
//       <View style={styles.cardHeader}>
//         <View style={styles.leagueContainer}>
//           <Feather name="award" size={14} color="#666" />
//           <Text style={styles.leagueText} numberOfLines={1}>
//             {match.strLeague || 'League'}
//           </Text>
//         </View>
//         {onFavoritePress && (
//           <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
//             <Feather
//               name={isFavorite ? 'heart' : 'heart'}
//               size={20}
//               color={isFavorite ? '#FF3B30' : '#999'}
//               fill={isFavorite ? '#FF3B30' : 'none'}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.matchContent}>
//         {/* Home Team */}
//         <View style={styles.teamContainer}>
//           <Text style={styles.teamName} numberOfLines={2}>
//             {match.strHomeTeam}
//           </Text>
//           {hasScore && <Text style={styles.score}>{match.intHomeScore}</Text>}
//         </View>

//         {/* VS or Score Separator */}
//         <View style={styles.vsContainer}>
//           {hasScore ? (
//             <Text style={styles.vsText}>:</Text>
//           ) : (
//             <Text style={styles.vsText}>VS</Text>
//           )}
//         </View>

//         {/* Away Team */}
//         <View style={styles.teamContainer}>
//           <Text style={styles.teamName} numberOfLines={2}>
//             {match.strAwayTeam}
//           </Text>
//           {hasScore && <Text style={styles.score}>{match.intAwayScore}</Text>}
//         </View>
//       </View>

//       <View style={styles.cardFooter}>
//         <View style={styles.dateContainer}>
//           <Feather name="calendar" size={14} color="#666" />
//           <Text style={styles.dateText}>{formatDate(match.dateEvent)}</Text>
//           {match.strTime && (
//             <>
//               <Feather name="clock" size={14} color="#666" style={{ marginLeft: 12 }} />
//               <Text style={styles.dateText}>{match.strTime}</Text>
//             </>
//           )}
//         </View>
//         {match.strStatus && (
//           <View style={[styles.statusBadge, { backgroundColor: getStatusColor(match.strStatus) }]}>
//             <Text style={styles.statusText}>{match.strStatus}</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 16,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   leagueContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   leagueText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 6,
//     fontWeight: '500',
//   },
//   favoriteButton: {
//     padding: 4,
//   },
//   matchContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 16,
//   },
//   teamContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   teamName: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   score: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   vsContainer: {
//     marginHorizontal: 16,
//   },
//   vsText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#999',
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//     paddingTop: 12,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   dateText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 6,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   statusText: {
//     fontSize: 10,
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default MatchCard;

// components/MatchCard.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface MatchCardProps {
  match: {
    idEvent: string;
    strEvent: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore?: string | null;
    intAwayScore?: string | null;
    dateEvent: string;
    strTime?: string;
    strLeague?: string;
    strThumb?: string;
    strStatus?: string;
  };
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status?: string) => {
    if (!status) return theme.textSecondary;
    
    // Use the new vibrant status colors
    const statusLower = status.toLowerCase();
    if (statusLower.includes('finished') || statusLower.includes('ft')) {
      return theme.finishedMatch;
    }
    if (statusLower.includes('live') || statusLower.includes('in play')) {
      return theme.liveMatch;
    }
    if (statusLower.includes('today')) {
      return theme.todayMatch;
    }
    // For upcoming/scheduled matches
    return theme.upcomingMatch;
  };

  const hasScore =
    match.intHomeScore !== null &&
    match.intAwayScore !== null &&
    match.intHomeScore !== undefined &&
    match.intAwayScore !== undefined;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
          borderColor: theme.borderLight,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.leagueContainer}>
          <Feather name="award" size={14} color={theme.textSecondary} />
          <Text style={[styles.leagueText, { color: theme.textSecondary }]} numberOfLines={1}>
            {match.strLeague || 'League'}
          </Text>
        </View>

        {onFavoritePress && (
          <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
            <Feather
              name="heart"
              size={20}
              color={isFavorite ? theme.error : theme.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Teams + Score */}
      <View style={styles.matchContent}>
        {/* Home Team */}
        <View style={styles.teamContainer}>
          <Text style={[styles.teamName, { color: theme.text }]} numberOfLines={2}>
            {match.strHomeTeam}
          </Text>
          {hasScore && (
            <Text style={[styles.score, { color: theme.primary }]}>
              {match.intHomeScore}
            </Text>
          )}
        </View>

        {/* VS */}
        <View style={styles.vsContainer}>
          <Text style={[styles.vsText, { color: theme.textTertiary }]}>
            {hasScore ? ':' : 'VS'}
          </Text>
        </View>

        {/* Away Team */}
        <View style={styles.teamContainer}>
          <Text style={[styles.teamName, { color: theme.text }]} numberOfLines={2}>
            {match.strAwayTeam}
          </Text>
          {hasScore && (
            <Text style={[styles.score, { color: theme.primary }]}>
              {match.intAwayScore}
            </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.cardFooter, { borderTopColor: theme.borderLight }]}>
        <View style={styles.dateContainer}>
          <Feather name="calendar" size={14} color={theme.textSecondary} />
          <Text style={[styles.dateText, { color: theme.textSecondary }]}>
            {formatDate(match.dateEvent)}
          </Text>

          {match.strTime && (
            <>
              <Feather
                name="clock"
                size={14}
                color={theme.textSecondary}
                style={{ marginLeft: 12 }}
              />
              <Text style={[styles.dateText, { color: theme.textSecondary }]}>
                {match.strTime}
              </Text>
            </>
          )}
        </View>

        {match.strStatus && (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(match.strStatus) }]}>
            <Text style={styles.statusText}>{match.strStatus}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  leagueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  leagueText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },

  favoriteButton: {
    padding: 4,
  },

  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },

  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },

  teamName: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },

  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  vsContainer: {
    marginHorizontal: 16,
  },

  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  dateText: {
    fontSize: 12,
    marginLeft: 6,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
});

export default MatchCard;
