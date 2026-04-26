import { Loading } from '@/components/common';
import { ModalProvider } from '@/contexts/ModalContext';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return <Loading />;

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
            // animation: 'fade',
          }}
        />
      </ModalProvider>
    </QueryClientProvider>
  );
}
