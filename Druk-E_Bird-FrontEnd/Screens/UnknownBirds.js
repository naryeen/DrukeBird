import React, { useState,useContext} from "react";
import {View,Text,TouchableOpacity,Image,StyleSheet,Modal, ToastAndroid} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios'; // Import axios for making HTTP requests
import { IconButton } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { Button } from "react-native-paper";
import SubmitButton from "../Components/Button";
import NavigationHeader from '../Components/NavigationHeader';
import { AuthContext } from "../Context/AuthContext";
import BhutanDzongkhags from "../Components/BhutanDzongkha"

const UnknownBird = ({ route }) => {
  const {UnknownBirdsdata} = route.params
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0)
  const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
  const [selectedGewog, setSelectedGewog] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [gewogOptions, setGewogOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);


  const handleDzongkhagChange = (value) => {
    setSelectedDzongkhag(value);
    setSelectedGewog('');
    setSelectedVillage('');
    setVillageOptions([]);

    const gewogs = BhutanDzongkhags[value];
    const gewogOptions = Object.keys(gewogs);
    setGewogOptions(gewogOptions);
  };

  const handleGewogChange = (value) => {
    setSelectedGewog(value);
    setSelectedVillage('');

    const villages = BhutanDzongkhags[selectedDzongkhag][value];
    const villageOptions = villages.map((village) => ({ label: village, value: village }));
    setVillageOptions(villageOptions);
  };

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
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }


  const handleButtonPress = (operation) => {
    if (operation === "increase") {
      setCount(count + 1); // Increase count by 1
    } else if (operation === "decrease") {
      if (count > 0) {
        setCount(count - 1); // Decrease count by 1, if count is greater than 0
      }
    }
  };

  const UnknownBirdsdataSave = () => {

    var detailOfBirds = []
    var endpointLocation = {
      "dzongkhag": selectedDzongkhag,
      "gewog": selectedGewog,
      "village": selectedVillage
    };
      var temp = [{
          "count":count,
          "currentLocation": UnknownBirdsdata.StartbirdingData.currentLocation,
          "selectedDate": UnknownBirdsdata.StartbirdingData.selectedDate,
          "selectedTime": UnknownBirdsdata.StartbirdingData.selectedTime,
          "observer": UnknownBirdsdata.StartbirdingData.userName,
          "photo":image,
          "EndpointLocation": [endpointLocation]
        }];

        const randomNumber = Math.floor(Math.random() * 1000);


        const StartbirdingoneData = {
          "StartbirdingData": temp,
          "BirdName": UnknownBirdsdata.BirdName,
          "CheckListName":`${name}-${randomNumber}`
        };
        detailOfBirds.push(StartbirdingoneData)
        // console.log(StartbirdingoneData)
        console.log(detailOfBirds);

      
   
    
    try {
      // Make an HTTP POST request to your backend API endpoint
      axios
        .post("https://druk-ebirds.onrender.com/api/v1/checkList", detailOfBirds)
        .then((response) => {
          // Data successfully posted to the database
        ToastAndroid.show('Data successfully posted', ToastAndroid.LONG);
          console.log("Data post:", response.data);
        })
        .catch((error) => {
          console.error("Error post data:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <NavigationHeader title="Unknown Birds"/>
      <View style={styles.subcontainer}>
      <Text style={styles.label}>Select Dzongkhag:</Text>
      <Picker
        selectedValue={selectedDzongkhag}
        onValueChange={handleDzongkhagChange}
        style={styles.picker}
      >
        <Picker.Item label="Select Dzongkhag" value="" />
        {Object.keys(BhutanDzongkhags).map((dzongkhag) => (
          <Picker.Item key={dzongkhag} label={dzongkhag} value={dzongkhag} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Gewog:</Text>
      <Picker
        selectedValue={selectedGewog}
        onValueChange={handleGewogChange}
        enabled={selectedDzongkhag !== ''}
        style={styles.picker}
      >
        <Picker.Item label="Select Gewog" value="" />
        {gewogOptions.map((gewog) => (
          <Picker.Item key={gewog} label={gewog} value={gewog} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Village:</Text>
      <Picker
        selectedValue={selectedVillage}
        onValueChange={setSelectedVillage}
        enabled={selectedDzongkhag !== '' && selectedGewog !== ''}
        style={styles.picker}
      >
        <Picker.Item label="Select Village" value="" />
        {villageOptions.map((village) => (
          <Picker.Item key={village.value} label={village.label} value={village.value} />
        ))}
      </Picker>
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
        <Button icon="plus-box-outline" onPress={() => handleButtonPress("increase")} />
        <Text style={styles.countText}>{count}</Text>
        <Text style={styles.speciesText}>{UnknownBirdsdata.BirdName}</Text>
        <Button icon="minus-box-outline" onPress={() => handleButtonPress("decrease")} />
      </View>
      <SubmitButton styling={styles.submitBtn} onPress={UnknownBirdsdataSave}>Submit</SubmitButton>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    padding:10
  },
  subcontainer:{
    alignItems:'center'

  },
  iconContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#136D66",
    width: "80%",
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
    width: 290,
    marginTop:20
  },
  loading: {
    marginTop: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    width: 200,
    height: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
});

export default UnknownBird;
