import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Authentication = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false);

  const createAccount = async () => {
    const url = 'https://app.snipercrm.io/signup?ref=';
    const supports = await Linking.canOpenURL(url);
    if (supports) {
      await Linking.openURL(url);
      setClicked(false);
    } else {
      Alert.alert('Oops!', "We couldn't open the signup page. Please try again later.");
    }
  };
  return (
    <View style={styles.auth}>
      <TouchableOpacity
        onPress={() => {
          createAccount();
          setClicked(true);
        }}
        disabled={clicked ? true : false}
      >
        <View
          style={[
            styles.btn,
            clicked && { flexDirection: 'row', gap: 4 },
            { backgroundColor: Colors.blue },
          ]}
        >
          <Text style={[defaultStyles.btnText, { color: 'white' }]}>Create an Account </Text>
          {clicked && <ActivityIndicator size="small" color="white" />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(public)/login')}>
        <View style={[styles.btn, { borderColor: '#4287f5', flexDirection: 'row', gap: 4 }]}>
          <Text
            style={[
              defaultStyles.btnText,
              { color: Colors.dark, fontFamily: 'inter', textAlign: 'center' },
            ]}
          >
            Already have an account?
          </Text>
          <Text style={[defaultStyles.btnText, { color: Colors.blue }]}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Authentication;
const styles = StyleSheet.create({
  auth: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 20,
  },
  btn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
