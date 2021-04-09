import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import AppStyle from '../../theme/AppStyle';

export default function Form({
  children,
  initialValues,
  onSubmit,
  schema,
  style,
}) {
  async function onSubmitForm(values, { resetForm }) {
    await onSubmit(values);
    resetForm();
  }

  return (
    <View style={[AppStyle.form, style]}>
      <Formik
        initialValues={initialValues || {}}
        onSubmit={onSubmitForm}
        validationSchema={schema}
        validateOnMount
      >
        {children}
      </Formik>
    </View>
  );
}
