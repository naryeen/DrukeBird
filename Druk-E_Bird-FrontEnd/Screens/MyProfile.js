import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";

const MyProfile = () => {
  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
          <Ionicons name="chevron-back" size={24} color="#136D66" />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#136D66" />
        </TouchableOpacity>
      </View>

      {isDrawerOpen && (
        <View
          style={[styles.drawerContainer, { top: Dimensions.get('window').height * 0.06 }]}
        >
          <TouchableOpacity onPress={handleEditInfo}>
            <Text style={styles.drawerText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdatePassword}
            style={styles.drawerItem}
          >
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
          <Text>My Recent CheckList</Text>
          <View style={styles.checklistContentContainer}>
            <Text>Bull Bull</Text>
            <Text>
              jbcskdhbvkjdhbsvkshdhbksvfdhbjkjvjsdhbvksdj ufhiwusgfeuiwfhwj
              efjwkeh
            </Text>
          </View>
          <View style={styles.checklistContentContainer}>
            <Text>Bull Bull</Text>
            <Text>
              jbcskdhbvkjdhbsvkshdhbksvfdhbjkjvjsdhbvksdj ufhiwusgfeuiwfhwj
              efjwkeh
            </Text>
          </View>
          <View style={styles.checklistContentContainer}>
            <Text>Bull Bull</Text>
            <Text>
              jbcskdhbvkjdhbsvkshdhbksvfdhbjkjvjsdhbvksdj ufhiwusgfeuiwfhwj
              efjwkeh
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;

const { width, height } = Dimensions.get('window');
const paddingHorizontal = width * 0.05;
//const marginTop = height * 0.05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: height * 0.08,
    // marginTop: marginTop,
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
    marginHorizontal: paddingHorizontal,
  },
  name: {
    marginTop: height * 0.02,
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  role: {
    fontSize: width * 0.05,
  },
  checkListContainer: {
    marginTop: height * 0.02,
    marginHorizontal: width * 0.08,
  },
  checklistContentContainer: {
    marginTop: height * 0.015,
    borderBottomColor: "#978D8D",
    borderBottomWidth: 1,
  },
  title: {
    color: "#136D66",
    fontWeight: "bold",
    fontSize: 20,
  },
});