// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// function NotSubmitted() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Not Submitted</Text>
//     </View>
//   );
// }

// function Submitted() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Submitted</Text>
//     </View>
//   );
// }


// const Tab = createMaterialTopTabNavigator();

// function CheckList() {
//   return (
//     <Tab.Navigator
//       initialRouteName="NotSubmitted"
//       screenOptions={{
//         tabBarActiveTintColor: 'white',
//         tabBarInactiveTintColor:'black',
//         tabBarLabelStyle: { fontSize: 16 },
//         tabBarStyle: { backgroundColor: '#136D66' },
//       }}
      
//     >
//       <Tab.Screen
//         name="NotSubmitted"
//         component={NotSubmitted}
//         options={{ tabBarLabel: 'Not Submitted' }}
//       />
//       <Tab.Screen
//         name="Submitted"
//         component={Submitted}
//         options={{ tabBarLabel: 'Submitted' }}
//       />
//     </Tab.Navigator>
//   );
// }
// export default CheckList


import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function NotSubmitted() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://druk-ebirds.onrender.com/api/v1/checkList")
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.data.BirdName}</Text>
      {/* <Text>{item.selectedDate}</Text>
      <Text>{item.selectedTime}</Text>
      <Text>{item.count}</Text> */}
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
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
