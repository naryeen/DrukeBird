import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

const MyProfile = () => {
  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = userInfo.user._id;

  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEditInfo = () => {
    navigation.navigate("EditInfo");
    setIsDrawerOpen(false);
  };

  const handleUpdatePassword = () => {
    navigation.navigate("updateMyPassword");
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    axios
      .get(getCheckList)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    if (
      item.StartbirdingData[0].status === "submittedchecklist" &&
      item.StartbirdingData[0].EndpointLocation[0] &&
      item.userId === userId
    ) {
      const { dzongkhag, gewog, village } = item.StartbirdingData[0].EndpointLocation[0];
      return (
        <View>
          <View style={{ marginLeft: 30 }}>
            <Text style={{ fontWeight: "bold" }}>{item.BirdName}</Text>
            <Text>
              {dzongkhag} {gewog} {village}
            </Text>
            <Text>
              {item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}
            </Text>
            <Text>{item.StartbirdingData[0].count} species report</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: "gray", marginVertical: 10 }} />
        </View>
      );
    }
    return null;
  };

  const submittedChecklistItems = data
    .filter(
      (item) =>
        item.StartbirdingData[0].status === "submittedchecklist" && item.userId === userId
    )
    .sort((a, b) => {
      const aDateTime = new Date(`${a.StartbirdingData[0].selectedDate} ${a.StartbirdingData[0].selectedTime}`);
      const bDateTime = new Date(`${b.StartbirdingData[0].selectedDate} ${b.StartbirdingData[0].selectedTime}`);
      return bDateTime - aDateTime;
    })
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
          <Ionicons name="chevron-back" size={24} color="#136D66" />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#136D66" />
        </TouchableOpacity>
      </View>

      {isDrawerOpen && (
        <View style={[styles.drawerContainer, { top: Dimensions.get("window").height * 0.06 }]}>
          <TouchableOpacity onPress={handleEditInfo}>
            <Text style={styles.drawerText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleUpdatePassword} style={styles.drawerItem}>
            <Text style={styles.drawerText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Avatar.Image size={120} source={{ uri: userInfo.user.photo }} />
          <Text style={styles.name}>{userInfo.user.name}</Text>
          <Text style={styles.role}>{userInfo.user.profession}</Text>
        </View>
        {/* <View style={styles.checkListContainer}>
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>My Recent CheckList</Text>
          {submittedChecklistItems.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>No submitted checklist items found.</Text>
            </View>
          ) : (
            <FlatList
              data={submittedChecklistItems}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItem}
            />
          )}
        </View> */}

    <View style={styles.checkListContainer}>
      <Text style={{ marginLeft: 10, fontWeight: "bold" }}>My Recent CheckList</Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
        ) : submittedChecklistItems.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No submitted checklist items found.</Text>
        </View>) : (
        <FlatList
          data={submittedChecklistItems}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}/>)}
    </View>
  </View>
  <StatusBar />
</View>);
};

const { width, height } = Dimensions.get("window");
const paddingHorizontal = width * 0.05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: height * 0.08,
    paddingHorizontal: paddingHorizontal,
    borderRadius: 1,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  drawerContainer: {
    position: "absolute",
    right: paddingHorizontal,
    backgroundColor: "#136D66",
    borderRadius: 5,
    padding: 10,
    zIndex: 2,
  },
  drawerText: {
    color: "white",
    margin: 6,
  },
  profileContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: height * 0.03,
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: height * 0.02,
  },
  role: {
    fontSize: 16,
    marginTop: 4,
  },
  checkListContainer: {
    flex: 1,
    paddingTop: height * 0.02,
    paddingHorizontal: paddingHorizontal,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checklistContentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#136D66",
    paddingVertical: 10,
    marginTop: 10,
  },
});

export default MyProfile;
