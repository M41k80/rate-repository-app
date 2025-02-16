import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, ScrollView, FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useSignOut from '../hooks/useSignOut';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RepositoryItem from './RepositoryIteam';
import theme from '../app/theme';
import useRepositories from '../hooks/useRepositories';
import OrderPicker from './OrderPicker';
import RepositoryListHeader from './RepositoryListHeader';
import { useDebounce } from 'use-debounce';

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, onSearch } = this.props;
    return (
      <RepositoryListHeader
        searchKeyword={searchKeyword}
        onSearch={onSearch}
      />
    );
  };

  render() {
    const { repositories, loading, error, onRepositoryPress } = this.props;

    if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;
    if (error) return <Text>Error: {error.message}</Text>;

    const repositoryNodes = repositories?.edges.map((edge) => edge.node) || [];

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={this.props.onSignOut}>
            <Icon name="sign-out-alt" style={styles.tab} />
            <Text style={styles.tab}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onHomePress}>
            <Icon name="home" style={styles.tab} />
            <Text style={styles.tab}>Home</Text>
          </TouchableOpacity>
        </ScrollView>
        <OrderPicker
          selectedOrder={this.props.selectedOrder}
          onSelectOrder={this.props.onSelectOrder}
        />
        <FlatList
          data={repositoryNodes}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onRepositoryPress(item.id)}>
              <RepositoryItem repository={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500); // Debounce de 500 ms

  const [selectedOrder, setSelectedOrder] = useState({
    label: 'Best Rated Repositories',
    value: 'bestRated',
  });

  const { repositories, loading, error, refetch } = useRepositories({
    orderBy: selectedOrder.value === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    orderDirection: selectedOrder.value === 'lowestRated' ? 'ASC' : 'DESC',
    searchKeyword: debouncedSearchKeyword,
  });

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
    navigation.navigate('Repository', { id });
  };

  const handleSearch = (text) => {
    setSearchKeyword(text);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    refetch({
      orderBy: order.value === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
      orderDirection: order.value === 'lowestRated' ? 'ASC' : 'DESC',
    });
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      error={error}
      searchKeyword={searchKeyword}
      onSearch={handleSearch}
      selectedOrder={selectedOrder}
      onSelectOrder={handleSelectOrder}
      onSignOut={handleSignOut}
      onHomePress={handleHomePress}
      onRepositoryPress={handleRepositoryPress}
    />
  );
};

export default RepositoryList;