import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Button from '../Components/Button';
import TimePicker from '../Components/TimePicker';
import DatePicker from '../Components/DatePicker';
import React, { useState, useEffect, useContext } from "react";
import RecordTrack from '../Components/RecordTrack';
import moment from 'moment';
import { AuthContext } from "../Context/AuthContext";



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

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    marginTop: wp('8%'),
  },
  Tcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: wp('3%'),
    flexDirection: 'row',
    marginLeft: '-3%',
    marginTop: hp('2%'),
    alignItems: 'center',
    paddingLeft: wp('13%'),
    height: wp('40%'),
    width: wp('95%'),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp('0.13%') }, 
        shadowOpacity: 0.2,
        shadowRadius: wp('0.278%'), 
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Ttext: {
    fontSize: wp('4.5%'),
    color: '#333',
  },
  Dcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: wp('3%'),
    flexDirection: 'row',
    marginLeft: '-3%',
    marginTop: hp('3%'),
    alignItems: 'center',
    paddingLeft: wp('13%'),
    height: wp('40%'),
    width: wp('95%'),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp('0.13%') }, 
        shadowOpacity: 0.2,
        shadowRadius: wp('0.278%'), 
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Dtext: {
    fontSize: wp('4.5%'),
    color: '#333',
  },
  recordTrack: {
    marginTop: hp('10%'),
  },
  buttonview: {
    width: wp('95%'),
    marginTop: hp('8%'),
    marginLeft: '-3%',
  },
});

export default StartbirdingScreen;