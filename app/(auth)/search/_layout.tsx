import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: 'Search Orders',
            tintColor: Colors.primary,
          },
        }}
      />
    </Stack>
  );
};
export default Layout;
