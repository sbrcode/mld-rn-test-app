import { useField, useFormikContext } from 'formik';
import React from 'react';
import { Platform, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import Fonts from '../../theme/Fonts';

function TextField(props) {
  const [field, meta, helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const error = meta.touched ? meta.error : undefined;
  const valid = meta.touched ? !meta.error : undefined;

  return (
    <>
      <TextInput
        {...props}
        disabled={isSubmitting}
        value={value}
        onChangeText={helpers.setValue}
        error={error}
        valid={valid}
        onBlur={helpers.setTouched}
        autoCapitalize="none"
        ref={props.innerRef}
        returnKeyType={Platform.OS === 'ios' ? 'next' : 'default'}
      />
      <Text style={Fonts.error}>{error}</Text>
    </>
  );
}

export default TextField;
