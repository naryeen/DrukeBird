import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Alert, StatusBar } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../Components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import BhutanDzongkhags from "../Components/BhutanDzongkha";
import NavigationHeader from "../Components/NavigationHeader";
import Toast from 'react-native-root-toast'; 

const SubmittingBirding = ({ route }) => {
  const { SubmittedBirdsdata } = route.params;
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name;
  const userId = userInfo.user._id;
  const [selectedDzongkhag, setSelectedDzongkhag] = useState("");
  const [selectedGewog, setSelectedGewog] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [gewogOptions, setGewogOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000)
  );
  const [loading, setLoading] = useState(false);
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

  const birdsWithCount = SubmittedBirdsdata.startbirding1data.filter(
    (bird) => bird.count > 0
  );

  const StartbirdingonedataSave = () => {
    if (!selectedDzongkhag) {
      Toast.show("Please select Dzongkhag", {duration: Toast.durations.SHORT});
      return;
    } else if (!selectedGewog) {
      Toast.show("Please select Gewong", {duration: Toast.durations.SHORT});
      return;
    } else if (!selectedVillage) {
      Toast.show("Please select Village", {duration: Toast.durations.SHORT});
      return;
    }

    var detailOfBirds = [];
    var dataSubmitted = false;
    var endpointLocation = {
      dzongkhag: selectedDzongkhag,
      gewog: selectedGewog,
      village: selectedVillage,
    };

    SubmittedBirdsdata.startbirding1data.forEach((bird) => {
      if (bird.count) {
        var temp = [
          {
            Totalcount: bird.count,
            selectedDate: SubmittedBirdsdata.StartbirdingData.selectedDate,
            selectedTime: SubmittedBirdsdata.StartbirdingData.selectedTime,
            observer: SubmittedBirdsdata.StartbirdingData.userName,
            EndpointLocation: [endpointLocation],
            status: "submittedchecklist",
          },
        ];

        const StartbirdingoneData = {
          StartbirdingData: temp,
          BirdName: bird.englishname,
          CheckListName: `${name}-${randomNumber}`,
          userId: userId,
        };
        detailOfBirds.push(StartbirdingoneData);
        dataSubmitted = true;
      }
    });
    if (!dataSubmitted) {
      Alert.alert(
        "No Data Submitted",
        "Please select at least one bird count before submitting",
        [{ text: "OK" }]
      );
      return;
    }

    setLoading(true);
    try {
      axios
        .post(
          "https://druk-ebirds.onrender.com/api/v1/checkList",
          detailOfBirds
        )
        .then((response) => {
            Toast.show('Data successfully posted', {duration: Toast.durations.SHORT});
        })
        .catch((error) => {
            Toast.show(error, {duration: Toast.durations.SHORT});
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
        Toast.show(error, {duration: Toast.durations.SHORT});
    }
  };
  return (
      <View style={styles.container}>
        <NavigationHeader title={"Submit Checklist"} />
        <View style={styles.container1}>
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
              <Icon name="chevron-down" size={20} color="#000" />
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
              <Icon name="chevron-down" size={20} color="#000" />
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
              <Icon name="chevron-down" size={20} color="#000" />
            )}
            dropdownStyle={styles.dropdown}
            dropdownTextStyle={styles.dropdownText}
            rowStyle={styles.dropdownRow}
            disabled={selectedDzongkhag === "" || selectedGewog === ""}
          />
          {birdsWithCount.length > 0 ? (
            <Text style={{fontSize:18, marginTop: 10 }}>
              Number of observed Birds: {birdsWithCount.length}
            </Text>
          ) : (
            <Text style={{marginTop: 10 }}>No birds with count greater than 0.</Text>
          )}
          {birdsWithCount.map((bird) => (
            <Text style={{marginTop: 10 }} key={bird.englishname}>
              {bird.englishname} : {bird.count}
            </Text>
          ))}
          <Button
            styling={styles.buttonstyle}
            onPress={StartbirdingonedataSave}
          >
            Continue
          </Button>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                animating={true}
                color={MD2Colors.green800}
                size="large"
              />
            </View>
          )}
        </View>
        <StatusBar />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  
  },
  container1: {
    marginHorizontal: 20,
  },
  inputStyle: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 321,
  },
  buttonstyle: {
    marginTop: 20,
    width: 321,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    marginTop:20,
  },
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
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdown1BtnTxtStyle: { textAlign: "left" },
});

export default SubmittingBirding;