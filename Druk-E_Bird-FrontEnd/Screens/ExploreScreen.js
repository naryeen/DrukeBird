import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchSpecies from '../Components/SearchSpecies';
import React, { useState, useEffect } from 'react';
import SearchbridingSites from '../Components/SearchbridingSites';
function ObservedSpecies() {
    const [data, setData] = useState([]);
    useEffect(() => {
      }, [data]);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:10 }}>
        <SearchSpecies setData={setData}/>
      </View>
    );
  }

function BirdingSites() {
  const [data, setData] = useState([]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:10 }}>
      <SearchbridingSites setData={setData}/>
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
        tabBarInactiveTintColor:'black',
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
