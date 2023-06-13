import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, StatusBar, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import {widthPercentageToDP as wp,
  heightPercentageToDP as hp,listenOrientationChange as lor,
  removeOrientationListener as rol} from "react-native-responsive-screen";
import { postCheckList } from "../Api/Api";


const getCheckList = postCheckList;

const MyProfile = () => {
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
    const backAction = () => {
      navigation.navigate("MainScreen");
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    axios
      .get(getCheckList)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
      Toast.show(error, {duration: Toast.durations.SHORT});
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
          <View style={{ marginLeft: wp('3%') }}>
            <Text style={{ fontWeight: "600", marginTop:hp('1%') }}>{item.BirdName}</Text>
            <Text>
              {dzongkhag} {gewog} {village}
            </Text>
            <Text>
              {item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}
            </Text>
            <Text>{item.StartbirdingData[0].count} species report</Text>
          </View>
          <View style={{ borderBottomWidth: 0.2, borderBottomColor: "gray", marginVertical: hp('1%'), marginHorizontal:wp('2%') }} />
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
          <Ionicons name="chevron-back" size={26} color="#136D66" />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
          <Ionicons name="ellipsis-vertical" size={26} color="#136D66" />
        </TouchableOpacity>
      </View>

      {isDrawerOpen && (
        <View style={[styles.drawerContainer, { top: Dimensions.get("window").height * 0.06 }]}>
          <TouchableOpacity onPress={handleEditInfo}>
            <Text style={styles.drawerText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleUpdatePassword}>
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

        <View style={styles.checkListContainer}>
          <Text style={{ marginLeft: wp('2.5%'), fontWeight: "bold" }}>My Recent CheckList</Text>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
            </View>
          ) : submittedChecklistItems.length === 0 ? (
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
        </View>
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp('8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 1,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  drawerContainer: {
    position: "absolute",
    right: wp('8%'),
    backgroundColor: "#136D66",
    borderRadius: 5,
    padding: wp('3%'),
    zIndex: 2,
  },
  drawerText: {
    color: "white",
    margin: wp('2%'),
  },
  profileContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: hp('3%'),
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
    marginHorizontal:wp('2%')
  },
  name: {
    fontSize: wp('4.5%'),
    fontWeight: "bold",
    marginTop: hp('2%'),
  },
  role: {
    fontSize: wp('4.5%'),
    marginTop: hp('1%'),
  },
  checkListContainer: {
    flex: 1,
    paddingTop: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: "bold",
    color:"#136D66"
  },

});

export default MyProfile;