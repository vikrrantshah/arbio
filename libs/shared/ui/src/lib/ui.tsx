import React from 'react';
import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface UiProps {}

export function Ui(props: UiProps) {
  return (
    <View>
      <Text className="text-teal-500 text-4xl">Welcome to ui!</Text>
    </View>
  );
}

export default Ui;
