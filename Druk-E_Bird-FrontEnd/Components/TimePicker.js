import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <View style={styles.pickerContainer}>
      <TouchableOpacity onPress={handleShowPicker}>
        <Icon name="clock-o" size={20} color="black" style={styles.timeicon} />
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

import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
    marginVertical: heightPercentageToDP(2),
    flexDirection: 'row',
  },
  pickerText: {
    fontSize: widthPercentageToDP(4),
    color: '#2196F3',
  },
  timeicon: {
    marginRight: widthPercentageToDP(4),
  },
});
export default TimePicker