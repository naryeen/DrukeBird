import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList"


function NotSubmitted() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("data",data)

  useEffect(() => {
    axios.get(getCheckList)
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("data",data)

  useEffect(() => {
    axios.get(getCheckList)
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




// import { Text, View, FlatList } from 'react-native';
// import React, { useEffect, useState, TouchableOpacity } from "react";
// import axios from "axios";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { ActivityIndicator, MD2Colors } from "react-native-paper";
// import { Swipeable } from 'react-native-gesture-handler';

// function NotSubmitted() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   console.log("data",data)

//   useEffect(() => {
//     axios.get("https://druk-ebirds.onrender.com/api/v1/checkList")
//       .then((res) => {
//         setData(res.data.data);
//         console.log("this is",res.data.data)
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const renderItem = ({ item }) => {
//     const deleteItem = (item) => {
//       // Make a copy of the data array
//       const newData = [...data];
    
//       // Find the index of the item to be deleted
//       const index = newData.findIndex((itemData) => itemData._id === item._id);
    
//       if (index !== -1) {
//         // Remove the item from the newData array
//         newData.splice(index, 1);
    
//         // Update the state with the modified data array
//         setData(newData);
    
//         // Make an API call to delete the item from the server
//         axios
//           .delete(`https://druk-ebirds.onrender.com/api/v1/checkList/${item._id}`)
//           .then(() => {
//             console.log('Item deleted successfully');
//             // Item deleted successfully from the server
//           })
//           .catch((error) => {
//             console.error('Error deleting item:', error);
//           });
//       }
//     };

//     const renderRightActions = () => {
//       return (
//         <TouchableOpacity
//           style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 20 }}
//           onPress={() => deleteItem(item)}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
//         </TouchableOpacity>
//       );
//     };
//     return (
//       <Swipeable renderRightActions={renderRightActions} onSwipeableRightOpen={deleteItem}>
//       <View>
//         <View style={{marginLeft:30}}>
//         <Text style={{fontWeight:'bold'}}>{item.BirdName}</Text>
//         <Text>{item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}</Text>
//         <Text>{item.StartbirdingData[0].count} species report</Text>
//         <Text style={{textAlign:"right", fontWeight:'bold', color:'green'}}>Not Submit</Text>
//         </View>
//         <View style={{borderBottomWidth:0.5, borderBottomColor: 'gray', marginVertical: 10}} />
//       </View>
//       </Swipeable>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={renderItem}
//       />
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

