import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { ActivityIndicator, MD2Colors, TextInput, IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import Toast from 'react-native-root-toast';
import Icon from "react-native-vector-icons/FontAwesome";
import BhutanDzongkhags from "../Components/BhutanDzongkha"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Button from "../Components/Button";
import { AuthContext } from '../Context/AuthContext';
import SelectDropdown from "react-native-select-dropdown";

const { width, height } = Dimensions.get('window');

const BirdTypeInfo = ({ route }) => {
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
  const { StartbirdingData, birdName } = route.params
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
      Toast.show("Please enter your adult", { duration: Toast.durations.SHORT });
      return;
    } else if (Juvenile.trim() === "") {
      Toast.show("Please enter your juvenile", { duration: Toast.durations.SHORT });
      return;
    } else if (Remarks.trim() === "") {
      Toast.show("Please enter your email", { duration: Toast.durations.SHORT });
      return;
    }
    else if (!selectedDzongkhag) {
      Toast.show("Please select Dzongkha", { duration: Toast.durations.SHORT });
      return;
    } else if (!selectedGewog) {
      Toast.show("Please select Gewong", { duration: Toast.durations.SHORT });
      return;
    } else if (!selectedVillage) {
      Toast.show("Please select Village", { duration: Toast.durations.SHORT });
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
      "Totalcount": count,
      "currentLocation": StartbirdingData.currentLocation,
      "selectedDate": StartbirdingData.selectedDate,
      "selectedTime": StartbirdingData.selectedTime,
      "observer": StartbirdingData.userName,
      "photo": image,
      "EndpointLocation": [endpointLocation],
      "status": "submittedchecklist"
    }];
    const randomNumber = Math.floor(Math.random() * 1000);

    const StartbirdingoneData = {
      "StartbirdingData": temp,
      "BirdName": birdName,
      "CheckListName": `${name}-${randomNumber}`,
      "userId": userId
    };
    detailOfBirds.push(StartbirdingoneData);
    dataSubmitted = true;

    if (!dataSubmitted) {
      Alert.alert("No Data Submitted", "Please select at least one bird count before stopping.", [{ text: "OK" }]);
      return;
    }
    setIsLoading(true)
    try {
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
          Toast.show(error, { duration: Toast.durations.SHORT });

        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      Toast.show(error, { duration: Toast.durations.SHORT });

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
          <View>
            <Text style={styles.label}>Select Dzongkhag:</Text>
            <SelectDropdown
              data={Object.keys(BhutanDzongkhags)}
              onSelect={(selectedDzongkhag) =>
                handleDzongkhagChange(selectedDzongkhag)
              }
              defaultButtonText="Select Dzongkhag"
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={() => (
                <Icon name="chevron-down" size={15} color="#000" />
              )}
              dropdownStyle={styles.dropdown}
              dropdownTextStyle={styles.dropdownText}
              rowStyle={styles.dropdownRow}
            />
            <Text style={styles.label}>Select Gewog:</Text>
            <SelectDropdown
              data={gewogOptions}
              onSelect={(selectedGewog) => handleGewogChange(selectedGewog)}
              defaultButtonText="Select Gewog"
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={() => (
                <Icon name="chevron-down" size={15} color="#000" />
              )}
              dropdownStyle={styles.dropdown}
              dropdownTextStyle={styles.dropdownText}
              rowStyle={styles.dropdownRow}
              disabled={selectedDzongkhag === ""}
            />
            <Text style={styles.label}>Select Village:</Text>
            <SelectDropdown
              data={villageOptions.map((village) => village.value)}
              onSelect={(selectedVillage) => setSelectedVillage(selectedVillage)}
              defaultButtonText="Select Village"
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={() => (
                <Icon name="chevron-down" size={15} color="#000" />
              )}
              dropdownStyle={styles.dropdown}
              dropdownTextStyle={styles.dropdownText}
              rowStyle={styles.dropdownRow}
              disabled={selectedDzongkhag === "" || selectedGewog === ""}
            />
            <Button styling={styles.submitbutton} onPress={StartbirdingonedataSave}>Submit</Button>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  animating={true}
                  color={MD2Colors.green800}
                  size="large"
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <StatusBar />
    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1
  },
  container: {
    marginTop: height * 0.02,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    marginBottom: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: '#e1e1e1',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 100,
  },
  textInput: {
    marginTop: width * 0.001,
    marginBottom: width * 0.02,
    backgroundColor: "white",

    width: '100%',
  },
  submitbutton: {
    marginTop: width * 0.09,
    width: width * 0.88,
  },
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: { textAlign: "left", fontSize: 16 },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default BirdTypeInfo;