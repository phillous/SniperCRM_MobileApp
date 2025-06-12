import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Fallback colors in case Colors import fails
const DEFAULT_ACTIVE = '#1a237e';
const DEFAULT_INACTIVE = '#e0e0e0';

const DOTS_SIZE = 10;
const ANIMATION_DURATION = 300;

type DotProps = {
  index: number;
  activeIndex: SharedValue<number>;
};

const Dot = ({ index, activeIndex }: DotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index;
    const bgColor = isActive
      ? Colors?.darkBlue || DEFAULT_ACTIVE
      : Colors?.grey || DEFAULT_INACTIVE;

    return {
      backgroundColor: withTiming(bgColor, { duration: ANIMATION_DURATION }),
      transform: [
        {
          scale: withTiming(isActive ? 1.2 : 1, { duration: ANIMATION_DURATION }),
        },
      ],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    height: DOTS_SIZE,
    width: DOTS_SIZE,
    borderRadius: DOTS_SIZE / 2,
    marginHorizontal: 4,
  },
});

export default Dot;
