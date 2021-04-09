import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';

export default function AuthLoadingPage() {
  return (
    <View style={[Alignments.fillColMain]}>
      <ActivityIndicator color={Colors.primary} />
    </View>
  );
}
