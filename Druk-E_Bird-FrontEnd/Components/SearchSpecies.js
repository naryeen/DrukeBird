import React, { useState } from 'react';
import { Searchbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';

const SearchSpecies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get('https://druk-ebird.onrender.com/api/v1/species?search');
      setSearchResults(response.data.results || []);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search any birds"
        onChangeText={onChangeSearch}
        inputStyle={{ paddingBottom: 19 }}
        placeholderTextColor="gray"
        value={searchQuery}
        style={styles.searchbar}
      />
      {/* Render the search results */}
      {searchResults.map((result) => (
        <Text key={result._id}>{result.englishName}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  searchbar: {
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default SearchSpecies;
