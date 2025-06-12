import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

const EmptyState = ({message, iconName}: {message: string, iconName: keyof typeof Ionicons.glyphMap}) => {
  const { height: windowHeight } = useWindowDimensions();
  return (
    <View
      style={{
        height: windowHeight / 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: Colors.lightGray,
          fontFamily: 'inter',
        }}
      >
        {message}
      </Text>
      {/* Optional: Add an icon or illustration */}
      <Ionicons name={iconName} size={32} color={Colors.lightGray} style={{ marginTop: 8 }} />
    </View>
  );
};

export default EmptyState;
