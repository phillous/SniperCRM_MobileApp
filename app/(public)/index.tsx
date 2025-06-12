import React from 'react';
import Authentication from '@/components/WelcomeScreen/Authentication';
import Features from '@/components/WelcomeScreen/Features';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { top } = useSafeAreaInsets();
  useWarmUpBrowser();
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: top,
          marginTop: 40,
        }}
      >
        <Image source={require('@/assets/images/SniperCRM-Logo.jpeg')} style={styles.imageLogo} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Features />
        <Authentication />
      </ScrollView>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
