import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";
import { Button } from "react-native-paper";
import SubmitButton from "../components/Button";

const UnknownBird = () => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      let newFile = {
        uri: selectedImage.uri,
        type: `profile/${selectedImage.uri.split(".")[1]}`,
        name: `profile.${selectedImage.uri.split(".")[1]}`,
      };
      handleUpload(newFile);
      console.log(newFile);
      // setImage(result.uri);
    }

    setModalVisible(false);
  };

  const takePictureFromCamera = async () => {
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
      const capturedImage = pickerResult.assets[0];
      let newFile = {
        uri: capturedImage.uri,
        type: `profile/${capturedImage.uri.split(".")[1]}`,
        name: `profile.${capturedImage.uri.split(".")[1]}`,
      };
      handleUpload(newFile);
      console.log(newFile);

    } else {
      alert("You did not select any image.");
    }
    setModalVisible(false);
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "DrukEBird_Users");
    data.append("cloud_name", "cheki");
    setIsLoading(true);
    fetch("https://api.cloudinary.com/v1_1/cheki/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImage(data.url);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleButtonPress = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setModalVisible(true)}
      >
        {!image ? (
          <IconButton
            icon="image"
            size={200}
            color="#007AFF"
            style={styles.icon}
          />
        ) : (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.countBtn}>
        <Button icon="plus-box-outline" onPress={() => handleButtonPress()} />
        <Text style={styles.countText}>0</Text>
        <Text style={styles.speciesText}>Bird Count</Text>
        <Button icon="minus-box-outline" onPress={() => handleButtonPress()} />
      </View>
      <SubmitButton styling={styles.submitBtn}>Submit</SubmitButton>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={pickImageFromGallery}
            >
              <Text style={styles.optionButtonText}>
                Pick image from gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={takePictureFromCamera}
            >
              <Text style={styles.optionButtonText}>
                Take picture from camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#136D66",
    width: "80%",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 200,
    height: 200,
  },
  selectedImageContainer: {
    paddingBottom: 30, // Adjust this value to set the desired spacing
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10, // Adjust this value to set the desired spacing
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  optionButtonText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "red",
  },
  countBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    marginTop: 50,
  },
  countText: {
    marginTop: 10,
    fontWeight: "bold",
  },
  speciesText: {
    marginTop: 7,
    marginLeft: 20,
    fontSize: 16,
  },
  submitBtn: {
    alignItems: "center",
    marginTop: 50,
    width: 290,
  },
  loading: {
    marginTop: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UnknownBird;
