// import React, { useState, useContext } from 'react';
// import { View, StyleSheet, Text, ToastAndroid, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Button from '../Components/Button';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';
// import BhutanDzongkhags from '../Components/BhutanDzongkha';

// const SubmittingBirding = ({ route }) => {
//   const { SubmittedBirdsdata } = route.params;
//   const { checklistdata } = route.params;
//   const { userInfo } = useContext(AuthContext);
//   const name = userInfo.user.name;
//   const userId = userInfo.user._id;
//   const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
//   const [selectedGewog, setSelectedGewog] = useState('');
//   const [selectedVillage, setSelectedVillage] = useState('');
//   const [gewogOptions, setGewogOptions] = useState([]);
//   const [villageOptions, setVillageOptions] = useState([]);
//   const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 1000));

//   const handleDzongkhagChange = (value) => {
//     setSelectedDzongkhag(value);
//     setSelectedGewog('');
//     setSelectedVillage('');
//     setVillageOptions([]);

//     const gewogs = BhutanDzongkhags[value];
//     const gewogOptions = Object.keys(gewogs);
//     setGewogOptions(gewogOptions);
//   };

//   const handleGewogChange = (value) => {
//     setSelectedGewog(value);
//     setSelectedVillage('');

//     const villages = BhutanDzongkhags[selectedDzongkhag][value];
//     const villageOptions = villages.map((village) => ({ label: village, value: village }));
//     setVillageOptions(villageOptions);
//   };

//   const dataSource = SubmittedBirdsdata ? SubmittedBirdsdata.startbirding1data : checklistdata;
//   console.log("it is here",dataSource)
//   // Filter the birds with count greater than 0
//   const birdsWithCount = dataSource.filter((bird) => bird.count > 0);

//   const StartbirdingonedataSave = () => {
//     if (!selectedDzongkhag) {
//       ToastAndroid.show('Please select Dzongkha', ToastAndroid.LONG);
//       return;
//     } else if (!selectedGewog) {
//       ToastAndroid.show('Please select Gewong', ToastAndroid.LONG);
//       return;
//     } else if (!selectedVillage) {
//       ToastAndroid.show('Please select Village', ToastAndroid.LONG);
//       return;
//     }
//     if (SubmittedBirdsdata) {
//       var detailOfBirds = [];
//       var dataSubmitted = false;
//       var endpointLocation = {
//         dzongkhag: selectedDzongkhag,
//         gewog: selectedGewog,
//         village: selectedVillage,
//       };

//       dataSource.forEach((bird) => {
//         if (bird.count) {
//           var temp = [
//             {
//               Totalcount: bird.count,
//               selectedDate: SubmittedBirdsdata.StartbirdingData.selectedDate,
//               selectedTime: SubmittedBirdsdata.StartbirdingData.selectedTime,
//               observer: SubmittedBirdsdata.StartbirdingData.userName,
//               EndpointLocation: [endpointLocation],
//               status: "submittedchecklist"
//             },
//           ];

//           const StartbirdingoneData = {
//             StartbirdingData: temp,
//             BirdName: bird.englishname,
//             CheckListName: `${name}-${randomNumber}`,
//             userId: userId
//           };
//           detailOfBirds.push(StartbirdingoneData);
//           dataSubmitted = true;
//         }
//       });
//       if (!dataSubmitted) {
//         // Show the message that no data is submitted
//         Alert.alert("No Data Submitted", "Please select at least one bird count before submitting", [{ text: "OK" }]);
//         return;
//       }

