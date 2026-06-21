import type { ExpoConfig } from 'expo/config';
import packageJson from './package.json';

const appName = 'Sổ hụi';
const slug = 'hui-app';
const identifier = 'com.nnsng.huiapp';

const projectId = '59c78df1-e359-423e-b8f9-4216d8da6f39';

const backgroundColor = '#F1F8F1';

const config: ExpoConfig = {
  name: appName,
  slug,
  version: packageJson.version,
  owner: 'nnsng',
  orientation: 'portrait',
  icon: './assets/images/app-icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: identifier,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor,
    },
    package: identifier,
  },
  web: {
    bundler: 'metro',
    output: 'server',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/app-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor,
        origin: process.env.SERVER_URL,
      },
    ],
    'expo-font',
    'expo-web-browser',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId,
    },
  },
};

export default config;
