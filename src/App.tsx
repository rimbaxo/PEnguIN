import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { StateContextProvider } from '@/context';
import RootNavigation from '@/navigation';
import { theme } from '@/theme/theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadAsync({
          Satoshi: require('@/assets/fonts/Satoshi-Regular.otf'),
          'Satoshi-light': require('@/assets/fonts/Satoshi-Light.otf'),
          'Satoshi-Medium': require('@/assets/fonts/Satoshi-Medium.otf'),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StateContextProvider>
          <View
            style={{ height: StatusBar.currentHeight, backgroundColor: theme.colors.primary }}
            onLayout={onLayoutRootView}
          />
          <RootNavigation />
        </StateContextProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default App;
