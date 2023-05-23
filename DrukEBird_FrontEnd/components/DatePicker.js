import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatePicker = ({ onDateSelected }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (event.type === 'set') {
            // setSelectedDate(date);
            onDateSelected(date);
        }  
        setShowPicker(false);
    };    

    const handleShowPicker = () => {
        setShowPicker(true);
    };

    return (
        <View style={styles.pickerContainer}>
            <TouchableOpacity onPress={handleShowPicker}>
                <Icon name="calendar" size={20} color="black" style={styles.dateicon} />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    pickerText: {
        fontSize: 16,
        color: '#2196F3',
    },
    dateicon: {
        padding: 20,
        marginRight: 20,
    },
});

export default DatePicker;
