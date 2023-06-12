import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const TimePicker = ({ onTimeSelected }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (event, time) => {
    if (event.type === 'set') {
      // setSelectedTime(time);
      onTimeSelected(time);
    }
    setShowPicker(false);
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleShowPicker}>
        <Icon name="access-time" size={30} color="#136d66" style={styles.timeicon} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          mode="time"
          display="default"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerText: {
    fontSize: wp('4%'),
    color: '#2196F3',
  },
  timeicon: {
    marginLeft: wp('35%'),
  },
});
export default TimePicker