//       try {
//         console.log('detailOfBirds', detailOfBirds);
//         axios
//           .post('https://druk-ebirds.onrender.com/api/v1/checkList', detailOfBirds)
//           .then((response) => {
//             // Data successfully posted to the database
//             ToastAndroid.show('Data successfully posted', ToastAndroid.LONG);
//             console.log('Data post:', response.data);
//           })
//           .catch((error) => {
//             console.error('Error post data:', error);
//           });
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     } else if (checklistdata) {
//       console.log(checklistdata.StartbirdingData.selectedDate);
//       var detailOfBirds = [];
//       var dataSubmitted = false;
//       var endpointLocation = {
//         dzongkhag: selectedDzongkhag,
//         gewog: selectedGewog,
//         village: selectedVillage,
//       };
    
//       dataSource.forEach((bird) => {
//         if (bird.count) {
//           var temp = [
//             {
//               Totalcount: bird.count,
//               selectedDate: checklistdata.StartbirdingData.selectedDate,
//               selectedTime: checklistdata.StartbirdingData.selectedTime,
//               observer: checklistdata.StartbirdingData.observer,
//               EndpointLocation: [endpointLocation],
//               status: "submittedchecklist"
//             },
//           ];
//           const StartbirdingoneData = {
//             StartbirdingData: temp,
//             BirdName: birdName,
//             CheckListName: `${name}-${randomNumber}`,
//             userId: userId
//           };
//           detailOfBirds.push(StartbirdingoneData);
//           dataSubmitted = true;
//         }
//       });
//       if (!dataSubmitted) {
//         // Show the message that no data is submitted
//         Alert.alert("No Data Submitted", "Please select at least one bird count before submitting", [{ text: "OK" }]);
//         return;
//       }

//       try {
//         console.log('detailOfBirds', detailOfBirds);
//         axios
//           .post('https://druk-ebirds.onrender.com/api/v1/checkList', detailOfBirds)
//           .then((response) => {
//             // Data successfully posted to the database
//             ToastAndroid.show('Data successfully posted', ToastAndroid.LONG);
//             console.log('Data post:', response.data);
//           })
//           .catch((error) => {
//             console.error('Error post data:', error);
//           });
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select Dzongkhag:</Text>
//       <Picker
//         selectedValue={selectedDzongkhag}
//         onValueChange={handleDzongkhagChange}
//         style={styles.picker}
//       >
//         <Picker.Item label="Select Dzongkhag" value="" />
//         {Object.keys(BhutanDzongkhags).map((dzongkhag) => (
//           <Picker.Item key={dzongkhag} label={dzongkhag} value={dzongkhag} />
//         ))}
//       </Picker>

//       <Text style={styles.label}>Select Gewog:</Text>
//       <Picker
//         selectedValue={selectedGewog}
//         onValueChange={handleGewogChange}
//         enabled={selectedDzongkhag !== ''}
//         style={styles.picker}
//       >
//         <Picker.Item label="Select Gewog" value="" />
//         {gewogOptions.map((gewog) => (
//           <Picker.Item key={gewog} label={gewog} value={gewog} />
//         ))}
//       </Picker>

//       <Text style={styles.label}>Select Village:</Text>
//       <Picker
//         selectedValue={selectedVillage}
//         onValueChange={setSelectedVillage}
//         enabled={selectedDzongkhag !== '' && selectedGewog !== ''}
//         style={styles.picker}
//       >
//         <Picker.Item label="Select Village" value="" />
//         {villageOptions.map((village) => (
//           <Picker.Item key={village.value} label={village.label} value={village.value} />
//         ))}
//       </Picker>

//       {birdsWithCount.length > 0 ? (
//         <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>
//           Number of observed <Icon name="twitter" size={30} color="#000" />: {birdsWithCount.length}
//         </Text>
//       ) : (
//         <Text>No birds with count greater than 0.</Text>
//       )}
//      {birdsWithCount.map((bird) => (
//   <Text key={bird.englishname || bird.birdName}>
//     {checklistdata ? checklistdata.birdName : bird.englishname} : {bird.count}
//   </Text>
// ))}
//       <Button styling={styles.buttonstyle} onPress={StartbirdingonedataSave}>
//         Continue
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     flex: 1,
//     alignItems: 'center',
//   },
//   inputStyle: {
//     marginTop: 20,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     width: 321,
//   },
//   buttonstyle: {
//     marginTop: 150,
//     width: 321,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   picker: {
//     width: 200,
//     height: 10,
//     marginBottom: 16,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 4,
//   },
// });

// export default SubmittingBirding;



// //This is for checklist

// import { Text, View, FlatList, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { ActivityIndicator, MD2Colors } from "react-native-paper";
// import { Swipeable } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../Context/AuthContext';

// const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

// function NotSubmitted() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const navigation = useNavigation();
//   const { userInfo } = useContext(AuthContext);
//   const userId = userInfo.user._id;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios.get(getCheckList)
//       .then((res) => {
//         setData(res.data.data);
//         // console.log("hyy",res.data.data)
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       })
//       .finally(() => setLoading(false));
//   };

