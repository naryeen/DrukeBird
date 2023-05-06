import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

const EditInfo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [profession, setProfession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   // Fetch user's current profile data
  //   setIsLoading(true);
  //   axios.get('http://your-api-url.com/users/me')
  //     .then((response) => {
  //       const { name, email, dob, profession } = response.data;
  //       setName(name);
  //       setEmail(email);
  //       setDob(dob);
  //       setProfession(profession);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.response.data.message);
  //       setIsLoading(false);
  //     });
  // }, []);

  const handleUpdateProfile = () => {
    const data = {
      name,
      email,
      dob,
      profession
    };

    setIsLoading(true);
    // Call API to update profile
    axios.put('http://your-api-url.com/users/me', data)
      .then(() => {
        console.log('Profile updated successfully!');
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={(text) => setDob(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Profession"
        value={profession}
        onChangeText={(text) => setProfession(text)}
      />
      <Button
        title="Update Profile"
        onPress={handleUpdateProfile}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default EditInfo;
