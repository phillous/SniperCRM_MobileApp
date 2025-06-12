import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { toast } from 'sonner-native';

type FormDataProps = {
  newPassword: string;
  confirmNewPassword: string;
};

const Page = () => {
  const { width: windowWidth } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [newPasswordFocus, setNewPasswordFocus] = useState<boolean>(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState<boolean>(false);

  const password = watch('newPassword');

  const pressed = () => {
    toast.success('Password has been reset');
    router.replace('/login');
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={require('@/assets/images/Snipercrm-smallLogo.png')}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />
        <Text style={{ fontSize: 24, fontFamily: 'inter', color: Colors.dark }}>
          SetUp Your Password!
        </Text>
      </View>
      <View style={[styles.content, { width: windowWidth - 40 }]}>
        <View style={[styles.formContainer, { width: '100%' }]}>
          <View style={{ gap: 4 }}>
            <Text style={styles.labelText}>New Password</Text>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isTouched, isDirty },
              }) => (
                <View
                  style={[
                    defaultStyles.inputContainer,
                    newPasswordFocus || value?.length > 0 ? styles.isActive : null,
                  ]}
                >
                  <TextInput
                    style={[defaultStyles.inputField]}
                    placeholder="NewPassword"
                    placeholderTextColor={Colors.grey}
                    secureTextEntry={!showPassword}
                    onBlur={() => {
                      setNewPasswordFocus(false);
                      onBlur;
                    }}
                    onFocus={() => {
                      console.log('Clicked');
                      setNewPasswordFocus(true);
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                  <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                    <Feather
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={18}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          {(errors.newPassword?.message || errors.confirmNewPassword?.message) && (
            <Text
              style={styles.error}
            >{`${errors.newPassword?.message || errors.confirmNewPassword?.message}`}</Text>
          )}
          <View style={{ gap: 4 }}>
            <Text style={styles.labelText}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmNewPassword"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: (value) => value === password || 'Passwords do not match', // 👈 use the watched password here
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isTouched, isDirty },
              }) => (
                <View
                  style={[
                    defaultStyles.inputContainer,
                    confirmPasswordFocus || value?.length > 0 ? styles.isActive : null,
                  ]}
                >
                  <TextInput
                    style={[defaultStyles.inputField]}
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors.grey}
                    secureTextEntry={!showPassword}
                    onBlur={() => {
                      setConfirmPasswordFocus(false);
                      onBlur;
                    }}
                    onFocus={() => {
                      console.log('Clicked');
                      setConfirmPasswordFocus(true);
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                  <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                    <Feather
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={18}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
        <TouchableOpacity style={[styles.resetButton]} onPress={() => pressed()}>
          <Text style={[defaultStyles.btnText, { color: 'white' }]}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    gap: 12,
    marginTop: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  formContainer: {
    marginTop: 20,
    gap: 12,
  },
  labels: {
    fontFamily: 'inter-s',
    fontSize: 14,
    color: Colors.dark,
  },
  labelText: {
    color: Colors.dark,
    fontFamily: 'inter-sb',
    fontSize: 14,
  },
  showPassword: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  error: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: 'inter-r',
    paddingVertical: 8,
  },
  loginBtn: {
    alignSelf: 'flex-end',
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  isActive: {
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
    backgroundColor: 'rgba(66, 135, 245, 0.2)',
  },
  resetButton: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
});
