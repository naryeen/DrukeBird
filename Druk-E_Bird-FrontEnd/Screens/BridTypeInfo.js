import React, { useState,useContext} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image, ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { IconButton, MD2Colors } from 'react-native-paper';
import BhutanDzongkhags from "../Components/BhutanDzongkha"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Button from "../Components/Button";
import { AuthContext } from '../Context/AuthContext';

const BirdTypeInfo = ({route}) => {
  const [image, setImage] = useState(null);
  const [Adult, setAdult] = useState('');
  const [Juvenile, setJuvenile] = useState('');
  const [Remarks, setRemarks] = useState('');
  const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
  const [selectedGewog, setSelectedGewog] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [gewogOptions, setGewogOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const { StartbirdingData, birdName} = route.params
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name;
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
    const villageOptions = villages.map((village) => ({
      label: village,
      value: village,
    }));
    setVillageOptions(villageOptions);
  };

  const StartbirdingonedataSave = () => {
     if (Adult.trim() === "") {
         ToastAndroid.show('Please enter your adult', ToastAndroid.SHORT);
         return;
       }else if (Juvenile.trim() === "") {
         ToastAndroid.show('Please enter your juvenile', ToastAndroid.SHORT);
         return;
       }else if (Remarks.trim() === "") {
         ToastAndroid.show('Please enter your remarks', ToastAndroid.SHORT);
         return;
       }
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
         "currentLocation": StartbirdingData.currentLocation,
         "selectedDate": StartbirdingData.selectedDate,
         "selectedTime": StartbirdingData.selectedTime,
         "observer": StartbirdingData.userName,
         "photo":image,
         "EndpointLocation": [endpointLocation],
         "status":"submittedchecklist"
     }];
     const randomNumber = Math.floor(Math.random() * 1000);
 
     const StartbirdingoneData = {
         "StartbirdingData": temp,
         "BirdName": birdName,
         "CheckListName": `${name}-${randomNumber}`,
         "userId":userId
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

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Please allow access to the device camera roll.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const capturedImage = pickerResult.assets[0];
      let newFile = {
        uri: capturedImage.uri,
        type: `birdImage/${capturedImage.uri.split(".")[1]}`,
        name: `birdImage.${capturedImage.uri.split(".")[1]}`,
      };
      handleUpload(newFile);
      console.log(newFile);

    } else {
      alert("You did not select any image.");
    }
  
  };
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "DrukEBird_Users");
    data.append("cloud_name", "cheki");
    fetch("https://api.cloudinary.com/v1_1/cheki/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImage(data.url);
      });
  };

  return (
    <KeyboardAwareScrollView>
        <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleImageUpload()}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <IconButton icon="camera" color={MD2Colors.grey500} size={50} />
        )}
      </TouchableOpacity>

      <TextInput
        label="Number of Adult Birds"
        value={Adult}
        onChangeText={(text) => setAdult(text)}
        style={styles.textInput}
        keyboardType="numeric"
      />

      <TextInput
        label="Number of Juvenile Birds"
        value={Juvenile}
        onChangeText={(text) => setJuvenile(text)}
        style={styles.textInput}
        keyboardType="numeric"
      />

      <TextInput
        label="Remarks"
        value={Remarks}
        onChangeText={(text) => setRemarks(text)}
        style={styles.textInput}
        multiline
      />

      <Text style={styles.locationText}>Location:</Text>

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
        style={styles.picker}
      >
        <Picker.Item label="Select Gewog" value="" />
        {gewogOptions.map((gewog) => (
          <Picker.Item key={gewog} label={gewog} value={gewog} />
        ))}
      </Picker>

      <Picker
  selectedValue={selectedVillage}
  onValueChange={(value) => setSelectedVillage(value)}
  style={styles.picker}
>
  <Picker.Item label="Select Village" value="" />
  {villageOptions.map((village) => (
    <Picker.Item key={village.value} label={village.label} value={village.value} />
  ))}
    </Picker>
    <Button styling={styles.submitbutton} onPress={StartbirdingonedataSave}>Submit</Button>
    </View>
    </KeyboardAwareScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#e1e1e1',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textInput: {
    marginBottom: 10,
    width: '100%',
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  buttonstyle: {
    backgroundColor: '#136D66',
    marginTop: 30,
    width: "100%",
},
});

export default BirdTypeInfo;