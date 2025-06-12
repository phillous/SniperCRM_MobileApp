import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { CountryProps } from '@/utils/types';
import { Entypo } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { Easing } from 'react-native-reanimated';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  data?: CountryProps[];
  onChange: (country: CountryProps) => void;
};

const CountryBottomSheet = ({ bottomSheetRef, data = [], onChange }: Props) => {
  // const snapPoints = ['20%'];
  const [flagsLoaded, setFlagsLoaded] = useState(false);
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
    easing: Easing.ease,
  });

  // Preload all flags when data changes
  useEffect(() => {
    const preloadFlags = async () => {
      try {
        // Create promises for each flag
        const flagPromises = data.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const isoCode = item.countrySymbol?.slice(0, 2) || '';
          // This is a placeholder since react-native-country-flag doesn't expose preloading
          // In a real implementation, you would use Image.prefetch for remote flags
          return Promise.resolve();
        });

        await Promise.all(flagPromises);
        setFlagsLoaded(true);
      } catch (error) {
        console.error('Flag preloading error:', error);
        setFlagsLoaded(true); // Continue even if some flags fail
      }
    };

    if (data.length > 0) {
      setFlagsLoaded(false);
      preloadFlags();
    }
  }, [data]);

  const renderItem = useCallback(
    (item: CountryProps) => (
      <TouchableOpacity
        key={item.countryId}
        style={styles.itemContainer}
        onPress={() => {
          onChange(item);
          bottomSheetRef.current?.close();
        }}
      >
        {flagsLoaded ? (
          <CountryFlag isoCode={item.countryCurrency?.slice(0, 2) || ''} size={25} />
        ) : (
          <View style={styles.flagPlaceholder} />
        )}
        <Text style={styles.countryText}>{item.countryName}</Text>
      </TouchableOpacity>
    ),
    [onChange, flagsLoaded],
  );

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
    <BottomSheet
      ref={bottomSheetRef}
      // snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      animationConfigs={animationConfigs}
      style={styles.sheetContainer}
      backdropComponent={renderBackdrop}
      index={-1} // 👈 starts closed
      snapPoints={['25%']}
      animateOnMount={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Country</Text>
        <TouchableOpacity
          style={defaultStyles.roundCircle}
          onPress={() => bottomSheetRef.current?.close()}
        >
          <Entypo name="cross" size={18} color={Colors.grey} />
        </TouchableOpacity>
      </View>

      {!flagsLoaded ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      ) : (
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 12,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#fff',
  },
  countryText: {
    flex: 1,
    color: Colors.dark,
    fontFamily: 'inter-sb',
    fontSize: 18,
    marginLeft: 12,
  },
  sheetContainer: {
    backgroundColor: '#fff',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'inter-sb',
  },
  flagPlaceholder: {
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default CountryBottomSheet;
