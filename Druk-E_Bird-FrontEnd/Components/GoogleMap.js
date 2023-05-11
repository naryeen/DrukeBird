import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Function to retrieve the user's current location
    const getCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        error => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    getCurrentLocation();
  }, []);

  const handlePostLocation = () => {
    if (currentLocation) {
      // Post location data to MongoDB
      axios.post('YOUR_API_ENDPOINT', currentLocation)
        .then(response => {
          console.log('Location posted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error posting location:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              title="You are here"
            />
          </MapView>
          <Button title="Post Location" onPress={handlePostLocation} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '80%'
  }
});

export default MapScreen;
