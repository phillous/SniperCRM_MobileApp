import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { getStatusColor } from '@/utils/datefns';
import { orderProps } from '@/utils/types';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tooltip } from 'react-native-paper';

type renderOrderProps = {
  item: orderProps;
  onChangeVisible: (index: boolean) => void
};

const RenderItem = ({ item, onChangeVisible }: renderOrderProps) => {
  // const [copiedText, setCopiedText] = useState('');
  const [visible, setVisible] = useState(false)

  const copyToClipboard = async (e:any) => {
    // e.stopPropagation()
    console.log("Copy clicked")
    await Clipboard.setStringAsync(`${item.id}`);
    
  };
  return (
    <View style={defaultStyles.ordersCard}>
      <Link
      href={`/(auth)/details/${item?.id}?name=${item?.customerName ? encodeURIComponent(item?.customerName) : ''}&status=${item?.status ? encodeURIComponent(item?.status) : ''}`}
      asChild
    >
      <Pressable >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View
            style={{
              paddingVertical: 6,
              paddingHorizontal: 8,
              backgroundColor: getStatusColor(item.status),
              borderRadius: 8,
            }}
          >
            <Text style={{ color: Colors.grey, fontFamily: 'inter-sb' }}>{item.status}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 12, fontFamily: 'inter' }}>{item.id}</Text>
            <Tooltip title="Copied!" enterTouchDelay={0}
  leaveTouchDelay={2000}>
              <TouchableOpacity onPress={copyToClipboard} hitSlop={10}>
                <Ionicons name="copy-outline" size={18}  />
              </TouchableOpacity>
            </Tooltip>
            
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 18, fontFamily: 'inter-sb' }}>
            {item.productName}
          </Text>
          <Pressable
            style={{
              paddingVertical: 4,
              paddingHorizontal: 6,
              borderRadius: 16,
              backgroundColor: Colors.background,
            }}
            onPress={() => {
              console.log("action")
              // setVisible(true)
              onChangeVisible(true)
            }}
          >
            
              <Ionicons name="ellipsis-horizontal-outline" size={24} color="black" />
           
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'inter',
          }}
        >
          {item.customerName}
        </Text>
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.lightGray,
            paddingVertical: 4,
          }}
        >
          <Text style={{ fontSize: 12, fontFamily: 'inter', color: Colors.grey }}>Address:</Text>
          <Text style={styles.orderText}>{item.address}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', maxWidth: '75%' }}>
            {item.onHoldby && (
              <View style={{ width: '35%' }}>
                <Text style={{ fontSize: 10, fontFamily: 'inter', color: Colors.grey }}>
                  On hold by:
                </Text>
                <Text style={[styles.orderText, { fontSize: 12, flexWrap: 'wrap' }]}>
                  {item.onHoldby}
                </Text>
              </View>
            )}
            {item.onHoldby && (
              <View style={{ width: '35%' }}>
                <Text style={{ fontSize: 10, fontFamily: 'inter', color: Colors.grey }}>
                  Time Updated:
                </Text>
                <Text style={[styles.orderText, { fontSize: 12, flexWrap: 'wrap' }]}>
                  {item.onHoldby}
                </Text>
              </View>
            )}
            {item.status !== 'Delivered' && item.status !== 'Cash Remitted' && item.onHoldby ? (
              <View style={{ width: '35%' }}>
                <Text style={{ fontSize: 10, fontFamily: 'inter', color: Colors.grey }}>
                  on Hold By:
                </Text>
                <Text style={[styles.orderText, { fontSize: 12, flexWrap: 'wrap' }]}>
                  {item.onHoldby}
                </Text>
              </View>
            ) : (
              item.onHoldby && (
                <View>
                  <Text style={{ fontSize: 10, fontFamily: 'inter', color: Colors.grey }}>
                    Delivered on:
                  </Text>
                  <Text style={[styles.orderText, { fontSize: 12 }]}>{item.timeUpdated}</Text>
                </View>
              )
            )}

            {item.timeUpdated && (
              <View>
                <Text style={{ fontSize: 10, fontFamily: 'inter', color: Colors.grey }}>
                  Time Updated:
                </Text>
                <Text style={[styles.orderText, { fontSize: 12 }]}>{item.timeUpdated}</Text>
              </View>
            )}
            {item.timeUpdated && (
              <View>
                <Text style={{ fontSize: 10, fontFamily: 'inter', color: Colors.grey }}>
                  Deliver on:
                </Text>
                <Text style={styles.orderText}>{item.timeUpdated}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Pressable>
              <Ionicons name="logo-whatsapp" size={24} color={Colors.green} />
            </Pressable>
            <Pressable>
              <Feather name="phone" size={18} color={Colors.blue} />
            </Pressable>
          </View>
        </View>
        
      </Pressable>
      
    </Link>
    
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  orderText: { flex: 1, flexWrap: 'wrap', fontSize: 14, fontFamily: 'inter' },
});
