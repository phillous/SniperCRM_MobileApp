import Passcode from '@/components/WelcomeScreen/Passcode';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const Page = () => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={[styles.container]}>
      <Stack.Screen
        options={{
          headerLeft: () => null,
        }}
      />
      <View style={{ gap: 8, width: windowWidth - 40 }}>
        <View style={{ gap: 4, marginBottom: 40, marginTop: 24 }}>
          <Text style={{ fontFamily: 'inter-b', fontSize: 24 }}>Welcome Back</Text>
          <Text style={{ fontFamily: 'inter', fontSize: 16, flexWrap: 'wrap', marginTop: 12 }}>
            Please type in the passcode used in signing in.... Please keep your passcode safe and
            dont share it with anyone
          </Text>
        </View>

        <Passcode text="Passcode" confirmPassword={true} isLock={true} />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
