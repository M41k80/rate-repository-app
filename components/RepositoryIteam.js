import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../app/theme';

const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number.toString();
};
const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
    {/* Contenedor de imagen y texto (Avatar y nombre, descripción, lenguaje) */}
    <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={{ uri: repository.ownerAvatarUrl }}
        testID="avatar"
      />
      <View style={styles.headerText}>
        <Text style={styles.name} testID="fullName">{repository.fullName}</Text>
        <Text style={styles.description} testID="description">{repository.description}</Text>
        <Text style={styles.language} testID="language">{repository.language}</Text>
      </View>
    </View>
    
    {/* Contenedor de las estadísticas */}
    <View style={styles.stats}>
      <View style={styles.statItem} testID="stars">
        <Text style={styles.statValue} testID="stargazersCount">
        {formatNumber(repository.stargazersCount)}
        </Text>
        <Text style={styles.statLabel}>Stars</Text>
      </View>
      <View style={styles.statItem} testID="forks">
        <Text style={styles.statValue} testID="forksCount">
        {formatNumber(repository.forksCount)}
        </Text>
        <Text style={styles.statLabel}>Forks</Text>
      </View>
      <View style={styles.statItem} testID="rating">
        <Text style={styles.statValue} testID="ratingAverage">{repository.ratingAverage}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
      <View style={styles.statItem} testID="reviews">
        <Text style={styles.statValue} testID="reviewCount">{repository.reviewCount}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.black,
    marginBottom: theme.spacing.small,
    borderRadius: theme.borderRadius,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: theme.spacing.medium,
    alignItems: 'center',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 25,
    marginRight: theme.spacing.medium,
  },
  headerText: {
    flex: 1,
    color: theme.colors.textLight,
  },
  name: {
    color: theme.colors.textLight,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.large,
  },
  description: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
  },
  language: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.medium,
    color: theme.colors.accent,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.lemonChiffon,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.medium,
  },
  statLabel: {
    color: theme.colors.textLight,
    fontSize: theme.fontSizes.small,
    marginTop: theme.spacing.small,
  },
});

export default RepositoryItem;
