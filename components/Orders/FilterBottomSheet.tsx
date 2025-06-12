import Filters from '@/components/Orders/Filters';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Portal } from '@gorhom/portal';
import { format } from 'date-fns';
import { Easing } from 'react-native-reanimated';
import BottomModal from '../ui/Modal';

const FILTER_PERIOD = [
  'Today',
  'Yesterday',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  'This Year',
];
const DATE_FILTER = [
  'By Order Date',
  'By Delivered Date',
  'By Scheduled Date',
  'By follow-up Date',
  'By edit/Upated Date',
];
const FILTER_COUNTRY = ['Nigeria', 'United States', 'Ghana'];
const FILTER_STATE = ['Lagos', 'Abuja', 'Ibadan', 'Enugu', 'Kaduna'];
const FILTER_PRODUCT = ['Product A', 'Product B', 'Product C', 'Product D'];
const FILTER_FORM = ['Form A', 'Form B', 'Form C', 'Form D'];
const FILTER_ORDERTYPE = ['Main Offer', 'Order Bump', 'Upsell'];
const FILTER_TAGS = ['Repeat Customers', 'Abijo customers'];
const FILTER_AGENTS = ['Theophilus', 'Daniel', 'Alex', 'David'];
const FILTER_USERS = ['Ola', 'Kelvin', 'Ben', 'Paul'];
const FILTER_MARKETERS = ['Nanabo', 'Victor'];

type FilterKey =
  | 'period'
  | 'dateFilter'
  | 'country'
  | 'state'
  | 'products'
  | 'forms'
  | 'tags'
  | 'orderType'
  | 'tags'
  | 'users'
  | 'agents'
  | 'marketers';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
};

