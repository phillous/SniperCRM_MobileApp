import { fetchCountries } from '@/apiClient';
import Passcode from '@/components/WelcomeScreen/Passcode';
import Colors from '@/constants/Colors';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.COUNTRIES,
      queryFn: fetchCountries,
    });
  }, [queryClient]);

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
          <Text style={{ fontFamily: 'inter-b', fontSize: 24 }}>Confirm your Passcode</Text>
          <Text style={{ fontFamily: 'inter', fontSize: 16, flexWrap: 'wrap', marginTop: 12 }}>
            Create a passcode to sign in to your account securely. Please keep your passcode safe
            and dont share it with anyone
          </Text>
        </View>

        <Passcode text="Confirm Password" confirmPassword={true} />
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
