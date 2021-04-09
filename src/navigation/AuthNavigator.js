import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from './RoutesNames';
import LoginPage from '../pages/Auth/LoginPage';
import { headerStyle } from '../theme/AppStyle';

const Stack = createStackNavigator();

const LogoutNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.LoginPage}
        component={LoginPage}
        // options={{ headerShown: false }}
        options={headerStyle}
      />
    </Stack.Navigator>
  );
};

export default LogoutNavigator;
