import { Loading } from '@/components/common';
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
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
          // animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="rounds" />
        <Stack.Screen name="(modals)/info" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="(modals)/payment" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="(modals)/receive" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
