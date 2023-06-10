import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";
import { Avatar, IconButton, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button";
import EditInfoHeader from "../Components/EditInfoHeader";
import {postPhoto, postUpdateMe } from "../Api/Api";
import { useNavigation } from "@react-navigation/native";


const EditInfo = () => {
  const { userInfo, userToken, updateUserInfo } = useContext(AuthContext);
  const [photo, setProfilePicture] = useState(userInfo.user.photo);
  const [name, setName] = useState(userInfo.user.name);
  const [dob, setDob] = useState(userInfo.user.dob);
  const [profession, setProfession] = useState(userInfo.user.profession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const navigation = useNavigation();


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

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "DrukeBird");
    data.append("cloud_name", "drukebird");
    data.append("folder", "DrukeBird/UserProfile");
    setIsLoading(true);
    fetch(postPhoto, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfilePicture(data.url);
        setIsLoading(false);
        setIsProfileUpdated(true)

      });
  };

  const handleUpdateProfile = () => {
    if (!isProfileUpdated) {
      Toast.show("Your profile is upto date", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });      return;
    }

    let profileData = {
      name,
      dob,
      profession,
      photo,
    };
    setIsLoading(true);
    axios
      .patch(
        postUpdateMe,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          Toast.show("Profile updated successfully", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          setTimeout(() => {
            navigation.navigate("MyProfile");
          }, 200);
        }
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
      <View>
        <ActivityIndicator
          style={{ marginTop: hp('45%') }}
          animating={true}
          color={'#136D66'}
          size="large"
        />
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <SafeAreaView>
        <EditInfoHeader title="Edit Profile" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleEditPicture}>
            <Avatar.Image size={180} source={{ uri: photo }} />
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
            onChangeText={(text) => {
              setName(text);
              setIsProfileUpdated(true);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dob}
            onChangeText={(text) => {
              setDob(text);
              setIsProfileUpdated(true); 
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Profession"
            value={profession}
            onChangeText={(text) => {
              setProfession(text);
              setIsProfileUpdated(true); 
            }}
          />
        </View>
        <Button styling={styles.buttonstyle} onPress={handleUpdateProfile}>
          Update Profile
        </Button>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <StatusBar />
      </SafeAreaView>
    </View>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    paddingVertical: hp('5%'),
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
    marginHorizontal: wp('8%'),
  },
  editPictureButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  container1: {
    padding: wp('5%'),
    marginTop: hp('3%'),
  },
  input: {
    width: wp('90%'),
    height: hp('8%'),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    alignSelf:'center'
  },
  error: {
    color: "red",
    marginTop: hp('3%'),
  },
  buttonstyle: {
    backgroundColor: "#136D66",
    marginTop: hp('2%'),
    width:  wp('90%'),
    alignSelf:"center"
  },
});