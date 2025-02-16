import React from 'react';
import { View, Text, Button, Linking, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/OneRepository';
import RepositoryItem from './RepositoryIteam';
import ReviewItem from './ReviewIteam';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import theme from '../app/theme';


const styles = StyleSheet.create({
    container: {
      paddingTop: 16,
      padding: 18,
      backgroundColor: theme.colors.secondary,
      
    },
  
    listContainer: {
      paddingTop: 36,
      padding: 18,
      backgroundColor: theme.colors.secondary,
      paddingBottom: 18,
    },
  });
  

const RepositoryView = ({ route }) => {
  const { id } = route.params; // get id from route
  console.log(`RepositoryView id: ${id}`);
  const navigation = useNavigation();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
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

  const handleReviewForm = () => {
    const [ownerName, repositoryName] = repository.fullName.split('/'); // Divide el fullName
    navigation.navigate('ReviewForm', {
      repositoryId: repository.id,
      ownerName, // Pasa el ownerName
      repositoryName, // Pasa el repositoryName
    });
  };

  return (
    <View style={styles.container}>
   
      <RepositoryItem repository = {data.repository} />
      
      <Button 
    onPress={handleOpenInGitHub}
    title="Open in GitHub"
    color={theme.colors.primary}
    />
     <Button 
    onPress={handleReviewForm}
    title="Make a review"
    color={theme.colors.accent}
  
    />
      
      
      
      
     
   
      <FlatList style={styles.listContainer}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
    </View>
    
    
  );
};


export default RepositoryView;