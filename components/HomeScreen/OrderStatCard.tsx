import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type OrderStatCardProps = {
  data: {
    status: string;
    count: number;
    percentage: number;
  }[];
};

const OrderStatCard = React.memo(({ data }: OrderStatCardProps) => {
  return (
    <>
      {data.map(
        (
          item: {
            status: string;
            count: number;
            percentage: number;
          },
          index: number,
        ) => (
          <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', gap: 4, paddingVertical: 12 }}
          >
            <Text style={{ flex: 1, fontSize: 18, fontFamily: 'inter-s' }}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 6,
                  backgroundColor: 'rgba(49, 122, 73, 0.2)',
                }}
              >
                <Text
                  style={{
                    color: 'rgb(23, 211, 85)',
                    fontSize: 12,
                    fontFamily: 'inter-sb',
                  }}
                >
                  {item.percentage}%
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>{Number(item.count)}</Text>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </TouchableOpacity>
        ),
      )}
    </>
  );
});
OrderStatCard.displayName = 'OrderStatCard';
export default OrderStatCard;
