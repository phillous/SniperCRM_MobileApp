import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSendCode } from '@/hooks/useSendCode';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const Page = () => {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();

  const [isTextFocus, setIsTextFocus] = useState<boolean>(false);
  const [isCodeFocus, setIsCodeFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [confirmationCode, setConfirmationCode] = useState<string | undefined>(undefined);

  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(60);

  const { sendCode, isLoading } = useSendCode();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;

    if (showTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setShowTimer(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [showTimer, timer]);

  const handleSendCode = () => {
    if (!email) return;
    sendCode(email, {
      onSuccess: () => {
        setShowTimer(true);
        setTimer(60);
      },
    });

    // Call backend API to send code here
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={require('@/assets/images/Snipercrm-smallLogo.png')}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />
        <Text style={{ fontSize: 24, fontFamily: 'inter', color: Colors.dark }}>
          Reset Your Password!
        </Text>
      </View>

      <View style={[styles.content, { width: windowWidth - 40 }]}>
        <View>
          <Text style={styles.labelText}>Email Address</Text>
          <View
            style={[
              defaultStyles.inputContainer,
              isTextFocus || (email?.length ?? 0) > 0 ? defaultStyles.isActive : null,
              { height: 50 },
            ]}
          >
            <TextInput
              style={defaultStyles.inputField}
              placeholder="youremail@here.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onFocus={() => setIsTextFocus(true)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.labelText}>Confirmation Code</Text>
          <View
            style={[
              defaultStyles.inputContainer,
              isCodeFocus || (confirmationCode?.length ?? 0) > 0 ? defaultStyles.isActive : null,
              {
                height: 50,
                overflow: 'hidden',
                position: 'relative',
              },
            ]}
          >
            <TextInput
              style={defaultStyles.inputField}
              placeholder="confirmation code"
              value={confirmationCode}
              onChangeText={(text) => setConfirmationCode(text)}
              onFocus={() => setIsCodeFocus(true)}
              onBlur={() => setIsCodeFocus(false)}
              keyboardType="number-pad"
            />

            {/* Timer Display */}
            {showTimer && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{timer}s</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.sendCodeButton}
              onPress={handleSendCode}
              disabled={showTimer}
            >
              <View>
                <Text style={{ fontSize: 14, color: 'white' }}>
                  {showTimer ? 'Sent' : 'Send Code'}
                </Text>
                {isLoading && <ActivityIndicator size={'small'} color={'white'} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.resetButton]}
          onPress={() => router.push('/resetPassword')}
        >
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
  labelText: {
    color: Colors.dark,
    fontFamily: 'inter',
    fontSize: 14,
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
  timerContainer: {
    position: 'absolute',
    bottom: -4,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timerText: {
    fontSize: 12,
    color: Colors.dark,
    fontFamily: 'inter',
  },
  sendCodeButton: {
    backgroundColor: Colors.blue,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -8,
    paddingHorizontal: 4,
    width: 80,
  },
});
