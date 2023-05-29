import { Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList"

function NotSubmitted() {
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

  const handleDelete = (itemId) => {
    axios.delete(`https://druk-ebirds.onrender.com/api/v1/checkList/${itemId}`)
      .then(() => {
        setData(prevData => prevData.filter(item => item._id !== itemId));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const handleItemClick = (itemId, count,birdName) => {
    navigation.navigate('StartBirdingone', { itemId: itemId, count:count, birdName: birdName});
  };

  const renderSwipeableContent = (itemId) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
      <TouchableOpacity style={{ backgroundColor: 'red', paddingTop:30,height:86}}onPress={() => handleDelete(itemId)}>
        <Text style={{ color: 'white' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.StartbirdingData[0].status === "draftchecklist") {
      return (
        <Swipeable renderRightActions={() => renderSwipeableContent(item._id)} onSwipeableRightOpen={() => handleDelete(item._id)}>
          <TouchableOpacity onPress={() => handleItemClick(item._id, item.StartbirdingData[0].count, item.BirdName)}>
            <View>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.BirdName}</Text>
                <Text>{item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}</Text>
                <Text>{item.StartbirdingData[0].count} species report</Text>
                <Text style={{ textAlign: "right", fontWeight: 'bold', color: 'green' }}>Not Submit</Text>
              </View>
              <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
            </View>
          </TouchableOpacity>
        </Swipeable>
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

  const notsubmittedChecklistItems = data.filter(item => item.StartbirdingData[0].status === "draftchecklist");

  if (notsubmittedChecklistItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No draft checklist items found.</Text>
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

    const renderItem = ({ item }) => {
      if (item.StartbirdingData[0].status === "submittedchecklist" && item.StartbirdingData[0].EndpointLocation[0]) {
        const { dzongkhag, gewog, village } = item.StartbirdingData[0].EndpointLocation[0];
        return (
          <View>
            <View style={{ marginLeft: 30 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.BirdName}</Text>
              <Text>{dzongkhag} {gewog} {village}</Text>
              <Text>{item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}</Text>
              <Text>{item.StartbirdingData[0].count} species report</Text>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
          </View>
        );
      }
      return null;
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
        tabBarInactiveTintColor: 'black',
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

export default CheckList;
