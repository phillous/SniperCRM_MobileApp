import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';


type FormDataProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  return (
   <SafeAreaView style={{flex: 1}}>
        
            <Stack.Screen options={{
                header: () => <View><Text style={styles.header}>Security Settings</Text></View>
            }} />
       


   </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
    content: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 18,
  },
})