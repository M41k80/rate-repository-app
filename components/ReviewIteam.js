import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns'; 
import theme from '../app/theme';

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy'); 
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.black,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: theme.colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rating: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: theme.colors.accent,
  },
});

export default ReviewItem;