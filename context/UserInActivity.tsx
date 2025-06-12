import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useAuthContext } from './authContext';

const storage = new MMKV({
  id: 'inactivty-storage',
});

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log('🚀 ~ handleAppStateChange ~ nextAppState', nextAppState);

    if (nextAppState === 'background') {
      recordStartTime();
    } else if (nextAppState === 'active' && appState.current.match(/background/)) {
      const elapsed = Date.now() - (storage.getNumber('startTime') || 0);
      console.log('🚀 ~ handleAppStateChange ~ elapsed:', elapsed);

      if (elapsed > 3000 && isAuthenticated) {
        router.replace('/(auth)/(modal)/lock');
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set('startTime', Date.now());
  };

  return children;
};
