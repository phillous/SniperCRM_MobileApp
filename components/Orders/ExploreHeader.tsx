import Colors, { BadgeColors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';

import useScrollContext from '@/context/scrollContext';
import { orderStatus } from '@/utils/data';
import { Status } from '@/utils/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
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

interface Props {
  onCategoryChanged: (status: Status) => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  sortBottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  height: number;
}
const ExploreHeader = ({
  onCategoryChanged,
  bottomSheetRef,
  sortBottomSheetRef,
  height,
}: Props) => {
  const { scrollY } = useScrollContext();
  const { height: windowHeight } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<(TouchableOpacity | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollDirection = useSharedValue<'up' | 'down'>('down');
  const router = useRouter();

  useEffect(() => {
    console.log('height', height);
  }, [height]);

  const animatedHeight = useDerivedValue(() => {
    if (scrollDirection.value === 'down') {
      // smooth shrink with timing
      return withTiming(
        interpolate(scrollY.value, [0, 100], [height, windowHeight / 6], Extrapolate.CLAMP),
        { duration: 200 },
      );
    } else {
      // immediate reset to default height (no animation)
      return withTiming(height, { duration: 100 });
    }
  });

  const animatedTranslateY = useDerivedValue(() => {
    if (scrollDirection.value === 'down') {
      return withTiming(interpolate(scrollY.value, [0, 100], [0, -40], Extrapolate.CLAMP), {
        duration: 200,
      });
    } else {
      return withTiming(interpolate(scrollY.value, [0, 100], [0, 0], Extrapolate.CLAMP), {
        duration: 100,
      });
    }
  });

  const animatedOpacity = useDerivedValue(() => {
    if (scrollDirection.value === 'down') {
      return withTiming(interpolate(scrollY.value, [0, 50], [1, 0], Extrapolate.CLAMP), {
        duration: 200,
      });
    } else {
      return withTiming(interpolate(scrollY.value, [0, 50], [1, 1], Extrapolate.CLAMP), {
        duration: 100,
      });
    }
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      transform: [{ translateY: animatedTranslateY.value }],
    };
  });

  const animatedHeader = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedTranslateY.value }],
      opacity: animatedOpacity.value,
    };
  });

  const selectCategory = (status: Status, index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x: number) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(status);
  };

  useAnimatedReaction(
    () => scrollY.value,
    (current, previous) => {
      if (previous === null) return;
      scrollDirection.value = current > previous ? 'down' : 'up';
    },
  );

  return (
    <>
      <Animated.View style={[styles.container, animatedHeaderStyle, { paddingTop: top }]}>
        <Animated.View
          style={[
            animatedHeader,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 18,
              paddingBottom: 12,
            },
          ]}
        >
          <Text style={{ fontSize: 22, fontFamily: 'inter-b', color: 'white' }}>Orders</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}
            onPress={() => {
              // bottomSheetRef.current?.snapToPosition('95%');
              bottomSheetRef.current?.expand();
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: 'inter', color: 'white' }}>Filter</Text>
            <MaterialCommunityIcons name="filter-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 18,
          }}
        >
          <TouchableOpacity
            style={[
              styles.categoriesBtn,
              styles.categoriesBtnActive,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
            onPress={() => sortBottomSheetRef.current?.expand()}
          >
            <MaterialCommunityIcons name="tune-vertical-variant" size={24} color="black" />
            <Text style={{ fontFamily: 'inter', fontSize: 14 }}>Sort</Text>
          </TouchableOpacity>
          {orderStatus.map((item, index) => (
            <TouchableOpacity
              ref={(el: any) => (itemsRef.current[index] = el)}
              onPress={() => selectCategory(item.name, index)}
              style={
                activeIndex === index
                  ? [styles.categoriesBtn,styles.categoriesBtnActive ]
                  : styles.categoriesBtn
              }
              key={index}
            >
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {item.name}({item.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
};
export default ExploreHeader;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: Colors.blue, // or your header background color
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.background,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    paddingBottom: 0,
    gap: 10,
  },
  filterBtn: {
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 18,
  },

  categoryText: {
    fontSize: 14,
    fontFamily: 'inter',
    color: 'white',
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'inter',
    color: 'black'
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 35,
    backgroundColor: BadgeColors.brown,
    paddingHorizontal: 12,
    
  },
  categoriesBtnActive: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    backgroundColor: 'white',
    elevation: 2,
    
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    
  },
});