//   const handleDelete = (itemId) => {
//     axios.delete(`https://druk-ebirds.onrender.com/api/v1/checkList/${itemId}`)
//       .then(() => {
//         setData(prevData => prevData.filter(item => item._id !== itemId));
//         ToastAndroid.show('Data successfully Deleted', ToastAndroid.LONG);
//       })
//       .catch((error) => {
//         console.error('Error deleting item:', error);
//       });
//   };

//   const handleItemClick = (checklistdata) => {
//     navigation.navigate('StartBirdingone', {checklistdata:checklistdata});
//     console.log(checklistdata)
//   };

//   const renderSwipeableContent = (itemId) => (
//     <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//       <TouchableOpacity style={{ backgroundColor: 'red', paddingTop: 30, height: 86 }} onPress={() => handleDelete(itemId)}>
//         <Text style={{ color: 'white' }}>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderItem = ({ item }) => {
//     if (item.StartbirdingData[0].status === "draftchecklist" && item.userId === userId) {
//       const checklistdata = {
//         itemId: item._id,
//         birdName: item.BirdName,
//         StartbirdingData: item.StartbirdingData[0],
//         userId: item.userId,
//         CheckListName: item.CheckListName
//       };
//       return (
//         <Swipeable renderRightActions={() => renderSwipeableContent(item._id)} onSwipeableRightOpen={() => handleDelete(item._id)}>
//           <TouchableOpacity onPress={() => handleItemClick(checklistdata)}>
//             <View>
//               <View style={{ marginLeft: 30 }}>
//                 <Text style={{ fontWeight: 'bold' }}>{item.BirdName}</Text>
//                 <Text>{item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}</Text>
//                 <Text>{item.StartbirdingData[0].Totalcount} species report</Text>
//                 <Text style={{ textAlign: "right", fontWeight: 'bold', color: 'green' }}>Not Submit</Text>
//               </View>
//               <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
//             </View>
//           </TouchableOpacity>
//         </Swipeable>
//       );
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//     setRefreshing(false);
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
//       </View>
//     );
//   }

//   const notsubmittedChecklistItems = data.filter(item => item.StartbirdingData[0].status === "draftchecklist" &&
//     item.userId === userId);

//   if (notsubmittedChecklistItems.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>No draft checklist items found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={renderItem}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}/>}/>
//     </View>
//   );
// }

// function Submitted() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const { userInfo } = useContext(AuthContext);
//   const userId = userInfo.user._id;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios.get(getCheckList)
//       .then((res) => {
//         setData(res.data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       })
//       .finally(() => setLoading(false));
//   };

//   const renderItem = ({ item }) => {
//     if (item.StartbirdingData[0].status === "submittedchecklist" && item.StartbirdingData[0].EndpointLocation[0] &&
//       item.userId === userId) {
//       const { dzongkhag, gewog, village } = item.StartbirdingData[0].EndpointLocation[0];
//       return (
//         <View>
//           <View style={{ marginLeft: 30 }}>
//             <Text style={{ fontWeight: 'bold' }}>{item.BirdName}</Text>
//             <Text>{dzongkhag} {gewog} {village}</Text>
//             <Text>{item.StartbirdingData[0].selectedDate} {item.StartbirdingData[0].selectedTime}</Text>
//             <Text>{item.StartbirdingData[0].Totalcount} species report</Text>
//           </View>
//           <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
//         </View>
//       );
//     }
//     return null;
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//     setRefreshing(false);
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
//       </View>
//     );
//   }

//   const submittedChecklistItems = data.filter(item => item.StartbirdingData[0].status === "submittedchecklist" &&
//     item.userId === userId);

