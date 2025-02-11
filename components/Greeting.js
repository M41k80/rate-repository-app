import React from 'react';
import { Text, View } from 'react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text testID="greetingText">Hello {name}!</Text>
    </View>
  );
};

export default Greeting;