import Passcode, { storage } from '@/components/WelcomeScreen/Passcode';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const obj = storage.getString('passcode');
  console.log(obj);
  return (
    <View style={[styles.container]}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" color={Colors.dark} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ gap: 8, width: windowWidth - 40 }}>
        <View style={{ gap: 4, marginBottom: 40, marginTop: 24 }}>
          <Text style={{ fontFamily: 'inter-b', fontSize: 24 }}>Create a passcode</Text>
          <Text style={{ fontFamily: 'inter', fontSize: 16, flexWrap: 'wrap', marginTop: 12 }}>
            Create a passcode to sign in to your account securely. Please keep your passcode safe
            and dont share it with anyone
          </Text>
        </View>

        <Passcode text="Passcode" />
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
