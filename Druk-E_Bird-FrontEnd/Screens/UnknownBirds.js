import React, { useState,useContext} from "react";
import {View,Text,TouchableOpacity,Image,StyleSheet,Modal, ToastAndroid, Dimensions} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios'; // Import axios for making HTTP requests
import { IconButton } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { Button } from "react-native-paper";
import SubmitButton from "../Components/Button";
import { AuthContext } from "../Context/AuthContext";
import UnknownHeader from "../Components/UnknownHeader";
import BhutanDzongkhags from "../Components/BhutanDzongkha";

const { width, height } = Dimensions.get('window');

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
  const userId = userInfo.user._id;


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
    data.append("upload_preset", "DrukEBird");
    data.append("cloud_name", "cheki");
    data.append("folder", "DrukEBird/BirdPhoto");
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
    if (!selectedDzongkhag) {
      ToastAndroid.show('Please select Dzongkha', ToastAndroid.LONG);
      return;
    }
    else if(!selectedGewog)
    {
      ToastAndroid.show('Please select Gewong', ToastAndroid.LONG);
      return;
    }
    else if(!selectedVillage){
      ToastAndroid.show('Please select Village', ToastAndroid.LONG);
      return;
    }
    else if (!image) {
      ToastAndroid.show('Please select an image', ToastAndroid.LONG);
      return;
    } else if (count === 0) {
      ToastAndroid.show('Please set the count', ToastAndroid.LONG);
      return;
    }

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
          "EndpointLocation": [endpointLocation],
          "status":"submittedchecklist"
        }];

        const randomNumber = Math.floor(Math.random() * 1000);


        const StartbirdingoneData = {
          "StartbirdingData": temp,
          "BirdName": UnknownBirdsdata.BirdName,
          "CheckListName":`${name}-${randomNumber}`,
          "userId":userId
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
      <UnknownHeader title={'Unknown Bird'}/>
      <View style={styles.subcontainer}>
    
      <TouchableOpacity
       style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        {!image ? (
          <IconButton icon="camera" color={MD2Colors.grey500} size={50} />
        ) : (
            <Image source={{ uri: image }} style={styles.image} />
        )}
      </TouchableOpacity>
      <View style={styles.countBtn}>
        <Button icon="plus-box-outline" onPress={() => handleButtonPress("increase")} />
        <Text style={styles.countText}>{count}</Text>
        <Text style={styles.speciesText}>{UnknownBirdsdata.BirdName}</Text>
        <Button icon="minus-box-outline" onPress={() => handleButtonPress("decrease")} />
      </View>
      <Text style={styles.locationText}>Choose Location</Text>


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
  },
  subcontainer:{
    marginTop: height*0.1,
    padding: width * 0.031,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    marginTop: "1%",
    //marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.5,
    height: width*0.5,
    backgroundColor: '#e1e1e1',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
    //color: '#000',
  },
  image: {
    width: width*0.5,
    height: width*0.5,
    borderRadius: 100,
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
    padding: width*0.03,
  },
  optionButton: {
    paddingVertical: width*0.022,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  optionButtonText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: width*0.01,
    paddingVertical: width *0.022,
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
    marginTop: width*0.08,
    width: width*0.95,
  },
  countText: {
    marginTop: width *0.01,
    marginLeft: width *0.001,
    fontWeight: "bold",
  },
  speciesText: {
    marginTop: width*0.01,
    marginLeft: width *0.001,
    fontSize: 16,
  },
  submitBtn: {
    alignItems: "center",
    width: width*0.95,
    marginTop:width*0.05
  },
  loading: {
    marginTop: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: width *0.01,
  },
  locationText: {
    marginTop: width*0.1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: "100%",
    height: width*0.01,
    marginBottom: width*0.016,
    borderRadius: 4,
  },
});

export default UnknownBird;