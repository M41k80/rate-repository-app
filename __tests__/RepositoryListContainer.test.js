import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryListContainer';

// Mock FlatList to render its children if not use it the test will fail
jest.mock('react-native/Libraries/Lists/FlatList', () => {
  const { View, Text } = require('react-native');
  return jest.fn(({ data, renderItem }) => (
    <View>
      {data.map((item, index) => (
        <View key={index}>{renderItem({ item })}</View>
      ))}
    </View>
  ));
});

describe('RepositoryListContainer', () => {
  it('renders repository items correctly', () => {
    const repositories = {
      edges: [
        {
          node: {
            id: '1',
            fullName: 'React Native',
            description: 'A framework for building native apps with React.',
            language: 'JavaScript',
            forksCount: 100,
            stargazersCount: 500,
            ratingAverage: 4.5,
            reviewCount: 10,
            ownerAvatarUrl: 'https://example.com/avatar.png',
          },
        },
      ],
    };

    const { getByText } = render(
      <RepositoryListContainer repositories={repositories} />
    );

    expect(getByText('React Native')).toBeTruthy();
    expect(getByText('A framework for building native apps with React.')).toBeTruthy();
  });
});