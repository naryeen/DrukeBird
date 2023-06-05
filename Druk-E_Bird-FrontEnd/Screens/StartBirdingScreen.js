import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Button from '../Components/Button';
import TimePicker from '../Components/TimePicker';
import DatePicker from '../Components/DatePicker';
import React, { useState, useEffect, useContext } from "react";
import RecordTrack from '../Components/RecordTrack';
import moment from 'moment';
import { AuthContext } from "../Context/AuthContext";

const { width } = Dimensions.get('window');

function StartbirdingScreen() {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name

  const navigateHandler = (StartbirdingData) => {
    if (isLocationEnabled) {
      navigation.navigate('StartBirdingone', { StartbirdingData: StartbirdingData });
    } else {
      navigation.navigate('StartBirdingTwo', { StartbirdingData: StartbirdingData });
    }
  };

  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeSelected = (time) => {
    setSelectedTime(time);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (currentLocation !== null) {
      console.log(currentLocation)
    }
  }, [currentLocation]);

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const StartbirdingdataSave = () => {
    var StartbirdingData = {
      selectedTime: moment(selectedTime).format('HH:mm:ss'),
      selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
      currentLocation: currentLocation,
      userName: name
    };
    navigateHandler(StartbirdingData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Tcontainer}>
        <TimePicker onTimeSelected={handleTimeSelected} />
        <View>
          {selectedTime && (
            <Text style={styles.Ttext}>
              Time: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.Dcontainer}>
        <DatePicker onDateSelected={handleDateSelected} />
        <View>
          {selectedDate && (
            <Text style={styles.Dtext}>
              Date: {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
            </Text>
          )}
        </View>
      </View>

      <RecordTrack
        isLocationEnabled={isLocationEnabled}
        setIsLocationEnabled={setIsLocationEnabled}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        style={styles.recordTrack}
      />

      <Button onPress={StartbirdingdataSave} styling={styles.buttonview}>
        Start Checklist
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0.05 * width,
    marginTop: 0.07 * width
  },
  Tcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 0.03 * width,
    elevation: 5,
    flexDirection: "row",
    marginLeft: "-3%",
    marginTop: 0.01 * width,
    alignItems: 'center',
    paddingLeft: 0.13 * width,
    height: 0.4 * width,
    width: 0.95 * width,
  },
  Ttext: {
    fontSize: 0.045 * width,
    color: '#333',
  },
  Dcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 0.03 * width,
    elevation: 5,
    flexDirection: "row",
    marginLeft: "-3%",
    marginTop: 0.05 * width,
    alignItems: 'center',
    paddingLeft: 0.13 * width,
    height: 0.4 * width,
    width: 0.95 * width
  },
  Dtext: {
    fontSize: 0.045 * width,
    color: '#333',
  },
  recordTrack: {
    marginTop: 0.1 * width,
  },
  buttonview: {
    width: width * 0.95,
    marginTop: 0.16 * width,
    marginLeft: "-3%"
  }
});

export default StartbirdingScreen;