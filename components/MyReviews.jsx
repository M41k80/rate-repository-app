import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/CurrentUser';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import theme from '../app/theme';

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true},
  });
    console.log('MyReviews query:', GET_CURRENT_USER);
    console.log('MyReviews data:', data);


  if (loading) return <Text>Loading...</Text>;

  if (error) {
    console.error('Error details:', error.networkError, error.graphQLErrors);
    return <Text>Error: {error.message}</Text>;
  }


  const reviews = data?.me?.reviews?.edges || [];

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
});

export default MyReviews;
