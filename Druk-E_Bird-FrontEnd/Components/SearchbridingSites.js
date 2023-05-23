import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';

const SearchbridingSites = ({ setData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(`https://druk-ebirds.onrender.com/api/v1/checkList?bird_name=${query}`);
      setData(response.data);
    } catch (error) {
      console.log("hii")
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://druk-ebirds.onrender.com/api/v1/checkList');
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search birding sites"
        onChangeText={onChangeSearch}
        inputStyle={{ paddingBottom: 19 }}
        placeholderTextColor="gray"
        value={searchQuery}
        style={styles.searchbar}
      />
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

export default SearchbridingSites;

