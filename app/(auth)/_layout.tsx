import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          navigationBarHidden: true,
        }}
      />
      <Stack.Screen
        name="(modal)/profile"
        options={{
          presentation: 'modal',
          title: 'Profile',
        }}
      />

      <Stack.Screen
        name="(modal)/lock"
        options={{
          headerShown: false,
          animation: 'none',
          headerBackVisible: false,
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: false,
          animation: 'slide_from_left',
          headerBackVisible: false,
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="(modal)/security"
        options={{
          presentation: 'fullScreenModal',
          animation: 'none',
          headerBackVisible: false,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="(modal)/delivered"
        options={{
          presentation: 'fullScreenModal',
          animation: 'none',
          headerBackVisible: false,
          headerShown: false,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="(modal)/createOrder"
        options={{
          presentation: 'fullScreenModal',
          animation: 'none',
          headerBackVisible: false,
          headerShown: false,
          headerShadowVisible: false
        }}
      />

      <Stack.Screen
        name="(modal)/editOrder"
        options={{
          presentation: 'fullScreenModal',
          animation: 'none',
          headerBackVisible: false,
          headerShown: false,
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
};

export default Layout;
