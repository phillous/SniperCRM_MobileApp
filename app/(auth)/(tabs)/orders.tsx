import ExploreHeader from '@/components/Orders/ExploreHeader';
import FilterBottomSheet from '@/components/Orders/FilterBottomSheet';
import OrdersList from '@/components/Orders/OrdersList';
import SortBottomSheet from '@/components/Orders/SortBottomSheet';
import Colors from '@/constants/Colors';
import { Status } from '@/utils/types';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const OrdersScreen = () => {
  const { height: windowHeight } = useWindowDimensions();
  const [status, setStatus] = useState<Status>('Pending');

  function onStatusChanged(stat: Status) {
    setStatus(stat);
  }
  const bottomSheetRef = useRef<BottomSheet>(null);
  const sortBottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
      <ExploreHeader
        onCategoryChanged={onStatusChanged}
        bottomSheetRef={bottomSheetRef}
        sortBottomSheetRef={sortBottomSheetRef}
        height={windowHeight / 5.5}
      />

      <OrdersList status={status} />
      <FilterBottomSheet bottomSheetRef={bottomSheetRef} />
      <SortBottomSheet bottomSheetRef={sortBottomSheetRef} onCategoryChanged={onStatusChanged} />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
