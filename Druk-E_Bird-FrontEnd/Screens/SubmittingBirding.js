import React, { useState, useContext } from "react";
import {View,StyleSheet,Text,Alert,StatusBar,ScrollView,} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../Components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import BhutanDzongkhags from "../Components/BhutanDzongkha";
import UnknownHeader from "../Components/UnknownHeader";
import Toast from "react-native-root-toast";
import { postCheckList } from "../Api/Api";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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

  const birdsWithCount = SubmittedBirdsdata.startbirding1data.filter(
    (bird) => bird.count > 0
  );

  const StartbirdingonedataSave = () => {
    if (!selectedDzongkhag) {
      Toast.show("Please select Dzongkhag", {
        duration: Toast.durations.SHORT,position: Toast.positions.CENTER});
      return;
    } else if (!selectedGewog) {
      Toast.show("Please select Gewong", { duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
      return;
    } else if (!selectedVillage) {
      Toast.show("Please select Village", { duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
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
          postCheckList,
          detailOfBirds
        )
        .then((response) => {
          Toast.show("Data successfully posted", {
            duration: Toast.durations.SHORT,position: Toast.positions.CENTER});
        })
        .catch((error) => {
          Toast.show(error, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      Toast.show(error, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
    }
  };

  return (
    <View style={styles.container}>
      <UnknownHeader title={"Submit Checklist"} />
      <View style={styles.container1}>
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
            <Icon name="chevron-down" size={18} color="gray" />
          )}
        />
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
         
          disabled={selectedDzongkhag === "" || selectedGewog === ""}
        />
        <ScrollView>
          <View style={styles.birdname}>
            {birdsWithCount.length > 0 ? (
              <Text style={{ fontWeight: "bold" }}>
                Number of observed Birds: {birdsWithCount.length}
              </Text>
            ) : (
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  No birds with count greater than 0
                </Text>
              </View>
            )}
            {birdsWithCount.map((bird) => (
              <Text key={bird.englishname}>
                {bird.englishname} : {bird.count}
              </Text>
            ))}
          </View>
        </ScrollView>
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
      <View style={styles.buttonContainer}>
        <Button styling={styles.buttonstyle} onPress={StartbirdingonedataSave}>
          Continue
        </Button>
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  birdname: {
    marginTop: wp("4%"),
    fontSize: wp("4%"),
    padding: 10,
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
  box: {
    marginTop: hp('10%'),
    borderWidth: 1,
    borderRadius: 4,
    padding: wp('20%'),
    alignItems: "center",
    borderColor: "#ccc",


  },
  boxText: {
    textAlign: "center",
  },
});

export default SubmittingBirding;
