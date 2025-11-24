// app/(tabs)/profile.tsx
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { APP_NAME, APP_VERSION } from '../../utils/constants';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme, isDark, toggleTheme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);

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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={[theme.primary, theme.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[theme.gradientStart, theme.gradientEnd]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </Text>
          </LinearGradient>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName || ''}
        </Text>
        <Text style={styles.email}>{user?.email || user?.username}</Text>
      </LinearGradient>

      {/* Stats with Colorful Cards */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={[theme.error + '20', theme.error + '40']}
          style={styles.statCard}
        >
          <Feather name="heart" size={28} color={theme.error} />
          <Text style={[styles.statValue, { color: theme.error }]}>{favorites.length}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Favorites</Text>
        </LinearGradient>

        <LinearGradient
          colors={[theme.upcomingMatch + '20', theme.upcomingMatch + '40']}
          style={styles.statCard}
        >
          <Feather name="activity" size={28} color={theme.upcomingMatch} />
          <Text style={[styles.statValue, { color: theme.upcomingMatch }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Following</Text>
        </LinearGradient>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Appearance</Text>

        <View style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.borderLight }]}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
              <Feather name={isDark ? 'moon' : 'sun'} size={20} color={theme.primary} />
            </View>
            <Text style={[styles.menuItemLabel, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account</Text>

        <MenuItem
          icon="user"
          iconColor={theme.primary}
          label="Edit Profile"
          theme={theme}
          onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon!')}
        />
        <MenuItem
          icon="bell"
          iconColor={theme.warning}
          label="Notifications"
          theme={theme}
          onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon!')}
        />
        <MenuItem
          icon="settings"
          iconColor={theme.textSecondary}
          label="Settings"
          theme={theme}
          onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon!')}
        />
      </View>

      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Support</Text>

        <MenuItem
          icon="help-circle"
          iconColor={theme.info}
          label="Help & Support"
          theme={theme}
          onPress={() => Alert.alert('Help', 'Contact support at support@sportify.com')}
        />
        <MenuItem
          icon="info"
          iconColor={theme.teal}
          label="About"
          theme={theme}
          onPress={() => Alert.alert('About', `${APP_NAME}\nVersion ${APP_VERSION}`)}
        />
        <MenuItem
          icon="shield"
          iconColor={theme.success}
          label="Privacy Policy"
          theme={theme}
          onPress={() => Alert.alert('Privacy', 'Privacy policy will be displayed here')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: theme.card, borderColor: theme.border }]} 
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color={theme.error} />
        <Text style={[styles.logoutText, { color: theme.error }]}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textTertiary }]}>
          {APP_NAME} v{APP_VERSION}
        </Text>
      </View>
    </ScrollView>
  );
}

// Menu Item Component with Colorful Icons
const MenuItem = ({ 
  icon, 
  iconColor, 
  label, 
  theme, 
  onPress 
}: { 
  icon: any; 
  iconColor: string;
  label: string; 
  theme: any;
  onPress: () => void;
}) => (
  <TouchableOpacity 
    style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.borderLight }]} 
    onPress={onPress}
  >
    <View style={styles.menuItemLeft}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
        <Feather name={icon} size={20} color={iconColor} />
      </View>
      <Text style={[styles.menuItemLabel, { color: theme.text }]}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color={theme.textTertiary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
  },
});
