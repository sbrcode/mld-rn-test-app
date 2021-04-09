import { useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../theme/Colors';
import { StyleSheet, View, Text, Platform } from 'react-native';
import Fonts from '../../theme/Fonts';

function PasswordField(props) {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const [field, meta, helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const error = meta.touched ? meta.error : undefined;
  const valid = meta.touched ? !meta.error : undefined;

  function switchDisplayPassword() {
    setHiddenPassword(!hiddenPassword);
  }

  return (
    <View>
      <TextInput
        {...props}
        disabled={isSubmitting}
        value={value}
        onChangeText={helpers.setValue}
        error={error}
        valid={valid}
        onBlur={helpers.setTouched}
        secureTextEntry={hiddenPassword}
        ref={props.innerRef}
        returnKeyType={Platform.OS === 'ios' ? 'next' : 'default'}
      />
      <Ionicons
        onPress={switchDisplayPassword}
        name={hiddenPassword ? 'md-eye' : 'md-eye-off'}
        size={26}
        style={styles.inputIcon}
        color={Colors.black}
      />
      <Text style={Fonts.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

export default PasswordField;
