import React, { useState, useContext } from "react";
import {View,StyleSheet,Text,Alert,StatusBar,ScrollView,} from "react-native";
import Button from "../Components/Button";
import Toast from "react-native-root-toast"; // Add this import
import Icon from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import BhutanDzongkhags from "../Components/BhutanDzongkha";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { postCheckList } from "../Api/Api";
import UnknownHeader from "../Components/UnknownHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DraftCheckListSubmitted = ({ route }) => {
  const { checklistdata} = route.params;
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

  const birdsWithCount =
    checklistdata &&
    checklistdata.StartbirdingData &&
    checklistdata.StartbirdingData.Totalcount > 0
      ? [checklistdata]
      : [];
  const StartbirdingonedataSave = () => {
    if (!selectedDzongkhag) {
      Toast.show("Please select Dzongkha", { duration: Toast.durations.SHORT });
      return;
    } else if (!selectedGewog) {
      Toast.show("Please select Gewong", { duration: Toast.durations.SHORT });
      return;
    } else if (!selectedVillage) {
      Toast.show("Please select Village", { duration: Toast.durations.SHORT });
      return;
    }

    var detailOfBirds = [];
    var dataSubmitted = false;
    var endpointLocation = {
      dzongkhag: selectedDzongkhag,
      gewog: selectedGewog,
      village: selectedVillage,
    };
    var temp = [
      {
        Totalcount: checklistdata.StartbirdingData.Totalcount,
        selectedDate: checklistdata.StartbirdingData.selectedDate,
        selectedTime: checklistdata.StartbirdingData.selectedTime,
        observer: checklistdata.StartbirdingData.userName,
        EndpointLocation: [endpointLocation],
        status: "submittedchecklist",
      },
    ];
    const StartbirdingoneData = {
      StartbirdingData: temp,
      BirdName: checklistdata.birdName,
      CheckListName: `${name}-${randomNumber}`,
      userId: userId,
    };
    detailOfBirds.push(StartbirdingoneData);
    dataSubmitted = true;

    if (!dataSubmitted) {
      // Show the message that no data is submitted
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
        .post(postCheckList, detailOfBirds)
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
      <UnknownHeader title={"Submit Checklist"} />
      <View style={styles.container1}>
        <SelectDropdown
          data={Object.keys(BhutanDzongkhags)}
          onSelect={(selectedDzongkhag) =>
            handleDzongkhagChange(selectedDzongkhag)}
          defaultButtonText="Select Dzongkhag"
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => (
            <Icon name="chevron-down" size={18} color="gray" />
          )}/>
        <SelectDropdown
          data={gewogOptions}
          onSelect={(selectedGewog) => handleGewogChange(selectedGewog)}
          defaultButtonText="Select Gewog"
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => (
            <Icon name="chevron-down" size={18} color="gray" />
          )}
          disabled={selectedDzongkhag === ""}
        />
        <SelectDropdown
          data={villageOptions.map((village) => village.value)}
          onSelect={(selectedVillage) => setSelectedVillage(selectedVillage)}
          defaultButtonText="Select Village"
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => (
            <Icon name="chevron-down" size={18} color="gray" />
          )}
          disabled={selectedDzongkhag === "" || selectedGewog === ""}/>

        <ScrollView>
          <View style={styles.birdname}>
            {birdsWithCount.length > 0 ? (
              <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                Number of observed Birds:{" "}
                {birdsWithCount.length}
              </Text>
            ) : (
              <Text>No birds with count greater than 0.</Text>
            )}
            {birdsWithCount.map((bird) => (
              <Text key={bird.itemId}>
                {bird.birdName} :{" "}
                {bird.StartbirdingData ? bird.StartbirdingData.Totalcount : 0}
              </Text>
            ))}
          </View>
        </ScrollView>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.green800}
              size="large"/>
          </View>
        )}

     
      </View>
      <View style={styles.buttonContainer}>
          <Button styling={styles.buttonstyle} onPress={StartbirdingonedataSave}>Continue</Button>
        </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    marginHorizontal: wp("5%"),
  },
  inputStyle: {
    marginTop: hp("2.5%"),
    borderColor: "#ccc",
    borderRadius: 5,
    width: wp("82.5%"),
  },
  buttonContainer: {
    marginHorizontal: wp("5%"),
    marginBottom: hp("2.5%"),
  },
  buttonstyle: {
    width: wp("90%"),
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  label: {
    fontSize: wp("4%"),
    marginTop: hp("2.5%"),
  },
  picker: {
    width: 200,
    height: 10,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: hp("2.5%"),
  },
  dropdown1BtnTxtStyle: { textAlign: "left" },
  birdname: {
    marginTop: wp("4%"),
    fontSize: wp("4%"),
    padding: 10,
  },
});

export default DraftCheckListSubmitted;