import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

import { UserContext } from '../context/userContext';

const MyProfile = () => {
  const { userToken } = useContext(UserContext);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        'https://drukebird.onrender.com/api/v1/users/updateMe',
        {
          name,
          profilePicture,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Check the response from the server
      if (response.data.success) {
        // Profile updated successfully
        Alert.alert('Profile updated!');
      } else {
        // Error updating profile
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      // Handle error
      Alert.alert('Error', 'An error occurred during profile update');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default MyProfile;
