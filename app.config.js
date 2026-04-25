const packageJson = require('./package.json');

const appName = 'Hụi';
const slug = 'hui-app';
const identifier = 'com.nnsng.huiapp';
const projectId = '59c78df1-e359-423e-b8f9-4216d8da6f39';

module.exports = {
  expo: {
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
        backgroundColor: '#ffffff',
      },
      package: identifier,
    },
    web: {
      bundler: 'metro',
      output: 'static',
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
          backgroundColor: '#ffffff',
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
  },
};
