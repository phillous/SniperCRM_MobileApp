import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import AuthContextProvider, { useAuthContext } from '@/context/authContext';
import { UserInactivityProvider } from '@/context/UserInActivity';

import interBold from '@/assets/fonts/Inter_18pt-Bold.ttf';
import interLight from '@/assets/fonts/Inter_18pt-Light.ttf';
import interMedium from '@/assets/fonts/Inter_18pt-Medium.ttf';
import interRegular from '@/assets/fonts/Inter_18pt-Regular.ttf';
import interSemiBold from '@/assets/fonts/Inter_18pt-SemiBold.ttf';

// Keep splash screen until fonts load
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

const MainLayout = () => {
  const [fontsLoaded] = useFonts({
    'inter-b': interBold,
    'inter-m': interMedium,
    inter: interLight,
    'inter-r': interRegular,
    'inter-sb': interSemiBold,
  });

  const { isAuthenticated, initialized } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  

  useEffect(() => {
    if (fontsLoaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, initialized]);

  useEffect(() => {
    if (!fontsLoaded || !initialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    if (isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/(tabs)/home');
    } else if (!isAuthenticated && inAuthGroup) {
      router.replace('/(public)');
    }
  }, [fontsLoaded, initialized, isAuthenticated, segments]);

  if (!fontsLoaded || !initialized) return null;

  return (
    <Stack> 
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <UserInactivityProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <MainLayout />
              <Toaster />
            </GestureHandlerRootView>
          </UserInactivityProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
