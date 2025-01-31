
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../app/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    height: 100,
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tab: {
    color: theme.colors.textLight, 
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    alignItems: 'center',
    
  },
 
});

const AppBar = () => {
  const navigation = useNavigation();
  return (

   
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <View style={styles.container}>
    
    
      <TouchableOpacity style={styles.tab}
        onPress={() => navigation.navigate('SignIn')}>
          <Icon name="user"  style={styles.tab} />
          <Text style={styles.tab}>Sign In</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
    
    
    <TouchableOpacity style={styles.tab}
      onPress={() => navigation.navigate('Repositories')}>
      <Icon name="list"  style={styles.tab} />
        <Text style={styles.tab}>Repositories</Text>
    </TouchableOpacity>
  
  </View>
 
  

      
    </ScrollView>
  );
};

export default AppBar;
