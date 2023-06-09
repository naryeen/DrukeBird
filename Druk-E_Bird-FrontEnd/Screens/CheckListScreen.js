import {Text,View,FlatList,TouchableOpacity,RefreshControl,} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { postCheckList } from "../Api/Api";

import { AuthContext } from "../Context/AuthContext";

const getCheckList = postCheckList;

function NotSubmitted() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(null);
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo.user._id;

  const fetchData = () => {
    axios
      .get(getCheckList)
      .then((res) => {
        const sortedData = res.data.data.sort((a, b) => {
          const timeA = a.StartbirdingData[0].selectedTime;
          const timeB = b.StartbirdingData[0].selectedTime;
          const dateA = new Date(a.StartbirdingData[0].selectedDate);
          const dateB = new Date(b.StartbirdingData[0].selectedDate);

          if (dateA > dateB) {
            return -1;
          } else if (dateA < dateB) {
            return 1;
          }

          if (timeA > timeB) {
            return -1;
          } else if (timeA < timeB) {
            return 1;
          }

          return 0;
        });

        setData(sortedData);
      })
      .catch((error) => {
        Toast.show(error, { duration: Toast.durations.SHORT });
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`https://chekilhamo.serv00.net/api/v1/checkList/${itemId}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== itemId));
        Toast.show("Data successfully deleted", { duration: Toast.durations.SHORT });
      })
      .catch((error) => {
        Toast.show(error, { duration: Toast.durations.SHORT });
      });
  };

  const handleItemClick = (checklistdata) => {
    navigation.navigate("DraftCheckListSubmitted", {
      checklistdata: checklistdata,
    });
  };

  const renderSwipeableContent = (itemId) => (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          paddingTop: 30,
          height: "100%",
          marginBottom: 20,
        }}
        onPress={() => handleDelete(itemId)}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.StartbirdingData[0].status === "draftchecklist" && item.userId === userId) {
      const checklistdata = {
        itemId: item._id,
        birdName: item.BirdName,
        StartbirdingData: item.StartbirdingData[0],
        userId: item.userId,
        CheckListName: item.CheckListName,
      };
      return (
        <Swipeable
          renderRightActions={() => renderSwipeableContent(item._id)}
          onSwipeableRightOpen={() => handleDelete(item._id)}
        >
          <TouchableOpacity onPress={() => handleItemClick(checklistdata)}>
            <View>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontWeight: "bold" }}>{item.BirdName}</Text>
                <Text>
                  {item.StartbirdingData[0].selectedDate}{" "}
                  {item.StartbirdingData[0].selectedTime}
                </Text>
                <Text>{item.StartbirdingData[0].Totalcount} species report</Text>
                <Text style={{ textAlign: "right", fontWeight: "bold", color: "green" }}>
                  Not Submit
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  marginVertical: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const startPolling = () => {
    const interval = setInterval(fetchData, 5000);
    setPollingInterval(interval);
  };

  const stopPolling = () => {
    clearInterval(pollingInterval);
    setPollingInterval(null);
  };

  useEffect(() => {
    fetchData();
    startPolling();
    return () => {
      stopPolling();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const notsubmittedChecklistItems = data.filter(
    (item) =>
      item.StartbirdingData[0].status === "draftchecklist" &&
      item.userId === userId
  );

  if (notsubmittedChecklistItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No draft checklist items found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notsubmittedChecklistItems}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </View>
  );
}


function Submitted() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const [pollingInterval, setPollingInterval] = useState(null);
  const userId = userInfo.user._id;

  const fetchData = () => {
    axios
      .get(getCheckList)
      .then((res) => {
        const sortedData = res.data.data
          .filter(
            (item) =>
              item.StartbirdingData[0].status === "submittedchecklist" &&
              item.userId === userId
          )
          .sort((a, b) => {
            const timeA = a.StartbirdingData[0].selectedTime;
            const timeB = b.StartbirdingData[0].selectedTime;
            const dateA = new Date(a.StartbirdingData[0].selectedDate);
            const dateB = new Date(b.StartbirdingData[0].selectedDate);

            if (dateA > dateB) {
              return -1;
            } else if (dateA < dateB) {
              return 1;
            }

            if (timeA > timeB) {
              return -1;
            } else if (timeA < timeB) {
              return 1;
            }

            return 0;
          });

        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  };

  const renderItem = ({ item }) => {
    if (
      item.StartbirdingData[0].status === "submittedchecklist" &&
      item.StartbirdingData[0].EndpointLocation[0] &&
      item.userId === userId
    ) {
      const { dzongkhag, gewog, village } =
        item.StartbirdingData[0].EndpointLocation[0];
      return (
        <View>
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{item.BirdName}</Text>
            <Text>
              {dzongkhag} {gewog} {village}
            </Text>
            <Text>
              {item.StartbirdingData[0].selectedDate}{" "}
              {item.StartbirdingData[0].selectedTime}
            </Text>
            <Text>{item.StartbirdingData[0].Totalcount} species report</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#E2DFD2",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          />
        </View>
      );
    }
    return null;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const startPolling = () => {
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds (adjust as needed)
    setPollingInterval(interval);
  };

  const stopPolling = () => {
    clearInterval(pollingInterval);
    setPollingInterval(null);
  };

  useEffect(() => {
    fetchData();
    startPolling();
    return () => {
      stopPolling();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const submittedChecklistItems = data.filter(
    (item) =>
      item.StartbirdingData[0].status === "submittedchecklist" &&
      item.userId === userId
  );

  if (submittedChecklistItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No submitted checklist items found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={submittedChecklistItems}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
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
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#E2DFD2",
        tabBarLabelStyle: { fontSize: wp('4.3%') },
        tabBarStyle: { backgroundColor: "#136D66" },
      }}
    >
      <Tab.Screen
        name="NotSubmitted"
        component={NotSubmitted}
        options={{ tabBarLabel: "Not Submitted" }}
      />
      <Tab.Screen
        name="Submitted"
        component={Submitted}
        options={{ tabBarLabel: "Submitted" }}
      />
    </Tab.Navigator>
  );
}

export default CheckList;
