import Colors from '@/constants/Colors';
import { useAuthContext } from '@/context/authContext';
import { loginStorage } from '@/utils/storage';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
// import * as LocalAuthentication from 'expo-local-authentication'
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const storage = new MMKV();

const Passcode = ({
  text,
  isLock,
}: {
  text: string;
  confirmPassword?: boolean;
  isLock?: boolean;
}) => {
  const OFFSET = 20;
  const TIME = 80;
  const [code, setCode] = useState<number[]>([]);
  const [hasBiometrics, setHasBiometrics] = useState<boolean>(false);
  const router = useRouter();
  const offset = useSharedValue(0);
  const { authenticate } = useAuthContext();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  const passcodeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(code.length > 0 ? 2 : 1, { duration: 200 }),
        },
      ],
    };
  });

  function onNumberPress(number: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  }

  function numberBackspace() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  }

  // async function onBiometricPress(){
  //     const {success} = await LocalAuthentication.authenticateAsync();
  //         if(success) {
  //             router.replace('/')
  //         } else {
  //             Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
  //         }
  // }

  useEffect(() => {
    const checkForBiometrics = async () => {
      const available = await LocalAuthentication.hasHardwareAsync();
      setHasBiometrics(available);
    };
    checkForBiometrics();
  }, []);

  // Effect for verifying passcode
  useEffect(() => {
    if (code.length === 6) {
      const savedPasscode = storage.getString('passcode');
      if (!savedPasscode) {
        // ✅ Convert array to string (e.g., "123456")
        storage.set('passcode', code.join('')); // Fix: Use .join('') to make it a string
        router.replace('/(public)/passcode/confirmPasscode');
        setCode([]);
        return;
      } else {
        if (code.join('') === savedPasscode) {
          // Compare as strings
          const token = loginStorage.getString('token') as string;
          authenticate(token);
          router.replace('/(auth)/(tabs)/home');
          setCode([]);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          offset.value = withSequence(
            withTiming(-OFFSET, { duration: TIME / 2 }),
            withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
            withTiming(0, { duration: TIME / 2 }),
          );
          setCode([]);
        }
      }
    }
  }, [code]);

  return (
    <View style={{ marginTop: 12, padding: 12 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 12,
          gap: 6,
        }}
      >
        <FontAwesome5 name="lock" color="#03fc52" size={14} />
        <Text style={{ fontSize: 14, fontFamily: 'inter-b', color: Colors.dark }}>{text}</Text>
      </View>
      <Animated.View
        style={[
          animatedStyle,
          {
            flexDirection: 'row',
            gap: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          },
        ]}
      >
        {new Array(6).fill(0).map((_, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                code[index] ? passcodeAnimatedStyle : {},
                {
                  width: 5,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: code[index] ? '#03fc52' : '#D8DCE2',
                },
              ]}
            />
          );
        })}
      </Animated.View>
      <View style={[styles.numButtons, { backgroundColor: 'white' }]}>
        {[1, 2, 3].map((num, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.numberPressed,
              pressed && { backgroundColor: Colors.grey, opacity: 0.2 },
            ]}
            onPress={() => onNumberPress(num)}
          >
            <Text style={{ fontFamily: 'inter-sb', fontSize: 32, color: Colors.darkBlue }}>
              {num}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.numButtons}>
        {[4, 5, 6].map((num, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.numberPressed,
              pressed && { backgroundColor: Colors.grey, opacity: 0.2 },
            ]}
            onPress={() => onNumberPress(num)}
          >
            <Text style={{ fontFamily: 'inter-sb', fontSize: 32, color: Colors.darkBlue }}>
              {num}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.numButtons}>
        {[7, 8, 9].map((num, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.numberPressed,
              pressed && { backgroundColor: Colors.grey, opacity: 0.2 },
            ]}
            onPress={() => onNumberPress(num)}
          >
            <Text style={{ fontFamily: 'inter-sb', fontSize: 32, color: Colors.darkBlue }}>
              {num}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.numButtons}>
        {/* Left Button (Fingerprint) - Fixed width */}
        <View style={{ width: 50 }}>
          {isLock && hasBiometrics && (
            <TouchableOpacity
              style={[styles.numberPressed, { backgroundColor: 'white', width: 50 }]}
            >
              {Platform.OS === 'ios' ? (
                <MaterialCommunityIcons name="face-recognition" size={26} color="black" />
              ) : (
                <MaterialCommunityIcons name="fingerprint" size={26} color="black" />
              )}
            </TouchableOpacity>
          )}
        </View>
        {/* Centered 0 Button - Flex 1 to take remaining space */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Pressable
            onPress={() => onNumberPress(0)}
            style={({ pressed }) => [
              styles.numberPressed,
              pressed && { backgroundColor: Colors.grey, opacity: 0.2 },
            ]}
          >
            <Text style={{ fontFamily: 'inter-sb', fontSize: 32, color: Colors.darkBlue }}>0</Text>
          </Pressable>
        </View>

        {/* Right Button (Backspace) - Fixed width (even if hidden) */}
        <View style={{ width: 50, alignItems: 'flex-end' }}>
          {code.length > 0 && (
            <Pressable
              onPress={() => numberBackspace()}
              style={({ pressed }) => [
                styles.numberPressed,
                pressed && { backgroundColor: Colors.grey, opacity: 0.2 },
              ]}
            >
              <MaterialCommunityIcons name="backspace-outline" size={26} color="black" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={[styles.numButtons, { backgroundColor: Colors.blue }]}>
        <View style={{ minWidth: 30 }}></View>
      </View>
    </View>
  );
};

export default Passcode;

const styles = StyleSheet.create({
  numberPressed: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
