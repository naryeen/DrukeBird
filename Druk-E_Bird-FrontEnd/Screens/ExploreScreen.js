// import React from 'react';
// import { View,StyleSheet} from 'react-native';

// const ExploreScreen=()=>  {
//         return (
//             <View style={styles.container}>
               
//             </View>

//         );
//     }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

// });

// export default ExploreScreen;


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


import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchSpecies from '../Components/SearchSpecies';
import React, { useState, useEffect } from 'react';
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
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:10 }}>
      <Text>Birding Sites</Text>
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
