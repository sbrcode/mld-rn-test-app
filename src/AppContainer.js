import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import { UserProvider } from './contexts/UserContext';
import { paperTheme } from './theme/AppStyle';

export default function App() {
  return (
    <UserProvider>
      <PaperProvider theme={paperTheme}>
        <StatusBar style="auto" />
        <RootNavigator />
      </PaperProvider>
    </UserProvider>
  );
}
