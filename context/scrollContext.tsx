import React, { createContext, useContext } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface ScrollContextType {
  scrollY: SharedValue<number>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  // This will be stable for the lifetime of the provider
  const scrollY = useSharedValue(0);

  // Context value never changes (stable reference)
  const value = React.useMemo(() => ({ scrollY }), []);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

export default function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
}
