import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import RoutesNames from './RoutesNames';
import Colors from '../theme/Colors';
import { headerStyle } from '../theme/AppStyle';
import Page4 from '../pages/1/Page4';
import Page1 from '../pages/1/Page1';
import Page2 from '../pages/2/Page2';
import Page3 from '../pages/3/Page3';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName={RoutesNames.Page1}
      activeColor={Colors.primary}
      inactiveColor={Colors.lightGrey}
      shifting={false}
      barStyle={{ backgroundColor: Colors.black }}
    >
      <Tab.Screen
        name={RoutesNames.Page1}
        component={Page1}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="numeric-1" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutesNames.Page2}
        component={Page2}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="numeric-2" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutesNames.Page3}
        component={Page3}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="numeric-3" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's RoutesNames.OnSitePage as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? RoutesNames.Page1;
    return routeName;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RoutesNames.BottomTab}
        component={BottomTab}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          ...headerStyle,
        })}
      />
      <Stack.Screen
        name={RoutesNames.Page4}
        component={Page4}
        options={headerStyle}
      />
      {/* add other screens here */}
    </Stack.Navigator>
  );
}
