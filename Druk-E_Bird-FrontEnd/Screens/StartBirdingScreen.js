import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../Components/Button';
import TimePicker from '../Components/TimePicker';
import DatePicker from '../Components/DatePicker';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect} from "react";
import RecordTrack from '../Components/RecordTrack';
import moment from 'moment';

function StartbirdingScreen() {
  const navigation = useNavigation();

  const navigateHandler = (StartbirdingData) => {
    if (isLocationEnabled) {
      navigation.navigate('StartBirdingone', { StartbirdingData: StartbirdingData });
    } else {
      navigation.navigate('StartBirdingTwo');
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
      currentLocation
    }
  }, [currentLocation]);

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const StartbirdingdataSave = () => {
    var StartbirdingData = {
      selectedTime: moment(selectedTime).format('HH:mm:ss'),
      selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
      currentLocation:currentLocation
    };
    navigateHandler(StartbirdingData);
  };

  // console.log(selectedTime);
  // console.log(selectedDate);

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

      <View style={styles.location}>
        <MaterialIcons name="location-on" size={24} color="black" style={styles.icon} />
        <Text style={styles.locationText}>Choose Your Location</Text>
      </View>

      <RecordTrack isLocationEnabled={isLocationEnabled} setIsLocationEnabled={setIsLocationEnabled} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />

      <Button onPress={StartbirdingdataSave} styling={styles.buttonview}>
        Start CheckList
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    marginTop:30
  },
  Tcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    flexDirection: "row",
    marginLeft: 15,
    alignItems: 'center',
    paddingLeft:55,
    height:137, 
    width:324
  },
  Ttext: {
    fontSize: 16,
    color: '#333',
  },
  location: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 18,
    alignItems: 'center',
    paddingLeft:70,
    height:137, 
    width:324

  },
  locationText: {
    marginLeft: "10%",
    fontSize: 16
  },

  Dcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 18,
    alignItems: 'center',
    paddingLeft:40,
    height:137, 
    width:324
  },
  Dtext: {
    fontSize: 16,
    color: '#333',
  },
  buttonview: {
    width:350,
    marginLeft:5,
    marginTop:18
  }
});

export default StartbirdingScreen;
