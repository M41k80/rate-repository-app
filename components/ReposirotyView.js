import React from 'react';
import { View, Text, Button, Linking, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/OneRepository';
import RepositoryItem from './RepositoryIteam';
import ReviewItem from './ReviewIteam';

import theme from '../app/theme';


const styles = StyleSheet.create({
    container: {
      paddingTop: 16,
      padding: 18,
      backgroundColor: theme.colors.secondary,
      paddingBottom: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: theme.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: theme.colors.textLight,
      fontSize: theme.fontSizes.medium,
      fontWeight: 'bold',
    },
  });
  

const RepositoryView = ({ route }) => {
  const { id } = route.params; // get id from route
  console.log(`RepositoryView id: ${id}`);

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(`RepositoryView data: ${JSON.stringify(data)}`);


  const repository = data?.repository;

  if (!repository) {
    return <Text>No repository found</Text>;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  const handleOpenInGitHub = () => {
    Linking.openURL(repository.url); // Open the repository URL in the default browser
  };

  return (
    <View style={styles.container}>
      <RepositoryItem repository = {data.repository} />
      <TouchableOpacity style={styles.button} onPress={handleOpenInGitHub}>
        <Text style={styles.buttonText}>Abrir en GitHub</Text>
      </TouchableOpacity>
      <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
    </View>
  );
};


export default RepositoryView;