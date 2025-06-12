import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const SearchContainer = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => router.push('/(auth)/search')}
      >
        <Ionicons name="search-outline" color={Colors.grey} size={24} />
        <Text style={{ color: Colors.grey, fontSize: 16, fontFamily: 'inter-s' }}>
          Search orders
        </Text>
      </TouchableOpacity>
      {/* <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? Colors.blue : undefined}
        />
        <Text style={styles.label}>Select All</Text>
      </View> */}
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  searchContainer: {
    height: 40,
    gap: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'inter-s',
    fontSize: 14,
    marginLeft: 8,
  },
  checkboxContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
});
