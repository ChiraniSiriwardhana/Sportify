// app/(tabs)/leagues.tsx
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface League {
  id: string;
  name: string;
  country: string;
  icon: string;
  color: string;
  gradient: [string, string];
}

const leagues: League[] = [
  {
    id: '4328',
    name: 'Premier League',
    country: 'England',
    icon: 'award',
    color: '#3D195B',
    gradient: ['#3D195B', '#5A2A7F'],
  },
  {
    id: '4335',
    name: 'La Liga',
    country: 'Spain',
    icon: 'shield',
    color: '#EE8707',
    gradient: ['#EE8707', '#FFA726'],
  },
  {
    id: '4331',
    name: 'Bundesliga',
    country: 'Germany',
    icon: 'star',
    color: '#D20515',
    gradient: ['#D20515', '#EF5350'],
  },
  {
    id: '4332',
    name: 'Serie A',
    country: 'Italy',
    icon: 'flag',
    color: '#024494',
    gradient: ['#024494', '#42A5F5'],
  },
  {
    id: '4334',
    name: 'Ligue 1',
    country: 'France',
    icon: 'compass',
    color: '#DAE025',
    gradient: ['#DAE025', '#DCE775'],
  },
  {
    id: '4480',
    name: 'Champions League',
    country: 'Europe',
    icon: 'trophy',
    color: '#00326E',
    gradient: ['#00326E', '#5C6BC0'],
  },
];

export default function LeaguesScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const handleLeaguePress = (league: League) => {
    // Navigate to league details page
    router.push({
      pathname: '/league/[id]',
      params: { id: league.id, name: league.name },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      {/* Header */}
      <LinearGradient
        colors={[theme.primary, theme.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Feather name="grid" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Leagues</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Select your favorite league
        </Text>
      </LinearGradient>

      {/* Leagues Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {leagues.map((league, index) => (
            <TouchableOpacity
              key={league.id}
              style={styles.cardWrapper}
              onPress={() => handleLeaguePress(league)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={league.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  {
                    shadowColor: isDark ? '#000' : league.color,
                  },
                ]}
              >
                {/* League Icon */}
                <View style={styles.iconContainer}>
                  <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Feather name={league.icon as any} size={32} color="#fff" />
                  </View>
                </View>

                {/* League Info */}
                <View style={styles.leagueInfo}>
                  <Text style={styles.leagueName} numberOfLines={2}>
                    {league.name}
                  </Text>
                  <View style={styles.countryContainer}>
                    <Feather name="map-pin" size={12} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.countryText}>{league.country}</Text>
                  </View>
                </View>

                {/* Arrow Icon */}
                <View style={styles.arrowContainer}>
                  <Feather name="arrow-right" size={20} color="rgba(255,255,255,0.8)" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Info */}
        <View style={styles.footer}>
          <Feather name="info" size={16} color={theme.textTertiary} />
          <Text style={[styles.footerText, { color: theme.textTertiary }]}>
            Tap any league to view matches
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
    color: 'rgba(255,255,255,0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  card: {
    height: 180,
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  leagueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 13,
    marginLeft: 8,
  },
});
