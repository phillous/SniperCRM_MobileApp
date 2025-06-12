import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const Layout = () => {
  return (
    <Stack screenOptions={{ animation: 'slide_from_right' }}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="confirmPasscode"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
