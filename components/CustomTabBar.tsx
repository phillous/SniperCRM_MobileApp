import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import useScrollContext from '@/context/scrollContext';

const CustomTabBar = (props: BottomTabBarProps) => {
  const { scrollY } = useScrollContext();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 100], // You can tweak these values
          [0, 100],
          'clamp',
        ),
      },
    ],
    // Optional: fade out as it moves
    opacity: interpolate(scrollY.value, [0, 50, 100], [1, 0.8, 0], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={animatedStyle}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
};

export default CustomTabBar;