const Page = ({ bottomSheetRef }: Props) => {
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [periodFilters, setPeriodFilters] = useState<string | null>(null);
  const [dateFilters, setDateFilters] = useState<string | null>(null);
  const [countryFilters, setCountryFilters] = useState<string | null>(null);
  const [stateFilters, setStateFilters] = useState<string | null>(null);
  const [productFilters, setProductFilters] = useState<string | null>(null);
  const [formFilters, setFormFilters] = useState<string | null>(null);
  const [orderTypeFilters, setOrderTypeFilters] = useState<string | null>(null);
  const [tagFilters, setTagFilters] = useState<string | null>(null);
  const [agentFilters, setAgentFilters] = useState<string | null>(null);
  const [userFilters, setUserFilters] = useState<string | null>(null);
  const [marketerFilters, setMarketerFilters] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string[]>([]);

  const [visible, setVisible] = useState<boolean>(false);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
    easing: Easing.ease,
  });

  const toggleFilter = (key: FilterKey) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  const handlePeriodFilterChange = useCallback((updated: string) => {
    setPeriodFilters(updated);
    console.log('Selected Period:', updated);
  }, []);

  const handleDateFilterChange = useCallback((updated: string) => {
    setDateFilters(updated);
    console.log('Selected Date Filter:', updated);
  }, []);

  const handleCountryFilterChange = useCallback((updated: string) => {
    setCountryFilters(updated);
    console.log('Selected Country:', updated);
  }, []);

  const handleStateFilterChange = useCallback((updated: string) => {
    setStateFilters(updated);
    console.log('Selected State:', updated);
  }, []);

  const handleDateRange = useCallback((selectedDate: string[]) => {
    setDateRange(selectedDate);
  }, []);

  const handleProductFilterChange = useCallback((updated: string) => {
    setProductFilters(updated);
    console.log('Selected Product:', updated);
  }, []);

  const handleFormFilterChange = useCallback((updated: string) => {
    setFormFilters(updated);
    console.log('Selected Form:', updated);
  }, []);

  const handleOrderTypeFilterChange = useCallback((updated: string) => {
    setOrderTypeFilters(updated);
    console.log('Selected OrderType:', updated);
  }, []);

  const handleTagFilterChange = useCallback((updated: string) => {
    setTagFilters(updated);
    console.log('Selected Tag:', updated);
  }, []);

  const handleAgentFilterChange = useCallback((updated: string) => {
    setAgentFilters(updated);
    console.log('Selected Agent:', updated);
  }, []);

  const handleUserFilterChange = useCallback((updated: string) => {
    setUserFilters(updated);
    console.log('Selected User:', updated);
  }, []);

  const handleMarketerFilterChange = useCallback((updated: string) => {
    setMarketerFilters(updated);
    console.log('Selected Marketer:', updated);
  }, []);

  const handleSubmit = () => {
    // Collect all filter values
    const filters = {
      period: periodFilters,
      dateFilter: dateFilters,
      country: countryFilters,
      state: stateFilters,
      products: productFilters,
      forms: formFilters,
      orderType: orderTypeFilters,
      tags: tagFilters,
      agents: agentFilters,
      users: userFilters,
      marketers: marketerFilters,
      dateRange:
        dateRange.length === 2
          ? {
              start: dateRange[0],
              end: dateRange[1],
            }
          : null,
    };

    // Filter out null/empty values
    const submittedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) =>
          value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0),
      ),
    );

    console.log('Submitting filters:', submittedFilters);

    // Here you would typically send the filters to your API
    // For example:
    // await submitFilters(submittedFilters);

    // Close the bottom sheet
    bottomSheetRef.current?.close();

    return submittedFilters;
  };

  const resetFields = () => {
    setPeriodFilters(null);
    setDateFilters(null);
    setCountryFilters(null);
    setDateRange([]);
    setFormFilters(null);
    setMarketerFilters(null);
    setTagFilters(null);
    setOrderTypeFilters(null);
    setAgentFilters(null);
    setUserFilters(null);

    bottomSheetRef.current?.close();
  };
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <Portal name="bottom-sheet">
      <BottomSheet
        ref={bottomSheetRef}
        style={styles.sheetContainer}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: Colors.grey }}
        animationConfigs={animationConfigs}
        animateOnMount={false}
        enableContentPanningGesture={false} // Disable content panning
        enableOverDrag={false}
        android_keyboardInputMode="adjustPan" // Prevent automatic resizing
        keyboardBehavior="interactive" // Better keyboard handling
        keyboardBlurBehavior="none" // Don't blur on keyboard
        snapPoints={['95%']} // Fixed height
      >
        <View style={styles.header}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Filter</Text>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
            style={[defaultStyles.roundCircle, { backgroundColor: Colors.background }]}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.content}>
            <View style={defaultStyles.card}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Duration</Text>

                <Ionicons name="time-outline" size={24} color={Colors.blue} />
              </View>

              {/* Period Filter */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16, flex: 1 }}>Period</Text>
                  <TouchableOpacity onPress={() => toggleFilter('period')}>
                    <Ionicons
                      name={openFilter === 'period' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'period' && (
                  <Filters
                    data={FILTER_PERIOD}
                    selectedFilters={periodFilters}
                    onChange={handlePeriodFilterChange}
                  />
                )}
              </View>

              {/* Date Filter */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Date Filter</Text>
                  <TouchableOpacity onPress={() => toggleFilter('dateFilter')}>
                    <Ionicons
                      name={openFilter === 'dateFilter' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'dateFilter' && (
                  <Filters
                    data={DATE_FILTER}
                    selectedFilters={dateFilters}
                    onChange={handleDateFilterChange}
                  />
                )}
              </View>

              {/* Date Range Placeholder */}
              <View>
                <Text style={{ fontSize: 16, marginBottom: 12 }}>Date Range</Text>
                <TouchableOpacity style={styles.dateContainer} onPress={() => setVisible(true)}>
                  <Text>
                    {dateRange.length === 2
                      ? `${format(dateRange[0], 'MMM do')} - ${format(dateRange[1], 'MMM do')}`
                      : 'Select Date Range'}{' '}
                  </Text>
                  <Ionicons name="calendar-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={defaultStyles.card}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Country and Region</Text>

                <Ionicons name="globe-outline" size={24} color={Colors.blue} />
              </View>

              {/* Country */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Country</Text>
                  <TouchableOpacity onPress={() => toggleFilter('country')}>
                    <Ionicons
                      name={openFilter === 'country' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'country' && (
                  <Filters
                    data={FILTER_COUNTRY}
                    selectedFilters={countryFilters}
                    onChange={handleCountryFilterChange}
                  />
                )}
              </View>

              {/* State */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>State</Text>
                  <TouchableOpacity onPress={() => toggleFilter('state')}>
                    <Ionicons
                      name={openFilter === 'state' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'state' && (
                  <Filters
                    data={FILTER_STATE}
                    selectedFilters={stateFilters}
                    onChange={handleStateFilterChange}
                  />
                )}
              </View>
            </View>
            <View style={defaultStyles.card}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Orders</Text>
                <Ionicons name="cart-outline" size={24} color={Colors.blue} />
              </View>

              {/* Order Types */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Order Types</Text>
                  <TouchableOpacity onPress={() => toggleFilter('orderType')}>
                    <Ionicons
                      name={openFilter === 'orderType' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'orderType' && (
                  <Filters
                    data={FILTER_ORDERTYPE}
                    selectedFilters={orderTypeFilters}
                    onChange={handleOrderTypeFilterChange}
                  />
                )}
              </View>

              {/* Product */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Products</Text>
                  <TouchableOpacity onPress={() => toggleFilter('products')}>
                    <Ionicons
                      name={openFilter === 'products' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'products' && (
                  <Filters
                    data={FILTER_PRODUCT}
                    selectedFilters={productFilters}
                    onChange={handleProductFilterChange}
                  />
                )}
              </View>

              {/* Forms */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Orders by Forms</Text>
                  <TouchableOpacity onPress={() => toggleFilter('forms')}>
                    <Ionicons
                      name={openFilter === 'forms' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'forms' && (
                  <Filters
                    data={FILTER_FORM}
                    selectedFilters={formFilters}
                    onChange={handleFormFilterChange}
                  />
                )}
              </View>

              {/* Tags */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Tags</Text>
                  <TouchableOpacity onPress={() => toggleFilter('tags')}>
                    <Ionicons
                      name={openFilter === 'tags' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'tags' && (
                  <Filters
                    data={FILTER_TAGS}
                    selectedFilters={tagFilters}
                    onChange={handleTagFilterChange}
                  />
                )}
              </View>
            </View>

            <View style={defaultStyles.card}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Orders</Text>
                <Ionicons name="cart-outline" size={24} color={Colors.blue} />
              </View>

              {/* Orders held by Staffs */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Orders processed by Staff</Text>
                  <TouchableOpacity onPress={() => toggleFilter('users')}>
                    <Ionicons
                      name={openFilter === 'users' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'users' && (
                  <Filters
                    data={FILTER_USERS}
                    selectedFilters={userFilters}
                    onChange={handleUserFilterChange}
                  />
                )}
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Delivery Agents</Text>
                  <TouchableOpacity onPress={() => toggleFilter('agents')}>
                    <Ionicons
                      name={openFilter === 'agents' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'agents' && (
                  <Filters
                    data={FILTER_AGENTS}
                    selectedFilters={agentFilters}
                    onChange={handleAgentFilterChange}
                  />
                )}
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>Orders by Marketers</Text>
                  <TouchableOpacity onPress={() => toggleFilter('marketers')}>
                    <Ionicons
                      name={openFilter === 'marketers' ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {openFilter === 'marketers' && (
                  <Filters
                    data={FILTER_MARKETERS}
                    selectedFilters={marketerFilters}
                    onChange={handleMarketerFilterChange}
                  />
                )}
              </View>
            </View>
          </View>
          <BottomModal visible={visible} setVisible={setVisible} onChange={handleDateRange} />
        </BottomSheetScrollView>
        <View
          style={[
            defaultStyles.footer,
            { flexDirection: 'row', gap: 4, borderTopWidth: 0, alignContent: 'center' },
          ]}
        >
          <TouchableOpacity
            style={{
              width: '50%',
              alignItems: 'center',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.blue,
              justifyContent: 'center',
            }}
            onPress={() => resetFields()}
          >
            <Text style={{ fontFamily: 'inter', color: Colors.blue, fontSize: 14 }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              alignItems: 'center',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.blue,
              justifyContent: 'center',
              backgroundColor: Colors.blue,
            }}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ fontFamily: 'inter', color: 'white', fontSize: 14 }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  dateContainer: {
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sheetContainer: {
    backgroundColor: 'lightGrey',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
