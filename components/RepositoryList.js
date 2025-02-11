import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text , TouchableOpacity} from 'react-native';
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
  

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;
  if (error) return <Text>Error: {error.message}</Text>;
  console.log(repositories); // to see if the data is already loaded



  const repositoryNodes = repositories.edges.map(edge => edge.node);

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleSignOut}>
          <Icon name="sign-out-alt"  style={styles.tab} />
            <Text style={styles.tab}>Sign Out</Text>
        </TouchableOpacity>
       <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={ItemSeparator}
    />
    </View>
   
  );
};

export default RepositoryList;
