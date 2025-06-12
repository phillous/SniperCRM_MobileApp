import Colors from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from 'react-native-reanimated';
import Dots from '../ui/Dots';

const itemFeatures = [
  {
    image: require('@/assets/images/InventoryManagement.png'),
    title: 'Automatic Inventory Management',
    text: 'Say bye-bye to missing or lost products due to inefficient stock management! ',
  },
  {
    image: require('@/assets/images/OrderBump.png'),
    title: 'Track and Manage Sales & Orders',
    text: 'No more missing orders, no more struggling to find orders',
  },
  {
    image: require('@/assets/images/OrderBump.png'),
    title: 'Make More Money With Order Bumps & Upsells',
    text: 'Unlike your old-school, outdated grandpa WPforms, Jojoforms, SniperCRM Forms allows you to easily bundle up to 3 products in your funnel and make more money!',
  },
  {
    image: require('@/assets/images/Cart-Abandonment.png'),
    title: 'Cart Abandonment Recovery',
    text: "Make more sales from 'abandoned' orders!",
  },
  {
    image: require('@/assets/images/AutomatedWhatsapp.png'),
    title: 'Cart Abandonment Recovery',
    text: 'Automated Follow-Ups Via WhatsApp, SMS and Email',
  },
  {
    image: require('@/assets/images/OrderBump.png'),
    title: 'Cart Abandonment Recovery',
    text: 'Automated Follow-Ups Via WhatsApp, SMS and Email',
  },
];

const DOTS_COUNT = itemFeatures.length;

const Features = () => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const scrollAnimatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollAnimatedRef);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexRef = useRef(0);

  const activeValue = useDerivedValue(() => {
    const index = Math.round(scrollOffset.value / windowWidth);
    runOnJS(setCurrentIndex)(index);
    return Math.round(scrollOffset.value / windowWidth);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % itemFeatures.length;
      scrollAnimatedRef.current?.scrollTo({
        x: nextIndex * windowWidth,
        animated: true,
      });
      currentIndexRef.current = nextIndex;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Animated.ScrollView
        horizontal
        decelerationRate="fast"
        snapToInterval={windowWidth}
        ref={scrollAnimatedRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {itemFeatures.map((item, index) => {
          return (
            <View key={index} style={[styles.container, { width: windowWidth, marginTop: 40 }]}>
              <Image source={item.image} style={styles.image} />
              <View style={{ marginTop: 30, gap: 12, marginBottom: 20, paddingHorizontal: 6 }}>
                <Text
                  style={{
                    color: Colors.dark,
                    fontSize: 24,
                    textAlign: 'center',
                    fontFamily: 'inter-b',
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: 16,
                    fontFamily: 'inter',
                    flexWrap: 'wrap',
                    marginHorizontal: 8,
                    textAlign: 'center',
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>

      <Dots activeIndex={activeValue} count={DOTS_COUNT} />
    </>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
