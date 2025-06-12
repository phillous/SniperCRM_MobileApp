import DropdownComponent from "@/components/ui/Dropdown";
import Colors from "@/constants/Colors";
import { expenseTypes, Orders, productPackage } from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormValues = {
  name: string ;
  phoneNumber: string ;
  whatsappNumber: string ;
  email: string ;
  address: string ;
  state: string ;
  price: number ;
  quantity: string ;
  productName: string ;
};

const Page = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const order = Orders.find((item) => item.id === id);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: order?.customerName || '',
      phoneNumber: order?.phoneNumber || '',
      whatsappNumber: order?.whatsappNumber || '',
      email: order?.email || '',
      address: order?.address || '',
      state: order?.state || '',
      price: order?.sellingPrice || 0,
      quantity: order?.quantity || '',
      productName: order?.productName || '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    // handle form save or API call here
  };

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Order not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 10 }}>
        <LinearGradient
          style={[styles.gradient, { height: 80 }]}
          colors={["#4287f5", "#4288f6"]}
        />
        <View
          style={{
            paddingTop: top,
            marginHorizontal: 18,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>

          <Animated.Text
            style={{
              color: "white",
              fontFamily: "inter-sb",
              fontSize: 16,
              flex: 1,
            }}
          >
            {name}&apos;s Order
          </Animated.Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={[styles.content, {paddingBottom: 24}]}>
          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Customers Name is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Phone Number:</Text>
            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required: "Phone Number is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={String(value)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Phone Number:</Text>
            <Controller
              control={control}
              name="whatsappNumber"
              rules={{
                required: "Phone Number is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={String(value)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Email:</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Address:</Text>
            <Controller
              control={control}
              name="address"
              rules={{
                required: "Address is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                      
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>State:</Text>
            <Controller
              control={control}
              name="state"
              rules={{
                required: "State is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={expenseTypes}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select"
                />
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Price</Text>
            <Controller
              control={control}
              name="sellingPrice"
              rules={{
                required: "Price is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Quantity</Text>
            <Controller
              control={control}
              name="quantity"
              rules={{
                required: "Price is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={String(value)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Change Product</Text>
            <Controller
              control={control}
              name="productName"
              rules={{
                required: "Please select a product",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={productPackage}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select"
                />
              )}
            />
          </View>

          <View style={{marginVertical: 8}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                height: 40,
                backgroundColor: Colors.blue,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text
                style={[
                  styles.label,
                  { color: "white", fontFamily: "inter-s" },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                height: 40,
                marginVertical: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text
                style={[
                  styles.label,
                  { color: "black", fontFamily: "inter-s" },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
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
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 18,
  },
  gradient: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    height: 40,
    gap: 4,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  label: {
    fontFamily: "inter",
    fontSize: 18,
  },
});
