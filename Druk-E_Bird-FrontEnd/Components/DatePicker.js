import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DatePicker = ({ onDateSelected }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (event.type === 'set') {
      const currentDate = new Date();
      if (date > currentDate) {
        return; // Prevent selection of future dates
      }
      setSelectedDate(date);
      onDateSelected(date);
    }
    setShowPicker(false);
  };

  const handleShowPicker = () => {
    setShowPicker((prevState) => !prevState);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleShowPicker}>
        <Icon name="calendar" size={25} color="#136d66" style={styles.dateIcon} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ color: 'red' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateIcon: {
    marginLeft: wp('28%'),
  },
});

export default DatePicker;