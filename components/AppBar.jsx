
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import theme from '../app/theme';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight, 
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    color: theme.colors.textLight, 
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.tab}
        onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.tab}>Sign In</Text>
      </TouchableOpacity>
    
    
      <TouchableOpacity style={styles.tab}
        onPress={() => navigation.navigate('Repositories')}>
          <Text style={styles.tab}>Repositories</Text>
      </TouchableOpacity>
    
    </View>
  );
};

export default AppBar;
