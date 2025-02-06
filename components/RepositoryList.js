import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
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
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;
  if (error) return <Text>Error: {error.message}</Text>;
  console.log(repositories); // to see if the data is already loaded



  const repositoryNodes = repositories.edges.map(edge => edge.node);

  return (
    <View style={styles.container}>
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
