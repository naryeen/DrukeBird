import React, { useState, useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
  const {logout} = useContext(AuthContext);
  const {userInfo} = useContext(AuthContext);
  const {userToken} = useContext(AuthContext);

  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [photo, setProfilePicture] = useState(userInfo.user.photo);
  let userID = userInfo.user._id;


  const handleEditInfo = () => {
    navigation.navigate("EditInfo");
    setIsDrawerOpen(false);
  };

  const handleUpdatePassword = () => {
    navigation.navigate("updateMyPassword");
    setIsDrawerOpen(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }
    
    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.canceled) {
      const selectedImage = imageResult.assets[0];

      console.log(`Selected: ${selectedImage.uri}`);
      console.log(userInfo.user.photo)
      // file.mimetype.split("/")[1];
  
      const formData = new FormData();
      formData.append('photo', {
        // uri: selectedImage.uri,
        uri: selectedImage.uri,
      });

      console.log(`photo ${selectedImage.uri.split("/")[14]}`);
      console.log(formData.photo)
      try {
        const response = await axios.patch(`https://drukebird.onrender.com/api/v1/users/updateMe`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'headers': {Authorization: `Bearer ${userToken}`}
          }
        })
  
        console.log('Image uploaded successfully');
        setProfilePicture(response.data);
        // console.log("it is the", setProfilePicture)
        // console.log(response.data)
      } catch (error) {
        console.log(error); // Handle any error occurred during the upload
      }
    }
  };

  return (
    <View>
      <View style={styles.Headercontainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#136D66" />
        </TouchableOpacity>

        <Text style={styles.title}>My Profile</Text>

        <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#136D66" />
        </TouchableOpacity>
      </View>

      {isDrawerOpen && (
        <View
          style={{
            position: "absolute",
            top: 75,
            right: 20,
            backgroundColor: "#136D66",
            borderRadius: 5,
            padding: 10,
            color: "white",
            zIndex: 2,
          }}
        >
          <TouchableOpacity onPress={handleEditInfo}>
            <Text>Edit Information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdatePassword}
            style={{ zIndex: 1, marginTop: 12 }}
          >
            <Text>Update Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            style={{ zIndex: 1, marginTop: 12 }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleEditPicture}>
            <Avatar.Image
              size={100}
              source={photo}
            />
            <IconButton
              icon="camera"
              size={20}
              style={styles.editPictureButton}
            />
          </TouchableOpacity>

          <Text style={styles.name}>{userInfo.user.name}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentContainer}>
            <Icon name="briefcase" size={20} color="#4E4D4D" />
            <Text style={styles.contentText}>
              Student at Gyalpozhing College of Information Technology
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Icon name="home" size={20} color="#4E4D4D" />
            <Text style={styles.contentText}>Lives in Thimphu </Text>
          </View>
          <View style={styles.contentContainer}>
            <Icon name="tags" size={20} color="#4E4D4D" />
            <Text style={styles.contentText}>From Trashi Yangtse </Text>
          </View>
        </View>
        <View style={styles.checkListContainer}>
          <Text>My Recent CheckList</Text>
          <View style={styles.checklistContentConatiner}>
            <Text>Bull Bull</Text>
            <Text>
              jbcskdhbvkjdhbsvkshdhbksvfdhbjkjvjsdhbvksdj ufhiwusgfeuiwfhwj
              efjwkeh
            </Text>
          </View>
          <View style={styles.checklistContentConatiner}>
            <Text>Bull Bull</Text>
            <Text>
              jbcskdhbvkjdhbsvkshdhbksvfdhbjkjvjsdhbvksdj ufhiwusgfeuiwfhwj
              efjwkeh
            </Text>
          </View>
          <View style={styles.checklistContentConatiner}>
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

const styles = StyleSheet.create({
  Headercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    marginTop: 32,
    borderRadius: 1,
    elevation: 1,
    paddingHorizontal: 10,
  },
  profileContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
  },
  content: {
    paddingVertical: 20,
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  contentContainer: {
    flexDirection: "row",
    margin: 8,
  },
  contentText: {
    marginLeft: 18,
  },
  checkListContainer: {
    flexDirection: "column",
    marginTop: 20,
    marginHorizontal: 30,
  },
  checklistContentConatiner: {
    marginTop: 10,
    borderBottomColor: "#978D8D",
    borderBottomWidth: 1,
  },
  editPictureButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  title: {
    color: "#136D66",
    fontWeight: "bold",
    fontSize: 20,
  },
});