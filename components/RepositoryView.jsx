import React, { useState } from 'react';
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

  const [cursor, setCursor] = useState("");
  const [reviews, setReviews] = useState([]);

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 5, after: cursor },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(`RepositoryView data: ${JSON.stringify(data)}`);


  const repository = data?.repository;

  if (!repository) {
    return <Text>No repository found</Text>;
  }

  // const reviews = repository.reviews.edges.map((edge) => edge.node);

  const handleOpenInGitHub = () => {
    Linking.openURL(repository.url); // Open the repository URL in the default browser
  };

  const handleReviewForm = () => {
    const [ownerName, repositoryName] = repository.fullName.split('/'); 
    navigation.navigate('ReviewForm', {
      repositoryId: repository.id,
      ownerName, 
      repositoryName, 
    });
  };


  const handleLoadMore = () => {
    if (data?.repository?.reviews?.pageInfo?.hasNextPage) {
      const nextCursor = data.repository.reviews.pageInfo.endCursor;

    fetchMore({
      variables: {
        id,
        first: 10,
        after: nextCursor,
      },
    }).then(( result ) => {
      setReviews((prevReviews) => [
        ...prevReviews,
        ...result.data.repository.reviews.edges.map((edge) => edge.node),
      ]);
      setCursor(result.data.repository.reviews.pageInfo.endCursor);
    });

    }
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
      
      
      
      
     
   
      <FlatList
        style={styles.listContainer}
        data={[...reviews, ...repository.reviews.edges.map((edge) => edge.node)]} 
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        onEndReached={handleLoadMore} 
        onEndReachedThreshold={0.5} 
        ListFooterComponent={loading ? <ActivityIndicator size="small" color={theme.colors.primary} /> : null} 
      />
    </View>
    
    
  );
};


export default RepositoryView;