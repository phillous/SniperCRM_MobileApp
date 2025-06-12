import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import Colors, { BadgeColors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Orders } from '@/utils/data';
import { getStatusColor } from '@/utils/datefns';
import { Status } from '@/utils/types';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { id, name, status } = useLocalSearchParams<{ id: string; name: string; status: Status }>();
  const { height: windowHeight } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  // Find the order
  const order = Orders.find((item) => item.id === id);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Order not found</Text>
      </View>
    );
  }

  function onCopyClipboard() {}
  return (
    <View style={styles.container}>
      <View style={{zIndex: 10}}>
        <LinearGradient style={[styles.gradient, { height: 80 }]}  colors={['#4287f5', '#4288f6']} />
      <View style={{ paddingTop: top, marginHorizontal: 18, flexDirection:'row', alignItems: 'center'  }}>
        <TouchableOpacity style={{marginRight: 8}} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        
          <Animated.Text style={{ color: 'white', fontFamily: 'inter-sb', fontSize: 16, flex: 1 }}>
            {name}&apos;s Order
          </Animated.Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Animated.Text
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: getStatusColor(status),
                color: 'black',
                fontFamily: 'inter-sb',
              }}
            >
              {status}
            </Animated.Text>
          </View>
        </View>
      
      </View>
      <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* order information */}
        <View style={defaultStyles.card}>
          <Text style={styles.headerText}>Order Information</Text>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <View style={{ padding: 4, backgroundColor: BadgeColors.black, borderRadius: 6 }}>
              <Ionicons name="folder" size={40} color="rgba(255, 231, 13, 1)" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors.grey, fontFamily: 'inter', fontSize: 14 }}>
                Order Id:
              </Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontFamily: 'inter-sb', fontSize: 14 }}>{order.id}</Text>
                <TouchableOpacity onPress={onCopyClipboard}>
                  <Ionicons name="copy-outline" size={22} />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                alignSelf: 'flex-start',
                color: Colors.grey,
                fontSize: 12,
                fontFamily: 'inter',
              }}
            >
              Updated 2mins ago
            </Text>
          </View>
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.background }} />
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View style={{ gap: 4 }}>
              <Text style={[styles.label, { fontSize: 14 }]}>Order Date:</Text>
              <Text style={styles.labelText}>{order.orderDate}</Text>
            </View>
            <View style={{ gap: 4 }}>
              <Text style={[styles.label, { fontSize: 14 }]}>Order Offer:</Text>
              <Text style={styles.labelText}>{order.offerStatus}</Text>
            </View>
            <View style={{ gap: 4 }}>
              <Text style={[styles.label, { fontSize: 14 }]}>Status:</Text>
              <Text style={styles.labelText}>{order.status}</Text>
            </View>
          </View>
        </View>
        {/* product offers */}
        <View style={defaultStyles.card}>
          {/* main offer */}
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Main Offer</Text>
              <TouchableOpacity>
                <Feather name="edit" size={22} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  paddingVertical: 8,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.lightGray,
                }}
              >
                <Text style={[styles.label, { fontSize: 18, flexWrap: 'wrap' }]}>
                  Product Name:{' '}
                  <Text style={[styles.labelText, { color: 'black', fontSize: 18 }]}>
                    FoodsFoods FO{' '}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  marginTop: 8,
                  paddingVertical: 8,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.lightGray,
                }}
              >
                <Text style={[styles.label, { fontSize: 18 }]}>Offer Name:</Text>
                <Text style={{ fontSize: 18, maxWidth: '80%' }}>Buy 4 eyeglass get 2 free</Text>
              </View>
              <Text style={{ fontFamily: 'inter', marginTop: 8 }}>1 Bottle</Text>
              <Text style={{ fontFamily: 'inter' }}>NGN4,000</Text>
            </View>
          </View>
        </View>
        {/* customer information */}
        <View style={defaultStyles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Customer Information</Text>
            <TouchableOpacity>
              <Feather name="edit" size={22} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.customerInfoCard}>
            <Text style={[styles.label, { fontSize: 18 }]}>Name:</Text>
            <Text style={[styles.labelText, { fontSize: 18 }]}>{order.customerName}</Text>
          </View>
          <View style={styles.customerInfoCard}>
            <Text style={[styles.label, { fontSize: 18 }]}>Email:</Text>
            <Text style={[styles.labelText, { fontSize: 18 }]}>{order.email}</Text>
          </View>
          <View style={styles.customerInfoCard}>
            <Text style={[styles.label, { fontSize: 18 }]}>Mobile:</Text>
            <Text style={[styles.labelText, { fontSize: 18 }]}>
              {order.whatsappNumber}
              {order.phoneNumber}
            </Text>
          </View>
          <View style={styles.customerInfoCard}>
            <Text style={[styles.label, { fontSize: 18 }]}>Address:</Text>
            <Text style={[styles.labelText, { fontSize: 18, flexWrap: 'wrap' }]}>
              {order.address}
            </Text>
          </View>
          <View style={{ gap: 4 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="logo-whatsapp" size={24} color={Colors.green} />
              <Text style={[styles.labelText, { color: Colors.grey }]}>
                Send a Whatsapp Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Feather name="phone" size={22} color={Colors.blue} />
              <Text style={[styles.labelText, { color: Colors.grey }]}>Call the Customer</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* extra information */}
        <View style={defaultStyles.card}>
          <View style={styles.header}>
            <Text style={[styles.label, { fontSize: 18 }]}>On Hold By:</Text>
            <Text style={[styles.labelText, { fontSize: 18, flexWrap: 'wrap' }]}>
              {order.onHoldby}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.label, { fontSize: 18 }]}>Tags: </Text>
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: BadgeColors.yellow,
                paddingHorizontal: 12,
                alignSelf: 'center', // now this will work
              }}
            >
              <Text style={{ fontFamily: 'inter' }}>{order.tag}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={[styles.label, { fontSize: 18 }]}>State:</Text>
            <Text style={[styles.labelText, { fontSize: 18 }]}>{order.country}</Text>
          </View>
          <View style={styles.header}>
            <Text style={[styles.label, { fontSize: 18 }]}>Country:</Text>
            <Text style={[styles.labelText, { fontSize: 18 }]}>{order.country}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightGrey',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  content: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 18,
  },
  label: {
    color: Colors.grey,
    fontSize: 12,
    fontFamily: 'inter',
  },
  labelText: {
    fontFamily: 'inter-s',
    fontSize: 14,
  },
  headerText: { fontFamily: 'inter-b', fontSize: 18 },
  customerInfoCard: {
    gap: 4,
    paddingVertical: 8,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
  },
});
