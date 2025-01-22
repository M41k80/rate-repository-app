// components/AppBar.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import theme from '../app/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight, 
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  tab: {
    color: theme.colors.textLight, 
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <Text style={styles.tab}>Repositories</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBar;
