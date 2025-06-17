import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useLogin } from '@/hooks/useLogin';
// import { useLogin } from "@/hooks/useLogin";
import { Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

type FormDataProps = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const { login, isLoading } = useLogin();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  const [isTextFocus, setIsTextFocus] = useState<boolean>(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('@/assets/images/whiteWall.jpg')} style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <Stack.Screen
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" color={Colors.darkBlue} size={32} />
                </TouchableOpacity>
              ),
            }}
          />
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Image
              source={require('@/assets/images/Snipercrm-smallLogo.png')}
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 24, fontFamily: 'inter-b', color: Colors.dark }}>
              Hi, there!
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: Colors.blue,
              fontFamily: 'inter-b',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Login
          </Text>

          <View style={[styles.formContainer, { width: '100%' }]}>
            <View style={{ gap: 4 }}>
              <Text style={styles.labels}>Username/Email</Text>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: 'Username/Email is required',
                }}
                render={({
                  field: { onChange, onBlur, value },
                  // fieldState: { isTouched, isDirty },
                }) => (
                  <Animated.View
                    style={[
                      defaultStyles.inputContainer,
                      isTextFocus || value?.length > 0 ? styles.isActive : null,
                    ]}
                  >
                    <TextInput
                      style={defaultStyles.inputField}
                      placeholder="username"
                      onBlur={() => {
                        setIsTextFocus(false);
                        onBlur;
                      }}
                      onFocus={() => {
                        console.log('Clicked');
                        setIsTextFocus(true);
                      }}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Animated.View>
                )}
              />
            </View>
            {(errors.username?.message || errors.password?.message) && (
              <Text
                style={styles.error}
              >{`${errors.username?.message || errors.password?.message}`}</Text>
            )}
            <View style={{ gap: 4 }}>
              <Text style={styles.labels}>Password</Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 4,
                    message: 'Password must be at least 4 characters',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  // fieldState: { isTouched, isDirty },
                }) => (
                  <View
                    style={[
                      defaultStyles.inputContainer,
                      isPasswordFocus || value?.length > 0 ? styles.isActive : null,
                    ]}
                  >
                    <TextInput
                      style={[defaultStyles.inputField]}
                      placeholder="password"
                      secureTextEntry={!showPassword}
                      onBlur={() => {
                        setIsPasswordFocus(false);
                        onBlur;
                      }}
                      onFocus={() => {
                        console.log('Clicked');
                        setIsPasswordFocus(true);
                      }}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} hitSlop={25}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 6,
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: 'flex-start', flex: 1 }}
              onPress={() => router.push('/forgotPassword')}
            >
              <Text style={{ color: Colors.primary, fontFamily: 'inter-sb', fontSize: 14 }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginBtn, { backgroundColor: Colors.blue }]}
              onPress={onSubmit}
              disabled={isLoading}
            >
              <Text style={[defaultStyles.btnText, { color: 'white' }]}>Login</Text>
              {isLoading && <ActivityIndicator size="small" color={'white'} />}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,

    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 20,
    gap: 12,
  },
  labels: {
    color: Colors.dark,
    fontFamily: 'inter',
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
    width: 120,
    height: 40,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 4,
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
});
