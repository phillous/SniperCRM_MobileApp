import { Orders } from '@/utils/data';
import { orderProps, Status } from '@/utils/types';
import React, { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import RenderItem from './RenderItem';

import Colors from '@/constants/Colors';
import useScrollContext from '@/context/scrollContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from '../ui/Footer';
import Actions from './Actions';
import SearchContainer from './SearchContainer';

interface OrdersStatusProps {
  status: Status;
}

const OrdersList = ({ status }: OrdersStatusProps) => {
  const filteredOrders = Orders.filter((order) => order.status === status).map((item) => ({
    ...item,
    backgroundColor: item.status === 'Pending' ? Colors.blue : Colors.primary,
  }));

  const { height: windowHeight } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const { scrollY } = useScrollContext();
  const [visible, setVisible] = useState<boolean>(false)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  
const [selectedItem, setSelectedItem] = useState<orderProps | null>(null);

function OnChangeVisibility(value: boolean, item?: orderProps) {
  setVisible(value);
  setSelectedItem(value ? item ?? null : null);
}
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Animated.FlatList
        data={filteredOrders}
        renderItem={({ item }: { item: orderProps & { backgroundColor: string } }) => (
          <RenderItem item={item} onChangeVisible={(value) => OnChangeVisibility(value, item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: windowHeight / 7 + top ,
          paddingBottom: 55,
          gap: 8,
          marginHorizontal: 18,
          // Add some bottom padding
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.background,
            }}
          />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={<EmptyState />}
        ListHeaderComponent={() => <SearchContainer />}
        
      />

      {selectedItem && (
    <Footer title="Actions" visible={visible} setVisible={setVisible}>
      <Actions id={selectedItem.id} name={selectedItem.customerName} />
    </Footer>
  )}
      
    </View>
  );
};

const EmptyState = () => (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Ionicons name="receipt-outline" size={40} color={Colors.grey} />
    <Text style={{ color: Colors.grey, marginTop: 10 }}>No orders found</Text>
  </View>
);

export default OrdersList;
