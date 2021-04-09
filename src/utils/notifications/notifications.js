import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { APP_PATH_URL } from '../../navigation/RoutesNames';
import * as NavigationService from '../../navigation/NavigationService';

async function registerNotifications(userId) {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('==EXPO PUSH TOKEN==>', token);
    if (!__DEV__) {
      // await userApi.subscribeNotifications(userId, token); => TODO change WS to save user notification token
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  // this always shows notification when app is running
  // can check notifications data to decide if displays or no
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

async function checkNotification(notification) {
  // redirect in app if notification data contains a path
  if (
    notification &&
    notification.data &&
    notification.data.path &&
    APP_PATH_URL[notification.data.path]
  ) {
    await NavigationService.navigate(APP_PATH_URL[notification.data.path]);
  }
}

export default {
  registerNotifications,
  checkNotification,
};
