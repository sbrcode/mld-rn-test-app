import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import UserContext from '../../contexts/UserContext';
import RoutesNames from '../../navigation/RoutesNames';
import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';
import Api from '../../api/api';
import { useEffect, useState } from 'react';

export default function Page1({ navigation }) {
  const { logout } = useContext(UserContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    Api.get()
      .then((json) => setData(json.playlists.items))
  }, []);

  return (
    <View style={[Alignments.fillColMain]}>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        numColumns={ 2 }
        renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate(RoutesNames.Page2)}>
          <Image 
            source={{ uri: item.images[0].url }}
            style={{ width:179, height:179 }}
          />
        </TouchableOpacity>
        )}
      />
      <Text style={Fonts.title}>Page1</Text>
      {/* <Button
        mode={'contained'}
        onPress={() => navigation.navigate(RoutesNames.Page4)}
        style={styles.btn}
      >
        {'page 4 ->'}
      </Button> */}

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
