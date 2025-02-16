import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text , TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useSignOut from '../hooks/useSignOut';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryIteam';
import theme from '../app/theme';
import useRepositories from '../hooks/useRepositories';



const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexGrow: 1,
    flexShrink: 1,
    padding: 16,
  },
  separator: {
    height: 5,
  },
  tab: {
    color: theme.colors.textLight,
    fontSize: 16,
    padding: 10,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  const signOut = useSignOut();
  
  const navigation = useNavigation();
  const handleSignOut = async () => {
    await signOut();
    navigation.navigate('SignIn');
  };

  const handleHomePress = async () => {
    await signOut();
    navigation.navigate('Home');
  };
  
  const handleRepositoryPress = (id) => {
    navigation.navigate('Repository', { id }); // Navega a la vista del repositorio
  };

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositoryNodes = repositories.edges.map((edge) => edge.node);

  return (
    <View style={styles.container}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <TouchableOpacity onPress={handleSignOut}>
          <Icon name="sign-out-alt"  style={styles.tab} />
            <Text style={styles.tab}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress}>
          <Icon name="home"  style={styles.tab} />
            <Text style={styles.tab}>Home</Text>
        </TouchableOpacity>
        </ScrollView>
        <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRepositoryPress(item.id)}>
            <RepositoryItem repository={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
   
  );
};

export default RepositoryList;
