import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet } from 'react-native';
import RepositoryList from '../components/RepositoryList.js';
import AppBar from '../components/AppBar.jsx';
import theme from './theme.js';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.spacing.medium,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
