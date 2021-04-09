import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

import UserContext from '../contexts/UserContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import AuthLoadingPage from '../pages/Auth/AuthLoadingPage';
import notifications from '../utils/notifications/notifications';
import { navigationRef } from './NavigationService';

const RootNavigator = () => {
  const { user, authLoading } = useContext(UserContext);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={{
        config: {
          // Configuration for linking
        },
        subscribe() {
          // Listen to expo push notifications when app opened by clicking on notif
          const subscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
              const notif = response.notification.request.content;
              notifications.checkNotification(notif);
            }
          );
          return () => {
            // Clean up the event listeners
            subscription.remove();
          };
        },
      }}
    >
      {authLoading ? (
        <AuthLoadingPage />
      ) : !user ? (
        <AuthNavigator />
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
