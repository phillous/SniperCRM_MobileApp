import { fetchStatusOrders } from "@/apiClient";
import BarChart from "@/components/HomeScreen/BarChart";
import BestSellerCard from "@/components/HomeScreen/BestSellerCard";
import CountryBottomSheet from "@/components/HomeScreen/CountryBottomSheet";
import EmptyState from "@/components/HomeScreen/EmptyState";
import OrderStatCard from "@/components/HomeScreen/OrderStatCard";
import Colors from "@/constants/Colors";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { defaultStyles } from "@/constants/Styles";

import { useDashboard } from "@/hooks/useDashboard";
import { useFetchCountries } from "@/hooks/useFetchCountries";
import { getPeriodRange } from "@/utils/datefns";
import { loginStorage } from "@/utils/storage";
import { CountryProps } from "@/utils/types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
// import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const period = ["Today", "This Week", "Last Week", "This Month"];

const CHART_HEIGHT = 150;
const Y_AXIS_LABELS = 4;

// const productCount = [
//   {
//     productName: 'Product A',
//     quantitySold: 20,
//   },
//   {
//     productName: 'Product B',
//     quantitySold: 50,
//   },
//   {
//     productName: 'Product C',
//     quantitySold: 40,
//   },
//   {
//     productName: 'Product D',
//     quantitySold: 30,
//   },
//   {
//     productName: 'Product E',
//     quantitySold: 80,
//   },
// ];

