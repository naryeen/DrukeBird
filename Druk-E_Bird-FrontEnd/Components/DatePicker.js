import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
                    display="default"
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
        marginVertical: hp('2%'), // Adjust the percentage value as needed
    },
    pickerText: {
        fontSize: wp('4.17%'), // Adjust the percentage value as needed
        color: '#2196F3',
    },
    dateicon: {
        padding: wp('5.56%'), // Adjust the percentage value as needed
        marginRight: wp('5.56%'), // Adjust the percentage value as needed
    },
});


export default DatePicker;