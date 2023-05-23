import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const BirdingScreen = ({ navigation }) => {
    const [seconds, setSeconds] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distanceTraveled, setDistanceTraveled] = useState(0);
    const currentLocationRef = useRef(null);

    useEffect(() => {
        let watcher = null;

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRadians = (value) => (value * Math.PI) / 180;
            const R = 6371e3; // Radius of the Earth in meters

            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distanceInMeters = R * c;
            const distanceInMiles = distanceInMeters / 1609.344; // Convert meters to miles

            return distanceInMiles; // Return distance in miles
        };


        const handleLocationUpdate = (position) => {
            const { latitude, longitude } = position.coords;

            if (currentLocationRef.current) {
                const { latitude: currLatitude, longitude: currLongitude } = currentLocationRef.current;
                const distance = calculateDistance(
                    currLatitude,
                    currLongitude,
                    latitude,
                    longitude
                );
                setDistanceTraveled((prevDistance) => prevDistance + distance);
            }
            setCurrentLocation({ latitude, longitude });
            currentLocationRef.current = { latitude, longitude };
        };

        const startLocationUpdates = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Location permission not granted');
                return;
            }

            watcher = Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 0,
                },
                (location) => handleLocationUpdate(location),
                (error) => {
                    console.warn('Error retrieving location:', error);
                },
                { taskName: 'birdingLocationUpdates' }
            );
        };

        startLocationUpdates();

        return () => {
            if (watcher) {
                Location.hasStartedLocationUpdatesAsync('birdingLocationUpdates').then(
                    (hasStarted) => {
                        if (hasStarted) {
                            Location.stopLocationUpdatesAsync('birdingLocationUpdates');
                        }
                    }
                );
            }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{formatTime(seconds)}</Text>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 16 }}>{distanceTraveled.toFixed(2)} miles</Text>
                        </View>
                    </View>
                </View>
            ),
        });
    }, [navigation, distanceTraveled, seconds]);

    return (
        <View>
            <Text>Content of the Birding Screen Here</Text>
        </View>
    );
};

export default BirdingScreen;