//   if (submittedChecklistItems.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>No submitted checklist items found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={renderItem}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//           />
//         }
//       />
//     </View>
//   );
// }

// const Tab = createMaterialTopTabNavigator();

// function CheckList() {
//   return (
//     <Tab.Navigator
//       initialRouteName="NotSubmitted"
//       screenOptions={{
//         tabBarActiveTintColor: 'white',
//         tabBarInactiveTintColor: 'black',
//         tabBarLabelStyle: { fontSize: 16 },
//         tabBarStyle: { backgroundColor: '#136D66' },
//       }}
//     >
//       <Tab.Screen
//         name="NotSubmitted"
//         component={NotSubmitted}
//         options={{ tabBarLabel: 'Not Submitted' }}
//       />
//       <Tab.Screen
//         name="Submitted"
//         component={Submitted}
//         options={{ tabBarLabel: 'Submitted' }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default CheckList;


// //startbirdingone

// import React, { useState, useEffect, useContext } from "react";
// import { FAB, ActivityIndicator, MD2Colors, Searchbar} from "react-native-paper";
// import { StyleSheet, View, FlatList, Alert, Text, SafeAreaView, TouchableOpacity, ToastAndroid } from "react-native";
// import Button from "../Components/Button";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { Ionicons } from '@expo/vector-icons';
// import StartBirdingCounter from "../Components/StartBirdingCounter";
// import { AuthContext } from "../Context/AuthContext";

// const formatTime = (time) => {
//   const hours = Math.floor(time / 3600);
//   const minutes = Math.floor((time % 3600) / 60);
//   const seconds = Math.floor(time % 60);

//   const formattedHours = String(hours).padStart(2, "0");
//   const formattedMinutes = String(minutes).padStart(2, "0");
//   const formattedSeconds = String(seconds).padStart(2, "0");

//   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// };

// const StartBirdingone = ({ route }) => {
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [seconds, setSeconds] = useState(0);
//   const [startbirding1data, setStartbirding1data] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchFound, setSearchFound] = useState(true);
//   const [query, setQuery] = useState("");

//   const { userInfo } = useContext(AuthContext);
//   const userId = userInfo.user._id;
//   const name = userInfo.user.name
//   const { StartbirdingData } = route.params;
//   // const { birdName, count } = route.params;
//   const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 1000));

//   useEffect(() => {
//     //console.log(seconds);
//   }, [seconds]);

//   useEffect(() => {
//     handleSearch(query);
//   }, [data, startbirding1data]);

//   useEffect(() => {
//     StartbirdingData;
//     //console.log(StartbirdingData);
//   }, [StartbirdingData]);

//   useEffect(() => {

//     const interval = setInterval(() => {
//       setSeconds((seconds) => seconds + 1);
//     }, 1000);

//     // Clear the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={{ marginLeft: 10, fontSize: 18 }}>
//             {formatTime(seconds)}
//           </Text>
//         </View>),
//     });
//   }, [navigation, seconds]);

