import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, MD2Colors } from "react-native-paper";

function NotSubmitted() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("data",data)

  useEffect(() => {
    axios.get("https://druk-ebirds.onrender.com/api/v1/checkList")
      .then((res) => {
        setData(res.data.data);
        console.log("this is",res.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    console.log("item", item); // Add this line to log the item
    return (
      <View>
        <View style={{marginLeft:30}}>
        <Text style={{fontWeight:'bold'}}>{item.BirdName}</Text>
        <Text>{item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}</Text>
        <Text>{item.StartbirdingData[0].count} species report</Text>
        <Text style={{textAlign:"right", fontWeight:'bold', color:'green'}}>Not Submit</Text>
        </View>
        <View style={{borderBottomWidth:0.5, borderBottomColor: 'gray', marginVertical: 10}} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

function Submitted() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Submitted</Text>
    </View>
  );
}


const Tab = createMaterialTopTabNavigator();

function CheckList() {
  return (
    <Tab.Navigator
      initialRouteName="NotSubmitted"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor:'black',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: '#136D66' },
      }}
      
    >
      <Tab.Screen
        name="NotSubmitted"
        component={NotSubmitted}
        options={{ tabBarLabel: 'Not Submitted' }}
      />
      <Tab.Screen
        name="Submitted"
        component={Submitted}
        options={{ tabBarLabel: 'Submitted' }}
      />
    </Tab.Navigator>
  );
}
export default CheckList
