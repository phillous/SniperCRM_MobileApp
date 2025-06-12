import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ProfilePages = [
  {
    icon: 'person-circle-outline' as const,
    label: 'Personal Info',
    route: '(modal)/personalInfo' as const,
  },
  {
    icon: 'balloon-outline' as const,
    label: 'Set a goal',
    route: '(modal)/goal' as const,
  },
  {
    icon: 'lock-closed-outline' as const,
    label: 'Security settings',
    route: '(modal)/security' as const,
  },
  {
    icon: 'notifications-outline' as const,
    label: 'Notification',
    route: '' as const,
  },
  {
    icon: 'exit-outline' as const,
    label: 'Logout',
    route: '' as const,
  },
];

const ProfileScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const showAlert = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Yes', onPress: () => console.log('Yes Pressed') },
        { text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel' },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginHorizontal: 18,
          marginTop: 24,
        }}
      >
        <View style={[styles.imageContainer]}>
          <Image
            source={require('@/assets/images/avartar.jpg')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 18, fontFamily: 'inter-sb' }}>Ayoola CEO</Text>
          <Text style={{ fontSize: 14, fontFamily: 'inter' }}>Adminstrator</Text>
        </View>
      </View>
      <View style={[defaultStyles.card, { marginTop: 24, marginHorizontal: 18 }]}>
        <FlatList
          data={ProfilePages}
          renderItem={({ item }) => {
            if (item.label === 'Notification') {
              return (
                <View style={styles.actionButtons}>
                  <Ionicons name={item.icon} size={24} color={Colors.blue} />
                  <Text style={{ flex: 1, fontFamily: 'inter' }}>Notification</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? Colors.blue : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              );
            }

            if (item.label === 'Logout') {
              return (
                <TouchableOpacity onPress={showAlert} style={styles.actionButtons}>
                  <Ionicons name={item.icon} size={24} color={Colors.primary} />
                  <Text style={{ flex: 1, fontFamily: 'inter' }}>Logout</Text>
                  <Ionicons name="chevron-forward-sharp" size={24} />
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity style={styles.actionButtons}>
                <Ionicons name={item.icon} size={24} />
                <Text style={{ flex: 1, fontFamily: 'inter' }}>{item.label}</Text>
                <Ionicons name="chevron-forward-sharp" size={24} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightGrey',
  },
  imageContainer: {
    height: 50,
    width: 50,
    overflow: 'hidden',
    borderRadius: 25,
  },
  actionButtons: {
    paddingVertical: 24,
    marginHorizontal: 6,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    // backgroundColor: 'rgba(0, 0, 0, 0.05)' : 'transparent',
    borderRadius: 4,
  },
});
