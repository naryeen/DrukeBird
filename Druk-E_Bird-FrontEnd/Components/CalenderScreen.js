import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Calendar from '../Components/Calender';
import Icon from 'react-native-vector-icons/FontAwesome';

const CalendarScreen = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const handleDatePress = () => {
    setCalendarVisible(true);
  };
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDatePress}>
        <View style={styles.calendarcontainer}>
          <Icon name="calendar" size={20} color="black" style={styles.calendaricon} />
          <View style={styles.calendardateContainer}>
            <Text style={styles.calendartitle}>Date</Text>
            <Text style={styles.calendardate}>18/May/2023</Text>
            {/* <Text>{selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</Text> */}

          </View>
        </View>
      </TouchableOpacity>

      {isCalendarVisible && <Calendar onClose={() => setCalendarVisible(false)} />}
    </View>
  );
};



const styles = StyleSheet.create({
  calendarcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendaricon: {
    marginRight: 110,
  },
  calendardateContainer: {
    flex: 1,
    marginRight: 20,
  },
  calendartitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calendardate: {
    color: '#136d66',
  },
  container: {
    flex: 1,
    marginTop: 50,
  }


});
export default CalendarScreen;



