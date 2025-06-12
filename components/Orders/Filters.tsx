import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface FiltersProps {
  data: string[];
  selectedFilters: string | null;
  onChange: (updated: string) => void;
}

const FiltersComponent = ({ data, selectedFilters, onChange }: FiltersProps) => {
  const toggleItem = (item: string) => {
    onChange(item);
  };

  return (
    <>
      {data.map((item) => (
        <View key={item}>
          <TouchableOpacity style={styles.row} onPress={() => toggleItem(item)}>
            <Text style={styles.periodName}>{item}</Text>
            <BouncyCheckbox
              textContainerStyle={{ display: 'none' }}
              size={15}
              fillColor={Colors.blue}
              unFillColor="#FFFFFF"
              textStyle={{ color: '#000', fontSize: 16, textDecorationLine: 'none' }}
              isChecked={selectedFilters === item ? true : false}
              onPress={() => toggleItem(item)}
            />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

const Filters = React.memo(FiltersComponent);
Filters.displayName = 'Filters';

export default Filters;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingRight: 3,
  },
  periodName: {
    fontSize: 14,
    color: Colors.grey,
    fontFamily: 'inter-s',

    flex: 1,
  },
});
