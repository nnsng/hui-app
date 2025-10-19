import { Loading } from '@/components';
import ModalProvider from '@/contexts/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
        <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }} />
      </ModalProvider>
    </QueryClientProvider>
  );
}