const DashboardScreen = () => {
  // const { top } = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  // const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const width = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const [activeTabIndex, setActiveTabIndex] = useState(1);
 

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryProps>({
    countryId: 161,
    countryName: "Nigeria",
    countrySymbol: "₦",
    countryCurrency: "NGN",
    countryPhonecode: "234",
  });

  const {
    isLoading,
    countries,
    error: errorFetchingCountries,
  } = useFetchCountries();
  const {
    isLoading: fetchingDashboard,
    dashboard,
    isError,
    refetch: refetchDashboard,
  } = useDashboard(
    { countryId: selectedCountry.countryId, period: period[activeTabIndex] },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      refetchOnWindowFocus: true, // optional
    }
  );

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetchDashboard();
    } finally {
      setRefreshing(false); // ensures it always stops refreshing
    }
  }, [refetchDashboard]);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, windowWidth / 1.5], [1, 0]),
    };
  }, []);

  const animatedTabPosition = useSharedValue(0);

  const BAR_WIDTH = windowWidth * 0.09;

  // In your animated tab styles, add useNativeDriver
  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(animatedTabPosition.value, {
          duration: 300,
        }),
      },
    ],
    width: width.value / period.length,
  }));

  const bottomSheetRef = useRef<BottomSheet>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!selectedCountry?.countryId) return;

    const prefetchData = async () => {
      const filters = ["Today", "Last Week", "This Month"];
      await Promise.all(
        filters.map((filter) =>
          queryClient.prefetchQuery({
            queryKey: [QUERY_KEYS.DASHBOARD, selectedCountry.countryId, filter],
            queryFn: () =>
              fetchStatusOrders({
                countryId: selectedCountry.countryId,
                period: filter,
              }),
            staleTime: 1000 * 60 * 5,
          })
        )
      );
    };

    prefetchData();
  }, [selectedCountry?.countryId, queryClient]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [selectedCountry.countryId]);
  // Replace the problematic useEffect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetchDashboard();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [selectedCountry.countryId, activeTabIndex, refetchDashboard]);

  function openBottomSheet() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: windowHeight, // Adjust this value based on your content height
        animated: true,
      });
    }

    // Wait for scroll animation to finish before expanding
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 200); // Slight delay to match scroll
  }

  const onChangeCountry = useCallback((country: CountryProps) => {
    setSelectedCountry(country);
  }, []);

  // const handleTabPress = (index: number) => {
  //   runOnJS(setActiveTabIndex)(index); // Sync to React state

  //   // Update your shared value if needed elsewhere
  // };

  const tabWidthStyles = period.map(() =>
    useAnimatedStyle(() => ({
      width: width.value / period.length,
    }))
  );

  const userName = loginStorage.getString("name");

  return (
    <Animated.ScrollView
      style={styles.container}
      ref={scrollRef}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View style={{ gap: 4, marginLeft: 16 }}>
              <Text style={{ fontSize: 16, fontFamily: "inter" }}>
                Welcome back
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "inter-b" }}>
                {userName || "Ecom Guru"}{" "}
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={[styles.countryContainer, { marginRight: 16 }]}
              onPress={() => {
                openBottomSheet();
                
              }}
            >
              <View style={{ borderRadius: 4, overflow: "hidden" }}>
                <CountryFlag
                  isoCode={selectedCountry.countryCurrency!.slice(0, 2)}
                  size={16}
                />
              </View>
              <Text style={{ fontSize: 16, fontFamily: "inter-sb" }}>
                {selectedCountry.countryName}
              </Text>
              <View>
                <Ionicons name="chevron-down" size={20} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.content, { paddingTop: top + 5 }]}>
        <Animated.View
          onLayout={(event) => {
            const layoutWidth = event.nativeEvent.layout.width;
            if (width.value !== layoutWidth) {
              width.value = layoutWidth;
              animatedTabPosition.value =
                (layoutWidth / period.length) * activeTabIndex;
            }
          }}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={[styles.tabsContainer, { marginBottom: 24 }]}
        >
          <Animated.View
            style={[styles.activeTabIndicator, animatedTabStyle]}
          />
          {period.map((item, index) => (
            <AnimatedTouchableOpacity
              key={index}
              onPress={() => {
                console.log("Selected:", item);
                setActiveTabIndex(index);

                animatedTabPosition.value = withTiming(
                  (width.value / period.length) * index,
                  {
                    duration: 300,
                  }
                );
              }}
              hitSlop={25}
              style={[
                styles.inactiveTab,
                activeTabIndex === index && styles.activeTab,
                tabWidthStyles,
              ]}
            >
              <Animated.Text
                style={{
                  color: Colors.dark,
                  fontFamily: activeTabIndex === index ? "inter-b" : "inter.r",
                  fontSize: 14,
                }}
              >
                {item}
              </Animated.Text>
            </AnimatedTouchableOpacity>
          ))}
        </Animated.View>
        <View style={defaultStyles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View>
                <Text style={{ fontSize: 18, fontFamily: "inter-sb" }}>
                  Revenue
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    color: Colors.dark,
                    fontFamily: "inter-b",
                  }}
                >
                  {selectedCountry.countrySymbol}
                  {dashboard?.revenue != null
                    ? dashboard.revenue.toLocaleString()
                    : "0.00"}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <Ionicons name="arrow-down" size={12} color={Colors.primary} />
                <Text style={{ fontSize: 12 }}> 16.5%</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, fontFamily: "inter-b" }}>
              {getPeriodRange(period[activeTabIndex])?.start} -{" "}
              {getPeriodRange(period[activeTabIndex])?.end}
            </Text>
          </View>

          {dashboard?.bestSellers?.length > 0 ? (
            <BarChart
              data={dashboard.bestSellers}
              CHART_HEIGHT={CHART_HEIGHT}
              BAR_WIDTH={BAR_WIDTH}
              Y_AXIS_LABELS={Y_AXIS_LABELS}
            />
          ) : (
            <EmptyState
              message="No order activity for this period"
              iconName="cart-outline"
            />
          )}
        </View>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View
            style={[
              defaultStyles.card,
              { width: (windowWidth - 40) / 2, paddingVertical: 6 },
            ]}
          >
            <View style={{ justifyContent: "center", flexGrow: 1, gap: 12 }}>
              <Text style={{ fontSize: 20, fontFamily: "inter" }}>
                Expected Revenue
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "inter-b" }}>
                {selectedCountry.countrySymbol}
                {dashboard?.expectedRevenue != null
                  ? dashboard.expectedRevenue.toLocaleString()
                  : "0.00"}
              </Text>
            </View>
          </View>
          <View
            style={[
              defaultStyles.card,
              { width: (windowWidth - 40) / 2, paddingVertical: 6 },
            ]}
          >
            <View style={{ justifyContent: "center", flexGrow: 1, gap: 12 }}>
              <View style={{ gap: 4 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "inter",
                    textAlign: "center",
                  }}
                >
                  Total{"\n"}Orders(Amount)
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "inter-b",
                    textAlign: "center",
                  }}
                >
                  {selectedCountry.countrySymbol}
                  {dashboard?.totalOrdersResult?.[0]?.cost != null
                    ? dashboard.totalOrdersResult[0].cost.toLocaleString()
                    : "0.00"}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "inter",
                    textAlign: "center",
                  }}
                >
                  Total # of Orders:{" "}
                  {dashboard?.totalOrdersResult?.[0]?.count != null
                    ? dashboard.totalOrdersResult[0].count.toLocaleString()
                    : "0"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={defaultStyles.card}>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              marginBottom: 6,
              alignItems: "center",
            }}
          >
            <AntDesign name="exclamationcircleo" size={24} color="black" />
            <Text style={{ fontSize: 24, fontFamily: "inter-s" }}>
              Best Sellers
            </Text>
          </View>
          {dashboard?.bestSellers?.length > 0 ? (
            <BestSellerCard data={dashboard.bestSellers} />
          ) : (
            <EmptyState
              message="No order activity for this period"
              iconName="cart-outline"
            />
          )}
        </View>
        <View style={defaultStyles.card}>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              marginBottom: 6,
              alignItems: "center",
            }}
          >
            <AntDesign name="exclamationcircleo" size={24} color="black" />
            <Text style={{ fontSize: 24, fontFamily: "inter-s" }}>
              Order Status
            </Text>
          </View>
          {dashboard?.resultWithPercent?.length > 0 ? (
            <OrderStatCard data={dashboard.resultWithPercent} />
          ) : (
            <EmptyState
              message="No order activity for this period"
              iconName="cart-outline"
            />
          )}
        </View>
      </View>

      <CountryBottomSheet
        bottomSheetRef={bottomSheetRef}
        data={countries}
        onChange={onChangeCountry}
      />
    </Animated.ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    gap: 8,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countryContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 18,
    justifyContent: "space-between",
    marginBottom: 12,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure header is above other content
    backgroundColor: "transparent", // Make sure the header is transparent
  },
  content: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 40 : 0,
    paddingHorizontal: 18,
  },
  // inactiveTab: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'transparent',
  //   borderRadius: 4,
  // },
  // activeTab: {
  //   backgroundColor: 'white',
  //   elevation: 2,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.2,
  //   shadowRadius: 2,
  //   shadowOffset: {
  //     width: 1,
  //     height: 1,
  //   },
  // },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    padding: 1,
    borderRadius: 6,
    position: "relative",
  },
  inactiveTab: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 4,
    paddingVertical: 8,
    zIndex: 2, // Make sure text appears above indicator
  },
  activeTab: {
    // Remove the elevation/shadows from here since we'll use the indicator
    backgroundColor: "transparent",
  },
  activeTabIndicator: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 4,
    height: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
