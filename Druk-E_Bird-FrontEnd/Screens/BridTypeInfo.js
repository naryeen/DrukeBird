import React, { useState,useContext} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image, Dimensions} from 'react-native';
import { ActivityIndicator, MD2Colors,TextInput,IconButton  } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import Toast from 'react-native-root-toast';
import { Picker } from '@react-native-picker/picker';
import BhutanDzongkhags from "../Components/BhutanDzongkha"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Button from "../Components/Button";
import { AuthContext } from '../Context/AuthContext';
import NavigationHeader from '../Components/NavigationHeader';

const { width, height } = Dimensions.get('window');

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
  const [isLoading, setIsLoading] = useState(false);
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
         Toast.show("Please enter your adult", {duration: Toast.durations.SHORT});
         return;
       }else if (Juvenile.trim() === "") {
          Toast.show("Please enter your juvenile", {duration: Toast.durations.SHORT});
          return;
       }else if (Remarks.trim() === "") {
          Toast.show("Please enter your email", {duration: Toast.durations.SHORT});
          return;
       }
       else if (!selectedDzongkhag) {
        Toast.show("Please select Dzongkha", {duration: Toast.durations.SHORT});
        return;
      }else if(!selectedGewog)
      {
        Toast.show("Please select Gewong", {duration: Toast.durations.SHORT});
        return;
      }else if(!selectedVillage){
        Toast.show("Please select Village", {duration: Toast.durations.SHORT});
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
         "JAcount": {
             "Adult": adultCount.toString(),
             "Juvenile": juvenileCount.toString(),
         },
         "Remarks": Remarks,
         "Totalcount":count,
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
                 Toast.show("Data successfully posted", {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.CENTER
                });
             })
             .catch((error) => {
                Toast.show(error, {duration: Toast.durations.SHORT});

             });
     } catch (error) {
        Toast.show(error, {duration: Toast.durations.SHORT});

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

    } else {
      alert("You did not select any image.");
    }
  
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
    <KeyboardAwareScrollView>
      <View style={styles.container1}>
        <NavigationHeader title={'hell'}/>
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
    </View>
    </KeyboardAwareScrollView>
    
  );
};

const styles = StyleSheet.create({
  container1:{
    flex: 1
  },
  container: {
    marginTop: height*0.0001,
    padding: width * 0.031,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    marginBottom: width*0.03,
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
  textInput: {
    marginTop: width*0.001,
    marginBottom: width*0.02,
    width: '100%',
  },
  locationText: {
    marginTop: width*0.02,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    marginBottom: width*0.001,
  },
  submitbutton: {
    backgroundColor: '#136D66',
    marginTop: width*0.02,
    width: width*0.95,
},
});

export default BirdTypeInfo;