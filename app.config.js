import 'dotenv/config';

export default {
  expo: {
    name: 'micare',
    scheme: 'micare',
    slug: 'micare',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    jsEngine: 'hermes',
    splash: {
      image: './src/assets/SplashScreen.png',
      resizeMode: 'contain',
      backgroundColor: '#222233',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    androidStatusBar: {
      barStyle: 'light-content',
      backgroundColor: '#222233',
    },
    androidNavigationBar: {
      barStyle: 'light-content',
      backgroundColor: '#222233',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/AdaptiveIcon.png',
        backgroundColor: '#222233',
      },
      package: 'com.eliag.micare',
    },
    web: {
      favicon: './src/assets/Favicon.png',
    },
    extra: {
      eas: {
        projectId: 'b37f9cf8-d830-43c4-863a-90aed6219799',
      },
      baseUrl: process.env.REACT_APP_BASE_URL,
      clientCredentials: process.env.REACT_APP_CLIENT_CREDENTIALS,
    },
  },
};
