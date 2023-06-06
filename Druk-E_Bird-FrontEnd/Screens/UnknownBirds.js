import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Toast from "react-native-root-toast"; // Add this import
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Import axios for making HTTP requests
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import SubmitButton from "../Components/Button";
import { AuthContext } from "../Context/AuthContext";
import UnknownHeader from "../Components/UnknownHeader";
import BhutanDzongkhags from "../Components/BhutanDzongkha";
import SelectDropdown from "react-native-select-dropdown";

const { width, height } = Dimensions.get("window");

const UnknownBird = ({ route }) => {
  const { UnknownBirdsdata } = route.params;
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name;
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedDzongkhag, setSelectedDzongkhag] = useState("");
  const [selectedGewog, setSelectedGewog] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [gewogOptions, setGewogOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = userInfo.user._id;

  const handleDzongkhagChange = (value) => {
    setSelectedDzongkhag(value);
    setSelectedGewog("");
    setSelectedVillage("");
    setVillageOptions([]);

    const gewogs = BhutanDzongkhags[value];
    const gewogOptions = Object.keys(gewogs);
    setGewogOptions(gewogOptions);
  };

  const handleGewogChange = (value) => {
    setSelectedGewog(value);
    setSelectedVillage("");

    const villages = BhutanDzongkhags[selectedDzongkhag][value];
    const villageOptions = villages.map((village) => ({
      label: village,
      value: village,
    }));
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
        setImage(data.url);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.green800}
          size="large"
        />
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
      Toast.show("Please select Dzongkha", { duration: Toast.durations.SHORT });
      return;
    } else if (!selectedGewog) {
      Toast.show("Please select Gewong", { duration: Toast.durations.SHORT });
      return;
    } else if (!selectedVillage) {
      Toast.show("Please select Village", { duration: Toast.durations.SHORT });
      return;
    } else if (!image) {
      Toast.show("Please select an image", { duration: Toast.durations.SHORT });
      return;
    } else if (count === 0) {
      Toast.show("Please set the count", { duration: Toast.durations.SHORT });
      return;
    }

    var detailOfBirds = [];
    var endpointLocation = {
      dzongkhag: selectedDzongkhag,
      gewog: selectedGewog,
      village: selectedVillage,
    };
    var temp = [
      {
        count: count,
        currentLocation: UnknownBirdsdata.StartbirdingData.currentLocation,
        selectedDate: UnknownBirdsdata.StartbirdingData.selectedDate,
        selectedTime: UnknownBirdsdata.StartbirdingData.selectedTime,
        observer: UnknownBirdsdata.StartbirdingData.userName,
        photo: image,
        EndpointLocation: [endpointLocation],
        status: "submittedchecklist",
      },
    ];
    const randomNumber = Math.floor(Math.random() * 1000);
    const StartbirdingoneData = {
      StartbirdingData: temp,
      BirdName: UnknownBirdsdata.BirdName,
      CheckListName: `${name}-${randomNumber}`,
      userId: userId,
    };
    detailOfBirds.push(StartbirdingoneData);

    setLoading(true);
    try {
      // Make an HTTP POST request to your backend API endpoint
      axios
        .post(
          "https://druk-ebirds.onrender.com/api/v1/checkList",
          detailOfBirds
        )
        .then((response) => {
          // Data successfully posted to the database
          Toast.show("Data successfully posted", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
        })
        .catch((error) => {
          Toast.show(error, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      Toast.show(error, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }
  };
  return (
    <View style={styles.container}>
      <UnknownHeader title={"Unknown Bird"} />
      <View style={styles.subcontainer}>
        <View style={styles.subcon}>
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
        </View>
        <View style={styles.countBtn}>
          <Button
            icon="plus-box-outline"
            onPress={() => handleButtonPress("increase")}
          />
          <Text style={styles.countText}>{count}</Text>
          <Text style={styles.speciesText}>{UnknownBirdsdata.BirdName}</Text>
          <Button
            icon="minus-box-outline"
            onPress={() => handleButtonPress("decrease")}
          />
        </View>
        <View style={styles.cont}>
          <Text style={styles.locationText}>Choose Your Location</Text>

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
              <Icon name="chevron-down" size={15} color="gray" />
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
              <Icon name="chevron-down" size={15} color="gray" />
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
              <Icon name="chevron-down" size={15} color="gray" />
            )}
            dropdownStyle={styles.dropdown}
            dropdownTextStyle={styles.dropdownText}
            rowStyle={styles.dropdownRow}
            disabled={selectedDzongkhag === "" || selectedGewog === ""}
          />
        </View>
        <SubmitButton styling={styles.submitBtn} onPress={UnknownBirdsdataSave}>
          Submit
        </SubmitButton>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.green800}
              size="large"
            />
          </View>
        )}
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
      <StatusBar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    marginVertical: 10,
    position: "relative",
  },
  subcon: {
    alignItems: "center",
  },
  cont: {
    marginHorizontal: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("50%"),
    height: wp("50%"),
    backgroundColor: "#e1e1e1",
    borderRadius: 100,
  },
  image: {
    width: wp("50%"),
    height: wp("50%"),
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
    padding: wp("5%"),
  },
  optionButton: {
    marginVertical: wp("2%"),
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  optionButtonText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: width * 0.01,
    paddingVertical: width * 0.022,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "red",
  },
  countBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#E2DFD2",
    marginTop: width * 0.08,
    marginHorizontal: 20,
  },
  countText: {
    marginTop: width * 0.02,
    fontWeight: "bold",
  },
  speciesText: {
    marginTop: width * 0.02,
    marginLeft: width * 0.001,
    fontSize: 16,
  },
  submitBtn: {
    alignSelf: "center",
    width: width * 0.89,
    marginTop: width * 0.1,
  },
  loading: {
    marginTop: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginVertical: width * 0.02,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop:20,
    marginBottom:10
  },
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
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


export default UnknownBird;