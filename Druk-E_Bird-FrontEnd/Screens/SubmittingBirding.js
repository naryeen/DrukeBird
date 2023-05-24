import React, { useState,useContext} from 'react';
import { View, StyleSheet, Text, ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from "../Components/Button";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // Import axios for making HTTP requests
import { AuthContext } from "../Context/AuthContext";

const SubmittingBirding = ({ route }) => {
  const { SubmittedBirdsdata } = route.params;
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name
  const [location, setLocation] = useState("");

  // Filter the birds with count greater than 0
  const birdsWithCount = SubmittedBirdsdata.startbirding1data.filter(
    bird => bird.count > 0
  );

  const StartbirdingonedataSave = () => {
    var detailOfBirds = [];
    SubmittedBirdsdata.startbirding1data.map((bird) => {
      if (bird.count) {
        var temp = [{
          "count": bird.count,
          "selectedDate": SubmittedBirdsdata.StartbirdingData.selectedDate,
          "selectedTime": SubmittedBirdsdata.StartbirdingData.selectedTime,
          "observer": SubmittedBirdsdata.StartbirdingData.userName,
          "EndpointLoaction": location
    }];
    const randomNumber = Math.floor(Math.random() * 1000);

    const StartbirdingoneData = {
      "StartbirdingData": temp,
      "BirdName": bird.englishname,
      "CheckListName":`${name}-${randomNumber}`
    };
    detailOfBirds.push(StartbirdingoneData);
  }
});

    try {
      // Make an HTTP POST request to your backend API endpoint
    console.log("detailOfBirds",detailOfBirds);

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
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Location"
        left={<TextInput.Icon icon="map-marker"/>}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />
      {birdsWithCount.length > 0 ? (
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>
          Number of observed <Icon name="twitter" size={30} color="#000" />: {birdsWithCount.length}
        </Text>
      ) : (
        <Text>No birds with count greater than 0.</Text>
      )}
      {birdsWithCount.map((bird) => (
        <Text key={bird.englishname}>
          {bird.englishname} : {bird.count}
        </Text>
      ))}
      <Button styling={styles.buttonstyle} onPress={StartbirdingonedataSave}>
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  inputStyle: {
    marginTop: 20,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 321,
  },
  buttonstyle: {
    marginTop: 150,
    width: 321,
  },
});

export default SubmittingBirding;

