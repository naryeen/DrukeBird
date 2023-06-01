import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, MD2Colors, Searchbar} from "react-native-paper";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ObservedSpecies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFound, setSearchFound] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueBirdNames, setUniqueBirdNames] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const uniqueNamesSet = new Set();
    data.forEach(item => {
      if (item.StartbirdingData[0].status === "submittedchecklist") {
        uniqueNamesSet.add(item.BirdName);
      }
    });
    const uniqueNames = Array.from(uniqueNamesSet);
    setUniqueBirdNames(uniqueNames);
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    const filtered = uniqueBirdNames.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredData(filtered);
    setSearchFound(filtered.length > 0);
  };

  const renderBirdName = (birdName, navigation) => {
    const handleBirdClick = () => {
      navigation.navigate('ExploreBridInfo', { birdName: birdName });
    };
  
    return (
      <TouchableOpacity onPress={handleBirdClick}>
        <View>
          <View style={{ marginLeft: 30 }}>
            <Text style={{ fontWeight: 'bold' }}>{birdName}</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  if (uniqueBirdNames.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No submitted checklist items found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Searchbar
        placeholder="Search any birds"
        onChangeText={handleSearch}
        value={searchQuery}
        inputStyle={{ paddingBottom: 19 }}
        style={styles.searchbar}
      />
      {!searchFound && searchQuery.length > 0 && (
        <Text style={styles.searchNotFoundText}>Can't find your bird name</Text>
      )}
      <FlatList
        style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
        data={searchQuery ? filteredData : uniqueBirdNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderBirdName(item, navigation)}
      />
    </View>
  );
}

function BirdingSites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFound, setSearchFound] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(getCheckList)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleItemClick = (dzongkhag) => {
    navigation.navigate('ExploreDzongkhagInfo', { dzongkhag });
  };

  const getUniqueDzongkhags = (data) => {
    const dzongkhagSet = new Set();
    data.forEach((item) => {
      const endpointLocation = item.StartbirdingData[0]?.EndpointLocation[0];
      if (endpointLocation && endpointLocation.dzongkhag) {
        dzongkhagSet.add(endpointLocation.dzongkhag);
      }
    });
    return Array.from(dzongkhagSet);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = uniqueDzongkhags.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filtered);
    setSearchFound(filtered.length > 0);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const uniqueDzongkhags = getUniqueDzongkhags(data);

  if (uniqueDzongkhags.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No submitted dzongkhags found.</Text>
      </View>
    );
  }

  const renderDzongkhag = (dzongkhag, index) => {
    return (
      <TouchableOpacity onPress={() => handleItemClick(dzongkhag)} key={index}>
        <View>
          <View style={{ marginLeft: 30 }}>
            <Text>{dzongkhag}</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Searchbar
        placeholder="Search dzongkhags"
        onChangeText={handleSearch}
        inputStyle={{ paddingBottom: 19 }}
        style={styles.searchbar}
      />
      {!searchFound && searchQuery.length > 0 && (
        <Text style={styles.searchNotFoundText}>Can't find your dzongkhag</Text>
      )}
      <FlatList
        style={{ height: '70%', marginTop: 10, borderRadius: 10 }}
        data={searchQuery ? filteredData : uniqueDzongkhags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderDzongkhag(item, index)}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function ExploreScreen() {
  return (
    <Tab.Navigator
      initialRouteName="ObservedSpecies"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: '#136D66' },
      }}
    >
      <Tab.Screen
        name="ObservedSpecies"
        component={ObservedSpecies}
        options={{ tabBarLabel: 'Observed Species' }}
      />
      <Tab.Screen
        name="BirdingSites"
        component={BirdingSites}
        options={{ tabBarLabel: 'Birding Sites' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  searchNotFoundText:{
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:30
  }
});

export default ExploreScreen;
