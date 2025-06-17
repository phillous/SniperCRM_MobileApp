import DropdownComponent from "@/components/ui/Dropdown";
import Footer from "@/components/ui/Footer";
import Colors from "@/constants/Colors";
import { booleanValue, Orders, timeReminder } from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";

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

type FormValue = {
  deliveryDate: string;
  deliveryTime: string;
  timeToSendMeReminder: string;
  sendWhatsappSmsToCustomer: string;
  sendScheduledDateToCustomer: string;
  comment: string;
};

const Page = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [activePicker, setActivePicker] = useState<"calendar" | "time" | null>(
    null
  );
  const today = new Date().toISOString().substring(0, 10);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      deliveryDate: today,
      deliveryTime: "",
      timeToSendMeReminder: "None",
      sendWhatsappSmsToCustomer: "Yes",
      sendScheduledDateToCustomer: "Yes",
      comment: "",
    },
  });
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const onSubmit = (data: FormValue) => {
    console.log(data);
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
            Deliver To {name} On...
          </Animated.Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={{ marginVertical: 8 }}>
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
                  onPress={() => setActivePicker("calendar")}
                >
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onBlur={onBlur}
                    value={String(value)}
                    keyboardType="numeric"
                  />
                  <Ionicons name="calendar-outline" size={18} />
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Delivery Time </Text>
            <Controller
              control={control}
              name="deliveryTime"
              rules={{
                required: "Delivery Time is required",
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
                  onPress={() => setActivePicker("time")}
                >
                  <TextInput
                    style={{
                      color: Colors.grey,
                      fontSize: 16,
                      fontFamily: "inter-s",
                    }}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="numeric"
                  />
                  <Ionicons name="time-outline" size={18} />
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Time to Send me Reminder</Text>
            <Controller
              control={control}
              name="timeToSendMeReminder"
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={timeReminder}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="None"
                />
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Send Whatsapp/Sms to Customer</Text>
            <Controller
              control={control}
              name="sendWhatsappSmsToCustomer"
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={booleanValue}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Yes"
                />
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.label}>Send Whatsapp/Sms to Customer</Text>
            <Controller
              control={control}
              name="sendScheduledDateToCustomer"
              render={({
                field: { onChange, onBlur, value },
                // fieldState: { isTouched, isDirty },
              }) => (
                <DropdownComponent
                  data={booleanValue}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Yes"
                />
              )}
            />
          </View>

          <View>
            <Text style={styles.label}>Any Additional Comment?</Text>
            <Controller
              control={control}
              name="comment"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  multiline
                  verticalAlign="top"
                  style={{
                    height: 80,
                    borderWidth: 0.5,
                    borderColor: "#ccc",
                    padding: 8,
                    borderRadius: 4,
                  }}
                />
              )}
            />
          </View>

          <View style={{ marginVertical: 8 }}>
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
      <Footer
        title={
          activePicker === "calendar"
            ? "Select Delivery Date"
            : "Select Delivery Time"
        }
        visible={!!activePicker}
        setVisible={() => setActivePicker(null)}
      >
        {activePicker === "calendar" && (
          <DatePicker
            current={today}
            selected={today}
            mode="calendar"
            isGregorian={true}
            locale="en"
            onSelectedChange={(date: string) => {
              setValue("deliveryDate", date); // set date value in form
              setActivePicker(null); // close modal
            }}
            options={{
              defaultFont: "inter",
              headerFont: "inter-sb",
              borderColor: "transparent",
              mainColor: Colors.blue,
            }}
          />
        )}
        {activePicker === "time" && (
          <DatePicker
            mode={"time"}
            isGregorian={true}
            minuteInterval={1} // This allows minute selection
            locale="en"
            onTimeChange={(time: string) => {
              setValue("deliveryTime", time);
              setActivePicker(null);
              console.log("Selected time");
            }}
            options={{
              defaultFont: "inter",
              headerFont: "inter-sb",
              borderColor: "transparent",
              mainColor: Colors.blue,
            }}
          />
        )}
      </Footer>
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
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    fontFamily: "inter",
    fontSize: 18,
  },
});
