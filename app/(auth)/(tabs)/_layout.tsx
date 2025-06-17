import Colors from '@/constants/Colors';
import useScrollContext, { ScrollProvider } from '@/context/scrollContext';
import { store } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { PortalProvider } from '@gorhom/portal';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

const TAB_BAR_HEIGHT = 72;

// Animated Tab Bar Component
const AnimatedTabBar = (props: any) => {
  const { scrollY } = useScrollContext();
  const scrollDirection = useSharedValue<'up' | 'down'>('up');

  useAnimatedReaction(
    () => scrollY.value,
    (current, previous) => {
      if (previous == null) return;
      scrollDirection.value = current > previous ? 'down' : 'up';
    },
  );

  const animatedHeight = useDerivedValue(() => {
    const height = interpolate(
      scrollY.value,
      [0, 100],
      scrollDirection.value === 'down' ? [TAB_BAR_HEIGHT, 0] : [TAB_BAR_HEIGHT, TAB_BAR_HEIGHT],
      Extrapolate.CLAMP,
    );
    return withTiming(height, { duration: 200 });
  });

  // const animatedOpacity = useDerivedValue(() => {
  //   const opacity = interpolate(
  //     scrollY.value,
  //     [0, 30],
  //     scrollDirection.value === 'down' ? [1, 0] : [0, 1],
  //     Extrapolate.CLAMP,
  //   );
  //   return withTiming(opacity, { duration: 200 });
  // });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: 'hidden',
        },
        animatedStyle,
      ]}
    >
      <Animated.View>
        <BottomTabBar {...props} />
      </Animated.View>
    </Animated.View>
  );
};

// Main Layout Component
const Layout = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Tabs
      detachInactiveScreens={false}
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.dark,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
          headerTitle: () => null,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          header: () => (
            <View
              style={{
                paddingTop: top,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'lightGrey',
              }}
            >
              <Text style={{ fontSize: 24, fontFamily: 'inter-sb' }}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

// Root Provider Setup
const RootLayout = () => {
  // useEffect(() => {
  //   NavigationBar.setVisibilityAsync('hidden');
  //   NavigationBar.setBehaviorAsync('overlay-swipe');
  // }, []);

  return (
    <ScrollProvider>
      <PortalProvider>
        <PaperProvider>
          <Provider store={store}>
            <Layout />
          </Provider>
        
        </PaperProvider>
      </PortalProvider>
    </ScrollProvider>
  );
};

export default RootLayout;
