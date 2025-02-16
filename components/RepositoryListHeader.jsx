import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const RepositoryListHeader = ({ searchKeyword, onSearch }) => {
  return (
    <Searchbar
      placeholder="Searching..... repositories"
      onChangeText={onSearch}
      value={searchKeyword}
    />
  );
};

export default RepositoryListHeader;