//   const handleFabPress = (UnknownBirdsdata) => {
//     Alert.alert(
//       "Alert ",
//       "Do you want to add the unknown birds?",
//       [
//         {
//           text: "NO",
//           style: "cancel",
//         },
//         {
//           text: "YES",
//           // navigation.navigate('StartBirdingone', { StartbirdingData: StartbirdingData });
//           onPress: () => navigation.navigate("UnknownBirds", { UnknownBirdsdata: UnknownBirdsdata }),
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   useEffect(() => {
//     axios
//       .get("https://druk-ebird.onrender.com/api/v1/species?limit=20")
//       .then((res) => {
//         const speciesData = res.data.species.map((item) => {
//           // if (item.englishName === birdName){
//           //   return {...item, count: count}
//           // }
//           return {...item, count: 0}
//         });

//         setData(speciesData);
//         setFilteredData(speciesData);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
  
//     const filtered = data.filter((item) =>
//       item.englishName.toLowerCase().includes(query.toLowerCase())
//     );
  
//     setFilteredData(filtered);
//     setSearchFound(filtered.length > 0);
//   };

//   const handleItemClick = (itemId, birdName, StartbirdingData) => {
//     navigation.navigate('BirdTypeInfo', { itemId: itemId, birdName: birdName, StartbirdingData: StartbirdingData});
//   };
  
//   const renderItem = ({ item, index }) => {
//     return (
//       <TouchableOpacity onPress={() => handleItemClick(item._id, item.englishName, route.params.StartbirdingData)}>
//         <View>
//           <StartBirdingCounter
//             Name={item.englishName}
//             item={item}
//             data={searchQuery.length > 0 ? filteredData : data}
//             setData={setData}
//             setStartbirding1data={setStartbirding1data}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   //data pass to unknown birds
//   const UnknownBirdsdataSave = () => {
//     var UnknownBirdsdata = {
//       StartbirdingData:StartbirdingData,
//       BirdName:"Unknown Birds"
//     };
//     handleFabPress(UnknownBirdsdata);
//     console.log(UnknownBirdsdata)
//   };

//   //data pass to SubmittingBirding
//   const SubmittedBirdsdataSave = () => {
//     var SubmittedBirdsdata = {
//       StartbirdingData:StartbirdingData,
//       startbirding1data:startbirding1data
//     };
//     navigation.navigate('SubmittingBirding', { SubmittedBirdsdata: SubmittedBirdsdata });
//     // console.log(SubmittedBirdsdata);
//   };


//   const StartbirdingonedataSave = () => {

//     var detailOfBirds = []
//     var dataSubmitted = false;
//     startbirding1data.map((bird) => {
//       if (bird.count) {
//         var temp = [{
//           "Totalcount": bird.count,
//           "currentLocation": StartbirdingData.currentLocation,
//           "selectedDate": StartbirdingData.selectedDate,
//           "selectedTime": StartbirdingData.selectedTime,
//           "observer":StartbirdingData.userName
//         }]

//         const StartbirdingoneData = {
//           "StartbirdingData": temp,
//           "BirdName": bird.englishname,
//           "CheckListName":`${name}-${randomNumber}`,
//           "userId":userId
//         };
//         detailOfBirds.push(StartbirdingoneData)
//         dataSubmitted = true;
//       }
      
//     });
//     if (!dataSubmitted) {
//       // Show the message that no data is submitted
//       Alert.alert("No Data Submitted", "Please select at least one bird count before stopping.", [{ text: "OK" }]);
//       return;
//     }
    
//     try {
//       // Make an HTTP POST request to your backend API endpoint
//       axios
//         .post("https://druk-ebirds.onrender.com/api/v1/checkList", detailOfBirds)
//         .then((response) => {
//           console.log(detailOfBirds);
//           // Data successfully posted to the database
//           ToastAndroid.show('Data successfully posted', ToastAndroid.LONG);
//           console.log("Data post:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error post data:", error);
//         });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <SafeAreaView>

//       <Searchbar
//         placeholder="Search any birds"
//         onChangeText={(text) => {
//           setQuery(text);
//           handleSearch(text);
//         }}
//         value={searchQuery}
//         inputStyle={{ paddingBottom: 19 }}
//         style={styles.searchbar}/>

//         {loading ? (
//           <ActivityIndicator
//             animating={true}
//             color={MD2Colors.green800}
//             size="large"
//             style={{ marginTop: 250, marginBottom: 250 }}
//           />
//         ) : (
//           <>
//           {!searchFound && searchQuery.length > 0 && (
//             <Text style={styles.searchNotFoundText}>Can't find your bird name</Text>
//           )}
//           <FlatList
//             style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
//             //data={data}
//             data={searchQuery.length > 0 ? filteredData : data}
//             keyExtractor={(item) => item._id}
//             renderItem={renderItem}
//           />
//           </>
//         )}
//         <FAB
//           style={styles.fab}
//           small
//           color="white"
//           icon="plus"
//           onPress={UnknownBirdsdataSave}
//         />
//         <View style={styles.buttonContianer}>
//           <Button styling={styles.submitbutton} onPress={SubmittedBirdsdataSave}>Submit</Button>
//           <Button styling={styles.stopbutton} onPress={StartbirdingonedataSave}>Stop</Button>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//     paddingLeft: 10,
//     paddingRight: 10,
//   },

//   buttonContianer: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   submitbutton: {
//     width: 163,
//     marginRight: 10,
//     height: 50,
//     borderRadius: 7,
//   },
//   stopbutton: {
//     width: 163,
//     marginLeft: 10,
//     height: 50,
//     borderRadius: 7,
//   },
//   fab: {
//     marginLeft: 290,
//     marginTop: 10,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#136D66",
//   },
//   searchbar: {
//     marginTop: 5,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 1,
//   },
//   searchNotFoundText:{
//     fontSize:16,
//     textAlign:'center',
//     fontWeight:'bold',
//     marginTop:30
//   }
// });

// export default StartBirdingone;

import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, MD2Colors, Searchbar} from "react-native-paper";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ObservedSpecies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFound, setSearchFound] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueBirdNames, setUniqueBirdNames] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const uniqueNamesSet = new Set();
    data.forEach(item => {
      if (item.StartbirdingData[0].status === "submittedchecklist") {
        uniqueNamesSet.add(item.BirdName);
      }
    });
    const uniqueNames = Array.from(uniqueNamesSet);
    setUniqueBirdNames(uniqueNames);
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    const filtered = uniqueBirdNames.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredData(filtered);
    setSearchFound(filtered.length > 0);
  };

  const renderBirdName = (birdName, navigation) => {
    const handleBirdClick = () => {
      navigation.navigate('ExploreBridInfo', { birdName: birdName });
    };
  
    return (
      <TouchableOpacity onPress={handleBirdClick}>
        <View>
          <View style={{ marginLeft: 30 }}>
            <Text style={{ fontWeight: 'bold' }}>{birdName}</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  if (uniqueBirdNames.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No submitted checklist items found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Searchbar
        placeholder="Search any birds"
        onChangeText={handleSearch}
        value={searchQuery}
        inputStyle={{ paddingBottom: 19 }}
        style={styles.searchbar}
      />
      {!searchFound && searchQuery.length > 0 && (
        <Text style={styles.searchNotFoundText}>Can't find your bird name</Text>
      )}
      <FlatList
        style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
        data={searchQuery ? filteredData : uniqueBirdNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderBirdName(item, navigation)}
      />
    </View>
  );
}

function BirdingSites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleItemClick = (dzongkhag) => {
    console.log(dzongkhag)
    navigation.navigate('ExploreDzongkhagInfo', { dzongkhag:dzongkhag });
  };

  const renderDzongkhag = (item, index) => {
    const currentEndpointLocation = item.StartbirdingData[0]?.EndpointLocation[0];
    const previousEndpointLocation = data[index - 1]?.StartbirdingData[0]?.EndpointLocation[0];
  
    if (index === 0 || currentEndpointLocation?.dzongkhag !== previousEndpointLocation?.dzongkhag) {
      return (
        <View key={index}>
          <View style={{ marginLeft: 30 }}>
            <Text>{currentEndpointLocation?.dzongkhag}</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginVertical: 10 }} />
        </View>
      );
    }
    return null;
  };

  const renderItem = ({ item, index }) => {
    if (item.StartbirdingData[0].status === "submittedchecklist") {
      return (
        <TouchableOpacity onPress={() => handleItemClick(item.StartbirdingData[0].EndpointLocation[0].dzongkhag)}>
          {renderDzongkhag(item, index)}
          </TouchableOpacity>
      );
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const submittedChecklistItems = data.filter(item => item.StartbirdingData[0].status === "submittedchecklist");

  if (submittedChecklistItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No submitted checklist items found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function ExploreScreen() {
  return (
    <Tab.Navigator
      initialRouteName="ObservedSpecies"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: '#136D66' },
      }}
    >
      <Tab.Screen
        name="ObservedSpecies"
        component={ObservedSpecies}
        options={{ tabBarLabel: 'Observed Species' }}
      />
      <Tab.Screen
        name="BirdingSites"
        component={BirdingSites}
        options={{ tabBarLabel: 'Birding Sites' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  searchNotFoundText:{
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:30
  }
});

export default ExploreScreen;

