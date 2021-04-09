import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function SubmitButton(props) {
  const { isSubmitting, isValid, submitForm } = useFormikContext();

  const disabled = isSubmitting || !isValid;

  return (
    <Button
      mode={'contained'}
      disabled={disabled}
      onPress={submitForm}
      loading={isSubmitting}
      style={styles.button}
      dark
      {...props}
    >
      {props.label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
