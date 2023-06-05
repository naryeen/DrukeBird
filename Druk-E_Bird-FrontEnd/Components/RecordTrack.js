// import React, { useEffect} from 'react';
// import { View, Switch, PermissionsAndroid, Alert, Text, StyleSheet} from 'react-native';
// import * as Location from 'expo-location';

// const RecordTrack = ({isLocationEnabled, setIsLocationEnabled , currentLocation, setCurrentLocation}) => {
//   useEffect(() => {
//     currentLocation;
//   }, [currentLocation]);

//   useEffect(() => {
//     checkLocationPermission();
//   }, []);

//   const checkLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         setIsLocationEnabled(true);
//         getCurrentLocation(); // Call getCurrentLocation if permission is granted
//       } else {
//         setIsLocationEnabled(false);
//         Alert.alert(
//           'Permission Denied',
//           'You need to grant location permission to use this feature.',
//           [{ text: 'OK' }]
//         );
//       }
//     } catch (error) {
//       console.error('Error requesting location permission:', error);
//     }
//   };

//   const handleToggleSwitch = () => {
//     if (isLocationEnabled) {
//       Alert.alert(
//         'Location Feature',
//         'Are you sure you want to turn off the location feature?',
//         [
//           { text: 'No', style: 'cancel' },
//           { text: 'Yes', onPress: () => setIsLocationEnabled(false) }
//         ]
//       );
//     } else {
//       setIsLocationEnabled(true);
//       getCurrentLocation(); // Call getCurrentLocation if the switch is turned on
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === 'granted') {
//         var GPSlocation = await Location.getCurrentPositionAsync({});
        
//         var location = {}
//         location["latitude"] = GPSlocation.coords.latitude
//         location["longitude"] = GPSlocation.coords.longitude
//         setCurrentLocation(location);
//       } else {
//         setIsLocationEnabled(false);
//         Alert.alert(
//           'Permission Denied',
//           'You need to grant location permission to use this feature.',
//           [{ text: 'OK' }]
//         );
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={{fontSize:16, fontWeight:'bold'}}>Record Track</Text>
//       <Switch
//       trackColor={{ false: '#767577', true: '#767577' }}
//         thumbColor={isLocationEnabled ? '#24B78B' : '#136D66'}
//         ios_backgroundColor="#3e3e3e"
//         value={isLocationEnabled}
//         onValueChange={handleToggleSwitch}
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//     container: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection:'row',
//       marginTop:18
//     },
//   });

// export default RecordTrack;

import React, { useEffect} from 'react';
import { View, Switch, Alert, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const RecordTrack = ({isLocationEnabled, setIsLocationEnabled , currentLocation, setCurrentLocation}) => {

  useEffect(() => {
        currentLocation;
      }, [currentLocation]);
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setIsLocationEnabled(true);
        getCurrentLocation();
      } else {
        setIsLocationEnabled(false);
        Alert.alert(
          'Permission Denied',
          'You need to grant location permission to use this feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const handleToggleSwitch = () => {
    if (isLocationEnabled) {
      Alert.alert(
        'Location Feature',
        'Are you sure you want to turn off the location feature?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => setIsLocationEnabled(false) }
        ]
      );
    } else {
      setIsLocationEnabled(true);
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
      } else {
        setIsLocationEnabled(false);
        Alert.alert(
          'Permission Denied',
          'You need to grant location permission to use this feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Record Track</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#767577' }}
        thumbColor={isLocationEnabled ? '#24B78B' : '#136D66'}
        ios_backgroundColor="#3e3e3e"
        value={isLocationEnabled}
        onValueChange={handleToggleSwitch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 18
  },
});

export default RecordTrack;

