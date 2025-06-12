import React, { createContext, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

const authStorage = new MMKV({ id: 'auth_storage' });
const TOKEN_KEY = 'auth_token';

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  initialized: boolean;
  logOut: () => void;
};

// Initialize with dummy values that match the type
const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  initialized: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticate: (token: string) => {},
  logOut: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize token from storage
  useEffect(() => {
    try {
      const token = authStorage.getString(TOKEN_KEY);
      if (token) setAuthToken(token);
    } catch (error) {
      console.log('Unable to fetch token', error);
    } finally {
      setInitialized(true);
    }
  }, []);

  const authenticate = (token: string) => {
    setAuthToken(token);
    authStorage.set(TOKEN_KEY, token);
  };

  const logOut = () => {
    setAuthToken(null);
    authStorage.delete(TOKEN_KEY);
  };

  const value: AuthContextType = {
    token: authToken,
    isAuthenticated: !!authToken,
    initialized,
    authenticate,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
