# ⚽ Sportify

A modern, feature-rich sports tracking mobile application built with React Native and Expo. Track your favorite football matches, leagues, and teams with a beautiful, colorful UI and dark mode support.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue)
![Expo](https://img.shields.io/badge/Expo-~54.0.25-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)

## ✨ Features

### 🎨 Beautiful UI/UX
- **Gradient Headers**: Stunning purple-to-violet gradients across all screens
- **Dark Mode**: Full dark mode support with seamless theme switching
- **Colorful Components**: Vibrant match cards with status indicators (Live, Upcoming, Finished)
- **Professional Design**: Clean, modern interface with smooth animations

### 🏠 Core Screens
- **Home Screen**: View upcoming and recent matches with tab navigation
- **Favourites**: Save and manage your favorite matches
- **Leagues**: Browse major football leagues (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League)
- **Profile**: User profile with statistics, settings, and dark mode toggle

### 🔐 Authentication
- User login and registration with form validation
- Secure token-based authentication
- Demo credentials for quick testing
- Password visibility toggle

### 📊 Match Features
- Real-time match status (Live, Upcoming, Finished)
- Detailed match information (teams, scores, date, time, venue)
- League-specific color coding
- Favorite/unfavorite matches
- Match detail view with full statistics

### 🎯 State Management
- Redux Toolkit for global state management
- AsyncStorage for data persistence
- Optimized Redux slices for favorites and matches

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChiraniSiriwardhana/Sportify.git
   cd sportify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Press `i` for iOS Simulator (Mac only)
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your physical device

### Demo Credentials
For quick testing, use the built-in demo credentials:
- **Username**: `demo`
- **Password**: `demo123`

## 📱 App Structure

```
sportify/
├── app/
│   ├── (auth)/          # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/          # Main tab navigation
│   │   ├── index.tsx    # Home screen
│   │   ├── favourites.tsx
│   │   ├── leagues.tsx
│   │   └── profile.tsx
│   ├── league/          # League detail screens
│   └── match/           # Match detail screens
├── components/          # Reusable components
│   ├── MatchCard.tsx
│   ├── EmptyState.tsx
│   └── LoadingSpinner.tsx
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme and dark mode
├── redux/               # State management
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── favoritesSlice.ts
│   │   └── matchesSlice.ts
│   └── store.ts
├── services/            # API and storage services
│   ├── api.ts
│   └── storage.ts
├── styles/              # Theme and colors
│   └── colors.ts
└── utils/               # Utility functions
    ├── constants.ts
    └── validations.ts
```

## 🎨 Theme System

Sportify features a comprehensive theme system with support for both light and dark modes:

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Purple**: Violet (#A855F7)
- **Gradients**: Purple to Violet (#667eea → #764ba2)
- **Match Status Colors**:
  - Live Match: Red (#FF1744)
  - Upcoming Match: Green (#00E676)
  - Finished Match: Gray (#9E9E9E)
  - Today's Match: Orange (#FF6F00)

### League Colors
- Premier League: Purple (#3D195B)
- La Liga: Orange (#EE8707)
- Bundesliga: Red (#D20515)
- Serie A: Blue (#024494)
- Ligue 1: Yellow (#DAE025)
- Champions League: Navy (#00326E)

## 🛠️ Technologies & Libraries

### Core
- **React Native**: 0.81.5
- **Expo SDK**: ~54.0.25
- **TypeScript**: 5.3.3
- **Expo Router**: ~6.0.15 (File-based routing)

### UI Components
- **expo-linear-gradient**: ^14.0.2 (Gradient backgrounds)
- **@expo/vector-icons**: ^14.0.4 (Feather icons)
- **react-native-screens**: ~4.4.0

### State Management & Data
- **@reduxjs/toolkit**: ^2.5.0
- **react-redux**: ^9.2.0
- **@react-native-async-storage/async-storage**: 2.1.0

### Form Validation
- **yup**: ^1.5.0 (Schema validation)

### Development
- **@types/react**: ~18.3.12
- **typescript**: ^5.3.3

## 📦 Key Dependencies

```json
{
  "expo": "~54.0.25",
  "react": "18.3.1",
  "react-native": "0.81.5",
  "expo-router": "~6.0.15",
  "expo-linear-gradient": "^14.0.2",
  "@reduxjs/toolkit": "^2.5.0",
  "react-redux": "^9.2.0"
}
```

## 🔧 Configuration

### Environment Setup
The app uses AsyncStorage for local data persistence and does not require external API keys for the demo version.

### Custom Configuration
- Theme colors: `styles/colors.ts`
- API endpoints: `services/api.ts`
- App constants: `utils/constants.ts`

## 📸 Screenshots

### Light Mode
- Home screen with gradient header and match cards
- Favourites screen with saved matches
- Leagues screen with league cards
- Profile screen with user stats

### Dark Mode
- Seamless dark theme across all screens
- Maintained color vibrancy and readability
- Toggle from profile settings

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
We follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `chore:` Maintenance tasks
- `docs:` Documentation updates
- `style:` Code style changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Chirani Siriwardhana**
- GitHub: [@ChiraniSiriwardhana](https://github.com/ChiraniSiriwardhana)
- Repository: [Sportify](https://github.com/ChiraniSiriwardhana/Sportify)

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development platform
- [TheSportsDB](https://www.thesportsdb.com/) for sports data API
- [Feather Icons](https://feathericons.com/) for beautiful icons
- React Native community for excellent libraries

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact: support@sportify.com (placeholder)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Live score updates
- [ ] Push notifications for match start/end
- [ ] Social features (share matches, follow friends)
- [ ] Match predictions and statistics
- [ ] Player profiles and stats
- [ ] News feed integration
- [ ] Multi-language support

---

Made with ❤️ by Chirani Siriwardhana
