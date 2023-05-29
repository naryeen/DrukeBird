import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ObservedSpecies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <FlatList
        style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
        data={uniqueBirdNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderBirdName(item, navigation)}
      />
    </View>
  );
}

function BirdingSites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleItemClick = (dzongkhag) => {
    console.log(dzongkhag)
    navigation.navigate('ExploreDzongkhagInfo', { dzongkhag:dzongkhag });
  };

  const renderDzongkhag = (item, index) => {
    const currentEndpointLocation = item.StartbirdingData[0]?.EndpointLocation[0];
    const previousEndpointLocation = data[index - 1]?.StartbirdingData[0]?.EndpointLocation[0];
  
    if (index === 0 || currentEndpointLocation?.dzongkhag !== previousEndpointLocation?.dzongkhag) {
      return (
        <View key={index}>
          <View style={{ marginLeft: 30 }}>
            <Text>{currentEndpointLocation?.dzongkhag}</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
        </View>
      );
    }
    return null;
  };

  const renderItem = ({ item, index }) => {
    if (item.StartbirdingData[0].status === "submittedchecklist") {
      return (
        <TouchableOpacity onPress={() => handleItemClick(item.StartbirdingData[0].EndpointLocation[0].dzongkhag)}>
          {renderDzongkhag(item, index)}
          </TouchableOpacity>
      );
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const submittedChecklistItems = data.filter(item => item.StartbirdingData[0].status === "submittedchecklist");

  if (submittedChecklistItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No submitted checklist items found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
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

export default ExploreScreen;

