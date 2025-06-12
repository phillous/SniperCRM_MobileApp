import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

const Layout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ animation: 'slide_from_right' }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            title: '',
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="resetPassword"
          options={{
            title: '',
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="passcode"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({});
