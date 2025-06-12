import Colors from '@/constants/Colors'
import { Orders } from '@/utils/data'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Page = () => {
    const  {id, name} = useLocalSearchParams<{id:string, name:string}>()
        const {control, handleSubmit, formState: {errors}} = useForm()
        const router = useRouter()
        const {top} = useSafeAreaInsets()
        
        const order = Orders.find((item) => item.id === id);
        
          if (!order) {
            return (
              <View style={styles.container}>
                <Text>Order not found</Text>
              </View>
            );
          }
  return (
    <View style={styles.container}>
          <View style={{zIndex: 10}}>
            <LinearGradient style={[styles.gradient, { height: 80 }]}  colors={['#4287f5', '#4288f6']} />
          <View style={{ paddingTop: top, marginHorizontal: 18, flexDirection:'row', alignItems: 'center'  }}>
            <TouchableOpacity style={{marginRight: 8}} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>
            
              <Animated.Text style={{ color: 'white', fontFamily: 'inter-sb', fontSize: 16, flex: 1 }}>
                Schedule {name}&apos;s Order
              </Animated.Text>
              
            </View>
          
          </View>
          <ScrollView style={styles.container}>
            
          <View style={styles.content}>
            <View>
                <Text>Select From Lagos Agent </Text>
                <Controller
                    control={control}
                    name="Name"
                    rules={{
                        required: 'Customers Name is required',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        // fieldState: { isTouched, isDirty },
                    }) => (
                        <View
                            style={styles.inputContainer}
                            >
                            <TextInput style={{ color: Colors.grey, fontSize: 16, fontFamily: 'inter-s' }} />
                            <Ionicons name="chevron-down" color={Colors.grey} size={24} />
                        </View>
                    ) }/>
            </View>

            </View>
            </ScrollView>
            </View> 
  )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.background
    },
    content: {
        flex: 1, 
        marginTop: 30,
        paddingHorizontal: 18
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
      inputContainer: {
    height: 40,
    gap: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },

})

