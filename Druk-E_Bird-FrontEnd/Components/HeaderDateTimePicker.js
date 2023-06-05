import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const HeaderDateTimePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getCurrentDateTime = () => {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('en-US', { month: 'short' });
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      return { date: `${day} ${month}`, time: formattedTime };
    };

    const currentDate = getCurrentDateTime();
    setDate(currentDate.date);
    setTime(currentDate.time);
  }, []);

  const handleDateChange = (event, newSelectedDate) => {
    setShowDatePicker(false);
    if (newSelectedDate !== undefined) {
      const day = newSelectedDate.getDate();
      const month = newSelectedDate.toLocaleString('en-US', { month: 'short' });
      setDate(`${day} ${month}`);
      setSelectedDate(newSelectedDate);
    }
  };

  const handleTimeChange = (event, newSelectedTime) => {
    setShowTimePicker(false);
    if (newSelectedTime !== undefined) {
      const newSelectedDate = new Date(selectedDate);
      newSelectedDate.setHours(newSelectedTime.getHours());
      newSelectedDate.setMinutes(newSelectedTime.getMinutes());
      setTime(
        newSelectedTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      );
      setSelectedDate(newSelectedDate);
    }
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleTimePress = () => {
    setShowTimePicker(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleDatePress}>
            <Text style={{ fontSize: 16 }}>{date}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTimePress}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{time}</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [date, time, navigation]);

  return (
    <View>
      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default HeaderDateTimePicker;