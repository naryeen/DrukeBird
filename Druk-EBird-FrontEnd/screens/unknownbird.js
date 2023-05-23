import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const App = () => {
  const [image, setImage] = useState(null);
  const [camera, setcamera] = useState(null);
  let defaultimage =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";
    

  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Please grant permission to access the camera roll.");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });
    if (!pickerResult.canceled) {
      const birdImage = pickerResult.assets[0];
      let img = {
        uri: birdImage.uri,
        type: `birdimage/${birdImage.uri.split(".")[1]}`,
       }
      //  console.log(img);
       setImage(img.uri)

       //console.log(image)
    } else {
      alert("You did not select any image.");
    }
    setImage(pickerResult.assets[0].uri);

    // console.log(pickerResult.assets[0])
  };

  const selectImageFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Please grant permission to access the camera roll.");
      return;
    }
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!pickerResult.canceled) {
      console.log(pickerResult);
    } else {
      alert("You did not select any image.");
    }

    setcamera(pickerResult.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Image style={styles.imageArea} source={{uri:"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"}}/>
        <TouchableOpacity onPress={() => selectImage()} style={styles.button1}>
          <Entypo
            name="camera"
            size={24}
            color="#8B8787"
            style={{ paddingRight: 30, paddingLeft: 10 }}
          />
          <Text stye={styles.btn1}>Choose Image From gallery</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btn2}>
        <Image style={styles.selectCamera} source={{ uri: camera }}></Image>
        <TouchableOpacity
          onPress={() => selectImageFromCamera()}
          style={styles.button2}
        >
          <MaterialIcons
            name="drive-folder-upload"
            size={28}
            color="#8B8787"
            style={{ paddingRight: 30, paddingLeft: 10 }}
          />
          <Text>Choose Image From Camera</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.submit}>
          <Text style={{ color: "#FFFFFF" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  button1: {
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    width: 300,
    alignContent: "center",
    justifyContent: "center",
  },
  button2: {
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    width: 300,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  btn2: {
    padding: 40,
  },
  submit: {
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    width: 300,
    backgroundColor: "#136D66",
    alignContent: "center",
    justifyContent: "center",
  },
  imageArea: {
    height: 300,
    width: 300
  }
});

