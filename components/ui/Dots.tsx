// Dots.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type DotsProps = {
  count: number;
  activeIndex: SharedValue<number>;
};

const Dot = ({ active, index }: { active: SharedValue<number>; index: number }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(active.value === index ? '#4287f5' : 'white', {
      duration: 500,
    }),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const Dots = ({ count, activeIndex }: DotsProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, index) => (
        <Dot key={index} active={activeIndex} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -60,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4287f5',
  },
});

export default Dots;
