import React from 'react';

import { View, Text } from 'react-native';

type BestSellerCardProps = {
  data: Array<{ productName: string; quantitySold: number }>;
};

const BestSellerCard = React.memo(({ data }: BestSellerCardProps) => {
  return (
    <>
      {data.map(
        (
          item: {
            productName: string;
            quantitySold: number;
          },
          index: number,
        ) => (
          <View
            key={`${item.productName}-${index}`}
            style={{ flexDirection: 'row', gap: 4, paddingVertical: 12 }}
          >
            <Text style={{ flex: 1, fontSize: 18, fontFamily: 'inter-s' }}>{item.productName}</Text>
            <Text style={{ fontSize: 18 }}>{item.quantitySold.toLocaleString()}</Text>
          </View>
        ),
      )}
    </>
  );
});

BestSellerCard.displayName = 'BestSellerCard';

export default BestSellerCard;
