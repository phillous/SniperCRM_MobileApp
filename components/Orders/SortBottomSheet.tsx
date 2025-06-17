import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { setSelectedCategoryIndex } from '@/store/orderSlice';
import { orderStatus } from '@/utils/data';
import { Status } from '@/utils/types';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Portal } from '@gorhom/portal';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  onCategoryChanged: (status: Status) => void;
};

const SortBottomSheet = ({ bottomSheetRef }: Props) => {
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
    easing: Easing.ease,
  });
  const dispatch = useDispatch()

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
    <Portal name="sort-sheet">
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
        snapPoints={['95%']} // Fixed height
      >
        <View style={styles.header}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sort</Text>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
            style={[defaultStyles.roundCircle, { backgroundColor: Colors.background }]}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={defaultStyles.card}>
          <BottomSheetFlatList
            data={orderStatus}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [
                  {
                    paddingVertical: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: pressed ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                    borderRadius: 4,
                  },
                ]}
                onPress={() => {
                  dispatch(setSelectedCategoryIndex(index))
                  bottomSheetRef.current?.close();
                }}
              >
                <Text style={{ fontFamily: 'inter' }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={18} />
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: StyleSheet.hairlineWidth,
                  backgroundColor: Colors.grey,
                  marginHorizontal: 6,
                }}
              />
            )}
          />
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default SortBottomSheet;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
});
