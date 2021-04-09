import React, { useState, createContext, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

import api from '../api/api';
import UserApi from '../api/userServices/UserApi';
import StorageKeys from '../utils/StorageKeys';
import notifications from '../utils/notifications/notifications';
import i18n from 'src/utils/localization/I18n';

const UserContext = createContext();

export function UserProvider(props) {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();

  useEffect(() => {
    checkExistingCredentials();
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  useEffect(() => {
    if (notification && user && !authLoading) {
      notifications.checkNotification(notification.request.content);
    }
  }, [notification, authLoading]);

  async function login(values) {
    const { login, password } = values;
    loginError && setLoginError(false);
    const res = await UserApi.loginUser(login, password);
    if (res && !res.error) {
      // avoid warning on unmount components in loginPage
      setTimeout(() => {
        storeUser(res?.user, login, password, res?.token);
      }, 100);
      notifications.registerNotifications(res?.user?.id);
    } else {
      Alert.alert(i18n.t('app.error'), i18n.t('app.trylater'), [
        { text: i18n.t('app.ok'), style: 'cancel' },
      ]);
    }
  }

  // function to check if the user is already connected on the device and reconnect automatically
  async function checkExistingCredentials() {
    const userToken = await AsyncStorage.getItem(StorageKeys.userToken);
    const login = await AsyncStorage.getItem(StorageKeys.userLogin);
    const password = await AsyncStorage.getItem(StorageKeys.userPassword);
    if (userToken && login && password) {
      const res = await UserApi.loginUser(login, password);
      if (res && !res.error) {
        storeUser(res?.user, login, password, res?.token);
        notifications.registerNotifications(res?.user?.id);
        setAuthLoading(false);
      } else {
        setAuthLoading(false);
        return false;
      }
    }
    setAuthLoading(false);
  }

  async function storeUser(userData, login, password, token) {
    login && AsyncStorage.setItem(StorageKeys.userLogin, login);
    password && AsyncStorage.setItem(StorageKeys.userPassword, password);
    token && AsyncStorage.setItem(StorageKeys.userToken, token);
    token && api.setAccessToken(token);
    userData && setUser(userData);
  }

  function logout() {
    api.setAccessToken(null);
    AsyncStorage.removeItem(StorageKeys.userToken);
    AsyncStorage.removeItem(StorageKeys.userLogin);
    AsyncStorage.removeItem(StorageKeys.userPassword);
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        loginError,
        setLoginError,
        login,
        authLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
