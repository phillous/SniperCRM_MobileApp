import DropdownComponent from "@/components/ui/Dropdown";
import Colors from "@/constants/Colors";
import {
    agent,
    expenseTypes,
    Orders,
    productPackage,
    staffs,
} from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
  agent: string;
  productPackage: string;
  amountPaid: number;
  deliveryFee: number;
  deliveryDate: string;
  soldBy: string;
  expenses: { expenseType: string; amount: string }[];
};

const Page = () => {
  const date = new Date();
  const formatted = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      agent: "",
      productPackage: "",
      amountPaid: 0,
      deliveryFee: 0,
      deliveryDate: formatted,
      soldBy: "",
      expenses: [{ expenseType: "", amount: "" }],
    },
  });

  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "expenses",
  });
  const [openCalendar, setOpenCalendar] = useState(false);
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [checked, setChecked] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    // handle form save or API call here
  };

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { gap: 12 }]}>
          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Select From Lagos Agent </Text>
            <Controller
              control={control}
              name="agent"
              rules={{
                required: "Agent is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={agent}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Delivered by"
                />
              )}
            />
          </View>
          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Select Package Delivered </Text>
            <Controller
              control={control}
              name="productPackage"
              rules={{
                required: "Product package is required",
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
            <Text style={styles.label}>Total Amount Paid By Customer </Text>
            <Controller
              control={control}
              name="amountPaid"
              rules={{
                required: "amountPaid is required",
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
            <Text style={styles.label}>Delivery Fee </Text>
            <Controller
              control={control}
              name="deliveryFee"
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
            <Text style={styles.label}>Delivery Date </Text>
            <Controller
              control={control}
              name="deliveryDate"
              rules={{
                required: "Delivery Date is required",
              }}
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                  onPress={() => setOpenCalendar(true)}
                >
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
                  <Ionicons name="calendar-outline" size={18} />
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Sold By </Text>
            <Controller
              control={control}
              name="soldBy"
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={staffs}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select Staff"
                />
              )}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center",}}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.label}>Add Expenses</Text>
          </View>
          {checked && (
            <>
              {fields.map((field, index) => (
                <View
                  key={field.id}
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <View style={{ width: "65%" }}>
                    <Text style={styles.label}>Expenses</Text>
                    <Controller
                      control={control}
                      name={`expenses.${index}.expenseType`}
                      rules={{
                        required: "ExpenseType is required",
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
                  <View style={{ width: "35%" }}>
                    <Text style={styles.label}>Amount </Text>
                    <Controller
                      control={control}
                      name={`expenses.${index}.amount`}
                      rules={{
                        required: "Agent is required",
                      }}
                      render={({
                        field: { onChange, onBlur, value },
                        // fieldState: { isTouched, isDirty },
                      }) => (
                        <View
                          style={[
                            styles.inputContainer,
                            {
                              paddingHorizontal: 4,
                              height: 40,
                              marginTop: 4,
                              backgroundColor: "transparent",
                              borderWidth: StyleSheet.hairlineWidth,
                              borderRadius: 8,
                              borderColor: Colors.grey,
                            },
                          ]}
                        >
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
                </View>
              ))}
              <View style={{ flexDirection: "row", maxWidth: "40%" }}>
                <TouchableOpacity
                  onPress={() => append({ expenseType: "", amount: "" })}
                >
                  <Ionicons name="add-circle-outline" size={24} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 8, fontFamily: "inter" }}>
                  Add More
                </Text>
              </View>
            </>
          )}
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
              style={[styles.label, { color: "white", fontFamily: "inter-s" }]}
            >
              Save
            </Text>
          </TouchableOpacity>
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
    marginTop: 40,
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
