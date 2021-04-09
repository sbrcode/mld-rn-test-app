import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Colors from './Colors';

const AppStyle = StyleSheet.create({
  form: {
    padding: 24,
  },
});

export default AppStyle;

export const headerStyle = {
  headerStyle: {
    backgroundColor: Colors.black,
    shadowColor: Colors.transparent,
  },
  headerTintColor: Colors.primary,
  headerTitleStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: Colors.white,
  },
  headerBackTitleStyle: { color: Colors.primary },
};

export const paperTheme = {
  // TODO edit theme
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    card: 'black',
    text: Colors.black,
    background: Colors.white,
    surface: 'pink',
  },
  Card: {
    backgroundColor: Colors.grey,
  },
};
