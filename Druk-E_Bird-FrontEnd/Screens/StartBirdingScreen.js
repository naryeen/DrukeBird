import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Button from '../Components/Button';
import TimePicker from '../Components/TimePicker';
import DatePicker from '../Components/DatePicker';
import React, { useState, useEffect, useContext } from "react";
import RecordTrack from '../Components/RecordTrack';
import moment from 'moment';
import { AuthContext } from "../Context/AuthContext";
import image66 from "../assets/Image/image1.png";
import image2 from "../assets/Image/image2.png";
import image3 from "../assets/Image/image3.png";
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from '@expo/vector-icons';


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
  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
    onTimeSelected(selectedTime);
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


  const images = [image66, image2, image3];

  return (
    <View style={styles.container}>
      <View style={styles.im}>
        <SliderBox
          images={images}
          ImageComponentStyle={styles.image}
          dotColor="red"
          inactiveDotColor="black"
          dotStyle={{ height: 10, width: 10, borderRadius: 50 }}
          imageLoadingColor="black"
          autoplay
          autoplayTimeout={10000}
          loop
          autoplayInterval={9000}
          CircleLoop={true}
        />
      </View>
      <View style={styles.Tcontainer}>
        <View>
          {selectedTime && (
            <Text style={styles.Ttext}>
              Time: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Text>
          )}
        </View>
        <TimePicker onTimeSelected={handleTimeSelected} />
      </View>

      <View style={styles.Dcontainer}>
        <View>
          {selectedDate && (
            <Text style={styles.Dtext}>
              Date: {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
            </Text>
          )}
        </View>
        <DatePicker onDateSelected={handleDateSelected} />
      </View>

      <View style={styles.Dcontainer}>
        <View>
          <RecordTrack
            isLocationEnabled={isLocationEnabled}
            setIsLocationEnabled={setIsLocationEnabled}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            style={styles.recordTrack}
          />
        </View>
      </View>



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
  },
  image: {
    height: hp('35%'),
    resizeMode: "contain",
    marginTop: hp('0.8%'),
    width: wp('100%'),
  },
  Tcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: wp('3%'),
    flexDirection: 'row',
    marginLeft: '3%',
    marginTop: hp('3%'),
    alignItems: 'center',
    paddingLeft: wp('5%'),
    height: wp('20%'),
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
    marginLeft: '10%',


  },
  Dcontainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    marginLeft: '3%',
    marginTop: hp('1%'),
    alignItems: 'center',
    paddingLeft: wp('5%'),
    height: wp('20%'),
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
    marginLeft: '10%',

  },
  buttonview: {
    width: wp('95%'),
    marginTop: hp('5%'),
    marginLeft: '3%',
  },

});

export default StartbirdingScreen;