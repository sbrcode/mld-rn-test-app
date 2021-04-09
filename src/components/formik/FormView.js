import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import Alignments from '../../theme/Alignments';

export default function FormView({ children, style }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[Alignments.fill, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={useHeaderHeight()}
      >
        <ScrollView>{children}</ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
