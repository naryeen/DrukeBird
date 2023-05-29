import { StyleSheet, View, ToastAndroid, Alert,Text, TouchableOpacity, Image, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from "../Components/Button";
import React, { useState, useContext} from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../Context/AuthContext';
import BhutanDzongkhags from "../Components/BhutanDzongkha"
import { IconButton, ActivityIndicator, MD2Colors } from "react-native-paper";


const PopupScreen = ({birdName, route }) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


   
    const [Adult, setAdult] = useState("");
    const [Juvenile, setJuvenile] = useState("");
    const [Remarks, setRemarks] = useState("");
    const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
    const [selectedGewog, setSelectedGewog] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');
    const [gewogOptions, setGewogOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const name = userInfo.user.name;
    const {  startbirdingData = {} } = route.params || {};


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

    const StartbirdingonedataSave = () => {
       if (!selectedDzongkhag) {
            ToastAndroid.show('Please select Dzongkha', ToastAndroid.LONG);
            return;
          }else if(!selectedGewog)
          {
            ToastAndroid.show('Please select Gewong', ToastAndroid.LONG);
            return;
          }else if(!selectedVillage){
            ToastAndroid.show('Please select Village', ToastAndroid.LONG);
            return;
          } else if (Adult.trim() === "") {
            ToastAndroid.show('Please enter your adult', ToastAndroid.SHORT);
            return;
          }else if (Juvenile.trim() === "") {
            ToastAndroid.show('Please enter your juvenile', ToastAndroid.SHORT);
            return;
          }else if (Remarks.trim() === "") {
            ToastAndroid.show('Please enter your remarks', ToastAndroid.SHORT);
            return;
          }
          const adultCount = parseInt(Adult);
          const juvenileCount = parseInt(Juvenile);
          const count = adultCount + juvenileCount;

        var detailOfBirds = [];
        var endpointLocation = {
            "dzongkhag": selectedDzongkhag,
            "gewog": selectedGewog,
            "village": selectedVillage
          };
        var dataSubmitted = false;
        var temp = [{
            "Totalcount": {
                "Adult": adultCount.toString(),
                "Juvenile": juvenileCount.toString(),
                "Remarks": Remarks
            },
            "count":count,
            "currentLocation": startbirdingData.currentLocation,
            "selectedDate": startbirdingData.selectedDate,
            "selectedTime": startbirdingData.selectedTime,
            "observer": name,
            "photo":image,
            "EndpointLocation": [endpointLocation],
            "status":"submittedchecklist"
        }];
        const randomNumber = Math.floor(Math.random() * 1000);
    
        const StartbirdingoneData = {
            "StartbirdingData": temp,
            "BirdName": birdName,
            "CheckListName": `${name}-${randomNumber}`
        };
        detailOfBirds.push(StartbirdingoneData);
        dataSubmitted = true;
          
        if (!dataSubmitted) {
            // Show the message that no data is submitted
            Alert.alert("No Data Submitted", "Please select at least one bird count before stopping.", [{ text: "OK" }]);
            return;
        }
        
        try {
            // Make an HTTP POST request to your backend API endpoint
            axios
                .post("https://druk-ebirds.onrender.com/api/v1/checkList", detailOfBirds)
                .then((response) => {
                    console.log(detailOfBirds);
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

    return (
    <View style={styles.popupContainer}>
    
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
    <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Adult"
        placeholder="Enter the number of adult birds"
        left={<TextInput.Icon icon="briefcase" />}
        onChangeText={(text) => setAdult(text)}
        value={Adult}/>
        
    <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Juvenile"
        placeholder="Enter the number of Juvenile birds"
        left={<TextInput.Icon icon="briefcase" />}
        onChangeText={(text) => setJuvenile(text)}
        value={Juvenile}/>
            
    <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Remarks"
        placeholder="Leave the remarks here"
        left={<TextInput.Icon icon="briefcase" />}
        onChangeText={(text) => setRemarks(text)}
        value={Remarks}/>
        
        <Button styling={styles.buttonstyle} onPress={() => StartbirdingonedataSave()}>Submit</Button>
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
    popupContainer: {
        flex: 1,
        position: 'absolute',
        left: '32%',
        width: '90%',
        transform: [{ translateX: -90 }, { translateY: -80 }],
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginTop: 10,
        elevation: 5,
        backgroundColor: '#fff'
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
    buttonstyle: {
        backgroundColor: '#136D66',
        marginTop: 30,
        width: "100%",
    },
    inputStyle: {
        marginTop: 20,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 300
    },
    picker: {
      borderColor: 'black', // Add a black border
      borderWidth: 3, // Set the border width
      borderRadius: 5, // Set the border radius
      width: 300,
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
});

export default PopupScreen;
