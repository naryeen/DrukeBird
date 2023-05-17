import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, IconButton } from "react-native-paper";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditInfo = () => {
  const { userInfo, userToken } = useContext(AuthContext);
  const [photo, setProfilePicture] = useState();
  const [Username, setName] = useState(userInfo.user.name);
  const [Userdob, setDob] = useState(userInfo.user.dob);
  const [Userprofession, setProfession] = useState(userInfo.user.profession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // display updated user info

  const handleEditPicture = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }
    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.canceled) {
      const selectedImage = imageResult.assets[0];
      setProfilePicture({ uri: selectedImage.uri });
    }
  };

  const handleUpdateProfile = () => {
  
    console.log(userInfo);
    const formData = new FormData();
    formData.append("name", Username);
    formData.append("dob", Userdob);
    formData.append("profession", Userprofession);
    formData.append("photo", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    console.log(photo)
    setIsLoading(true);
    axios
      .patch(`https://drukebird.onrender.com/api/v1/users/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
          console.log("Profile updated successfully!");
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleEditPicture}>
          <Avatar.Image size={120} source={photo} />
          <IconButton
            icon="camera"
            size={20}
            style={styles.editPictureButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={Username}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={Userdob}
          onChangeText={(text) => setDob(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Profession"
          value={Userprofession}
          onChangeText={(text) => setProfession(text)}
        />
        <Button title="Update Profile" onPress={handleUpdateProfile} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

  },
  container2: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  editPictureButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  container1: {
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
