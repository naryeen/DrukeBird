// import React, { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { DatePicker, TimePicker } from 'expo';




// const getCurrentDateTime = () => {
//     const currentDate = new Date();
//     const day = currentDate.getDate();
//     const month = currentDate.toLocaleString('en-US', { month: 'short' });
//     const formattedTime = currentDate.toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//     });

//     return { date: `${day} ${month}`, time: formattedTime };
// };
// const BirdingScreen = ({ navigation }) => {
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [showTimePicker, setShowTimePicker] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [date, setDate] = useState(getCurrentDateTime().date);
//     const [time, setTime] = useState(getCurrentDateTime().time);

//     const handleDateChange = (event, newSelectedDate) => {
//         setShowDatePicker(false);
//         if (newSelectedDate !== undefined) {
//             const day = newSelectedDate.getDate();
//             const month = newSelectedDate.toLocaleString('en-US', { month: 'short' });
//             setDate(`${day} ${month}`);
//             setSelectedDate(newSelectedDate);
//         }
//     };

//     const handleTimeChange = (event, newSelectedTime) => {
//         setShowTimePicker(false);
//         if (newSelectedTime !== undefined) {
//             const newSelectedDate = new Date(selectedDate);
//             newSelectedDate.setHours(newSelectedTime.getHours());
//             newSelectedDate.setMinutes(newSelectedTime.getMinutes());
//             setTime(
//                 newSelectedTime.toLocaleTimeString('en-US', {
//                     hour: 'numeric',
//                     minute: 'numeric',
//                     hour12: true,
//                 })
//             );
//             setSelectedDate(newSelectedDate);
//         }
//     };

//     const showDatePickerAndroid = async () => {
//         try {
//             const { action, year, month, day } = await DatePicker.openAndroidDatePicker({
//                 mode: 'default',
//             });

//             if (action !== DatePicker.dismissedAction) {
//                 const newSelectedDate = new Date(year, month, day);
//                 handleDateChange(null, newSelectedDate);
//             }
//         } catch ({ code, message }) {
//             console.warn('Cannot open date picker', message);
//         }
//     };

//     const showTimePickerAndroid = async () => {
//         try {
//             const { action, hour, minute } = await TimePicker.openTimePickerAsync({
//                 is24Hour: false,
//             });

//             if (action !== TimePicker.dismissedAction) {
//                 const newSelectedTime = new Date(selectedDate);
//                 newSelectedTime.setHours(hour);
//                 newSelectedTime.setMinutes(minute);
//                 handleTimeChange(null, newSelectedTime);
//             }
//         } catch ({ code, message }) {
//             console.warn('Cannot open time picker', message);
//         }
//     };

//     const handleDatePress = () => {
//         setShowDatePicker(true);
//     };

//     const handleTimePress = () => {
//         setShowTimePicker(true);
//     };

//     useEffect(() => {
//         const currentDate = getCurrentDateTime();
//         setDate(currentDate.date);
//         setTime(currentDate.time);
//     }, []);

//     navigation.setOptions({
//         headerTitle: () => (
//             <View style={{ flexDirection: 'row' }}>
//                 <TouchableOpacity onPress={handleDatePress}>
//                     <Text style={{ fontSize: 16 }}>{date}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleTimePress}>
//                     <Text style={{ fontSize: 16, marginLeft: 10 }}>{time}</Text>
//                 </TouchableOpacity>
//             </View>
//         ),
//     });

//     return (
//         <View>
//             {showDatePicker && Platform.OS === 'android' && (
//                 <DateTimePicker
//                     value={selectedDate}
//                     mode="date"
//                     display="default"
//                     onChange={handleDateChange}
//                 />
//             )}
//             {showTimePicker && Platform.OS === 'android' && (
//                 <DateTimePicker
//                     value={selectedDate}
//                     mode="time"
//                     display="default"
//                     onChange={handleTimeChange}
//                 />
//             )}
//             {/* Rest of the component content */}
//             <Text>Content of the Birding Screen Here</Text>
//         </View>
//     );
// };

// export default BirdingScreen;


































































// import React, { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const formatTime = (time) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = Math.floor(time % 60);

//     const formattedHours = String(hours).padStart(2, '0');
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(seconds).padStart(2, '0');

//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// };

// const BirdingScreen = ({ navigation }) => {
//     const [seconds, setSeconds] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setSeconds((seconds) => seconds + 1);
//         }, 1000);

//         // Clear the interval on component unmount
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         navigation.setOptions({
//             headerLeft: () => (
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <TouchableOpacity
//                         onPress={() => navigation.goBack()}
//                         style={{ marginLeft: 10 }}
//                     >
//                         <Ionicons name="arrow-back" size={24} color="black" />
//                     </TouchableOpacity>
//                     <Text style={{ marginLeft: 10, fontSize: 18 }}>
//                          {formatTime(seconds)}
//                     </Text>
//                 </View>
//             ),
//         });
//     }, [navigation]);

//     return (
//         <View>
//             <Text>Content of the Birding Screen Here</Text>
//         </View>
//     );
// };

// export default BirdingScreen;







