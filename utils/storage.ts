import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'AuthToken',
});

export const getAuthToken = () => {
  const token = storage.getString('token');
  return token;
};

export const loginStorage = new MMKV({
  id: 'User',
});
