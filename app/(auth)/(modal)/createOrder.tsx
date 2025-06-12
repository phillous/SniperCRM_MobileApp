import DropdownComponent from "@/components/ui/Dropdown";
import Colors from "@/constants/Colors";
import { forms, orderSource, productPackage } from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Checkbox } from "react-native-paper";

import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormValues = {
  formName: string;
  name: string;
  phoneNumber: number;
  whatsappNumber: number;
  email: string;
  address: string;
  productPackage: string;
  quantity: number;
  orderSource: string;
  paymentMethod: string;
};

const CreateOrder = () => {
  const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    formName: '',         // or 0 if you're storing an ID
    name: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    address: '',
    productPackage: '',
    quantity: 1,          // or 0
    orderSource: '',
    paymentMethod: '',
  },
});

  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

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
            Create a New Order
          </Animated.Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Select Form </Text>
            <Controller
              control={control}
              name="formName"
              rules={{
                required: "Customers Name is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={forms}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select"
                />
              )}
            />
          </View>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              marginVertical: 8,
              backgroundColor: Colors.lightGray,
            }}
          />
          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Name:</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Customer's name is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required: "Customer's name is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={String(value)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Whatsapp Number</Text>
            <Controller
              control={control}
              name="whatsappNumber"
              rules={{
                required: "Whatsapp number is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={String(value)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Email Address</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email Address is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Address</Text>
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
                    style={styles.formInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Select your package</Text>
            <Controller
              control={control}
              name="productPackage"
              rules={{
                required: "Please select a package",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.productPackakgeSelection}>
                  {productPackage.map((item, index) => {
                    const isChecked = selectedPackage === item.label;

                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: "row",
                          gap: 2,
                          alignItems: "center",
                          marginVertical: 4,
                        }}
                        onPress={() => {
                          setSelectedPackage(item.label);
                          onChange(item.label); // update the form value
                        }}
                      >
                        <Checkbox
                          status={isChecked ? "checked" : "unchecked"}
                          onPress={() => {
                            setSelectedPackage(item.label);
                            onChange(item.label);
                          }}
                          color={isChecked ? Colors.blue : undefined}
                        />
                        <Text style={{ flex: 1, fontFamily: "inter" }}>
                          {item.label}
                        </Text>
                        <Text style={{ fontSize: 14, fontFamily: "inter-sb" }}>
                          {item.amount}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Quantity</Text>
            <Controller
              control={control}
              name="quantity"
              rules={{
                required: "Quantity is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={String(value)}
                    cursorColor={Colors.dark}
                  />
                </View>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Order Source</Text>
            <Controller
              control={control}
              name="orderSource"
              rules={{
                required: "Please select an order source",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={orderSource}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select"
                />
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Payment Method </Text>
            <Controller
              control={control}
              name="formName"
              rules={{
                required: "Customers Name is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={forms}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select"
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateOrder;

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

    alignItems: "center",
    flexDirection: "row",
  },
  productPackakgeSelection: {
    backgroundColor: "Lightgrey",
    borderRadius: 8,

    gap: 4,
  },
  label: {
    fontFamily: "inter",
    fontSize: 18,
  },
  formInput: {
    color: Colors.dark,
    fontSize: 16,
    fontFamily: "inter-s",
    width: "100%",
    paddingHorizontal: 12,
  },
});
