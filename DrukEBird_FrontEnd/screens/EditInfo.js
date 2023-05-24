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
  const { userInfo, userToken, updateUserInfo } = useContext(AuthContext);
  const [photo, setProfilePicture] = useState(userInfo.user.photo);
  const [name, setName] = useState(userInfo.user.name);
  const [dob, setDob] = useState(userInfo.user.dob);
  const [profession, setProfession] = useState(userInfo.user.profession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEditPicture = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }
    const data = await ImagePicker.launchImageLibraryAsync();
    if (!data.canceled) {
      const selectedImage = data.assets[0];
      let newFile = {
        uri: selectedImage.uri,
        type: `profile/${selectedImage.uri.split(".")[1]}`,
        name: `profile.${selectedImage.uri.split(".")[1]}`,
      };
      handleUpload(newFile);
      console.log(newFile);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "DrukEBird_Users");
    data.append("cloud_name", "cheki");
    setIsLoading(true)
    fetch("https://api.cloudinary.com/v1_1/cheki/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("here")
        setProfilePicture(data.url);
        setIsLoading(false)
        console.log(photo)
      });
  };

  const handleUpdateProfile = () => {
    let profileData = {
      name,
      dob,
      profession,
      photo
    }
    console.log(`profileData: ${profileData}`)
    setIsLoading(true);
    axios
      .patch(`https://drukebird.onrender.com/api/v1/users/updateMe`, profileData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
          console.log("Profile updated successfully!");
        }
        console.log(res.data)
        updateUserInfo(res.data.data);
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
          <Avatar.Image size={120} source={{uri: photo}} />
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
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dob}
          onChangeText={(text) => setDob(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Profession"
          value={profession}
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
    marginTop: 400,
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
