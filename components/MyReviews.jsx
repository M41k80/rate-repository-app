import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/CurrentUser'; 
import { DELETE_REVIEW } from '../graphql/deleteReview'; 
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import theme from '../app/theme';

const MyReviews = () => {
  const navigation = useNavigation(); // Hook para navegación
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW); 

  

  if (loading) return <Text>Loading...</Text>;

  if (error) {
    console.error('Error details:', error.networkError, error.graphQLErrors);
    return <Text>Error: {error.message}</Text>;
  }

  const reviews = data?.me?.reviews?.edges || [];

  
  const navigateToRepository = (repositoryId) => {
    navigation.navigate('Repository', { id: repositoryId }); 
    console.log('Repository: ', repositoryId);
  };

  // Función para eliminar una reseña
  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } }); 
              refetch(); 
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reviews</Text>
      {reviews.length > 0 ? (
        <ScrollView>
          {reviews.map(({ node }) => (
            <View key={node.id} style={styles.review}>
              <Text style={styles.content}>{node.text}</Text>
              <Text style={styles.content}>Rating: {node.rating}</Text>
              <Text style={styles.content}>Date: {new Date(node.createdAt).toLocaleDateString()}</Text>

              {/* Botón para ver el repositorio */}
              <View style={styles.buttonContainer}>
                <Button
                  title="View Repository"
                  onPress={() => navigateToRepository(node.repository.id)} 
                  color={theme.colors.primary}
                />
              </View>

              {/* Botón para eliminar la reseña */}
              <View style={styles.buttonContainer}>
                <Button
                  title="Delete Review"
                  onPress={() => handleDeleteReview(node.id)} 
                  color={theme.colors.error}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No reviews found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.textLight,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  review: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: theme.colors.black,
    borderRadius: 5,
  },
  content: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textLight,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10, // Espacio entre los botones
  },
});

export default MyReviews;