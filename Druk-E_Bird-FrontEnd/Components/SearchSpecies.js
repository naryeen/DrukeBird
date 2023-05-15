// import React, { useState } from 'react';
// import { Searchbar} from 'react-native-paper';
// import { StyleSheet, View } from 'react-native';
// import axios from 'axios';

// const SearchSpecies = ({setData}) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const onChangeSearch = async (query) => {
//     setSearchQuery(query);
//     try {
//       const response = await axios.get(`https://druk-ebird.onrender.com/api/v1/species?search=${query}`);
//       setData(response.data.species);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Searchbar
//         placeholder="Search any birds"
//         onChangeText={onChangeSearch}
//         inputStyle={{ paddingBottom: 19 }}
//         placeholderTextColor="gray"
//         value={searchQuery}
//         style={styles.searchbar}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center'
//   },

//   searchbar: {
//     marginTop: 5,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 1,
//   },
// });

// export default SearchSpecies;



import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';

const SearchSpecies = ({ setData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(`https://druk-ebird.onrender.com/api/v1/species?starts_with=${query}`);
      setData(response.data.species);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://druk-ebird.onrender.com/api/v1/species');
        setData(response.data.species);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

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

