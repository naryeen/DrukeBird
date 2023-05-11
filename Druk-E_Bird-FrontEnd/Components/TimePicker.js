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
          display="spinner"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: "row",
  },
  pickerText: {
    fontSize: 16,
    color: '#2196F3',
  },
  timeicon: {
    marginRight: 20,
  },
});

export default TimePicker;