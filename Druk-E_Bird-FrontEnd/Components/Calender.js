import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker';



const { width } = Dimensions.get('window');
const cellSize = width / 7;

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = ({ onSelectDate }) => {

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');



  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const numDaysInMonth = new Date(year, month, 0).getDate();

  const daysInMonth = useMemo(() => Array.from({ length: numDaysInMonth }, (_, i) => i + 1), [numDaysInMonth]);
  const blanksBefore = useMemo(() => Array.from({ length: firstDayOfMonth }, (_, i) => ' '), [firstDayOfMonth]);

  const calendarRows = useMemo(() => {
    const days = [...blanksBefore, ...daysInMonth];
    const rows = [];
    let i = 0;
    while (i < days.length) {
      if (i === 0 && days[i] === 1 && blanksBefore.length % 7 !== 0) {
        rows.push([null, null, null, null, null, null, 1]);
        i++;
      } else {
        rows.push(days.slice(i, i + 7));
        i += 7;
      }
    }
    if (rows[rows.length - 1].length < 7) {
      const lastRow = rows.pop();
      for (let i = lastRow.length; i < 7; i++) {
        const day = i - lastRow.length + 1;
        lastRow.push(day > numDaysInMonth ? null : '');
      }
      rows.push(lastRow);
    }
    return rows;
  }, [blanksBefore, daysInMonth, numDaysInMonth]);

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  // const handleDatePress = (date) => {
  //   const isSelected = selectedDates.includes(date);
  //   const newSelectedDates = isSelected
  //     ? selectedDates.filter((d) => d !== date)
  //     : [...selectedDates, date];
  //   setSelectedDates(newSelectedDates);
  //   onSelectDate && onSelectDate(date);
  // };

  const handleDatePress = (date) => {
    setSelectedDate(date);
    onSelectDate && onSelectDate(date);
  };


  const handleSelectButtonPress = () => {
    // Show date picker

    <DatePicker
      date={selectedDate}
      mode="date"
      onDateChange={date => setSelectedDate(date)}
    />
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.arrowButton}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.monthYear}>{`${monthNames[month - 1]} ${year}`}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.arrowButton}>
          <Text style={styles.arrow}>{' >'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>





      {/* {calendarRows.map((row, i) => (
        <View key={i} style={styles.week}>
          {row.map((day, j) => {
            const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} `;
            const isSelected = selectedDates.includes(date);
            const isToday =
              new Date().getFullYear() === year &&
              new Date().getMonth() + 1 === month &&
              new Date().getDate() === day;
            return (
              <TouchableOpacity
                key={j}
                onPress={() => handleDatePress(date)}
                style={[
                  styles.dayButton,
                  { backgroundColor: isSelected ? ' #136d66' : 'white' },
                ]}>
                <Text
                  style={[
                    styles.dayText,
                    { color: isSelected ? 'white' : 'black' },
                    { fontWeight: isToday ? 'bold' : 'normal' },
                  ]}>
                  {day}
                </Text>
                {isSelected && (
                  <View style={styles.selectedDayIndicator} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))} */}



      {calendarRows.map((row, i) => (
        <View key={i} style={styles.week}>
          {row.map((day, j) => {
            const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} `;
            const isSelected = selectedDate === date;
            const isToday =
              new Date().getFullYear() === year &&
              new Date().getMonth() + 1 === month &&
              new Date().getDate() === day;
            return (
              <TouchableOpacity
                key={j}
                onPress={() => handleDatePress(date)}
                style={[
                  styles.dayButton,
                  { backgroundColor: isSelected ? ' #136d66' : 'white' },
                ]}>
                <Text
                  style={[
                    styles.dayText,
                    { color: isSelected ? 'white' : 'black' },
                    { fontWeight: isToday ? 'bold' : 'normal' },
                  ]}>
                  {day}
                </Text>
                {isSelected && (
                  <View style={styles.selectedDayIndicator} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}






      <View style={styles.selectButtonContainer}>
        <TouchableOpacity onPress={handleSelectButtonPress} style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>


  );

};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  arrowButton: {
    padding: 8,
  },
  arrow: {
    fontSize: 30,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  monthYear: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekDays: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    paddingVertical: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
  },
  week: {
    flexDirection: 'row',
  },
  dayButton: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayIndicator: {
    position: 'absolute',
    top: '30%',
    backgroundColor: '#007AFF',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  selectButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  selectButton: {
    backgroundColor: '#136d66',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Calendar;

