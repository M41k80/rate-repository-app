import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar  from './AppBar';
import SignIn from './SignIn';
import theme from '../app/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexGrow: 1,
    flexShrink: 1,
    padding: 16,
  },
});


const RepositoriesScreen = () => {
    return (
      <View style={styles.container}>
        <AppBar />
        {/* <SignIn /> */}
        {/* <RepositoryList /> */}
        
      </View>
    );
  };

export default RepositoriesScreen;