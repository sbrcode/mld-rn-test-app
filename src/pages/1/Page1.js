import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import UserContext from '../../contexts/UserContext';
import RoutesNames from '../../navigation/RoutesNames';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';

export default function Page1({ navigation }) {
  const { logout } = useContext(UserContext);

  return (
    <View style={[Alignments.fillColMain]}>
      <Text style={Fonts.title}>Page1</Text>
      <Button
        mode={'contained'}
        onPress={() => navigation.navigate(RoutesNames.Page4)}
        style={styles.btn}
      >
        {'page 4 ->'}
      </Button>

      <Button mode={'contained'} onPress={logout} style={styles.btn} dark>
        {'logout'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
});
