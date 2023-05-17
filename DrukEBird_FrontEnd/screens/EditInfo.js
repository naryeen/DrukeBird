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

  const submitData = ()=>{
    

  }

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
    }

  };

  const handleUpload = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "DrukEBird_Users");
    data.append("cloud_name", "cheki");

    fetch("https://api.cloudinary.com/v1_1/cheki/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfilePicture(data.url);
      });
  };


  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleEditPicture}>
          <Avatar.Image size={120} source={photo} />
          <IconButton
            icon={photo == "" ? "camera" : "check"}
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
        <Button title="Update Profile" />
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
