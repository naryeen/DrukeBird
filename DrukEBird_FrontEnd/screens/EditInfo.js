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
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [photo, setProfilePicture] = useState();
  const [Username, setName] = useState();
  const [Useremail, setEmail] = useState();
  const [Userdob, setDob] = useState();
  const [Userprofession, setProfession] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      // setProfilePicture({uri: selectedImage.uri})

      console.log(`Selected: ${selectedImage.uri}`);
      console.log(userInfo.user.photo);
      // file.mimetype.split("/")[1];

      const formData = new FormData();
      formData.append("photo", {
        // uri: selectedImage.uri,
        uri: selectedImage.uri,
      });
      console.log(`photo ${selectedImage.uri.split("/")[14]}`);
      console.log(formData.photo);
    }
  };
  const handleUpdateProfile = () => {
    const data = {
      name: Username,
      email: Useremail,
      dob: Userdob,
      profession: Userprofession,
      photo: setProfilePicture,
    };

    setIsLoading(true);
    axios
      .patch(`https://drukebird.onrender.com/api/v1/users/updateMe`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          headers: { Authorization: `Bearer ${userToken}` },
        },
      })
      .then(() => {
        if (res.data.status === "success") {
          ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
          console.log("Profile updated successfully!");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
    console.log("Here");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
          placeholder={userInfo.user.name}
          value={Username}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={userInfo.user.email}
          value={Useremail}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={userInfo.user.dob}
          value={Userdob}
          onChangeText={(text) => setDob(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={userInfo.user.profession}
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
  header: {
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 150,
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
});
