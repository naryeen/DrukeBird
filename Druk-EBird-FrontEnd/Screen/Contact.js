import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import SettingHeader from './SettingHeader';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (name === '' || email === '' || message === '') {
      Alert.alert('Please fill in all fields');
    } else {
      // send form data to backend API or email address
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
      Alert.alert('Message sent successfully');
      // clear form data
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <View>
      <SettingHeader title={'Contact Us'} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Enter your message"
          value={message}
          onChangeText={setMessage}
          multiline
        /> 
        </View>
        <View style={styles.send}>
        <Button title="Send" onPress={handleSubmit} />
        </View>
       
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop:20,
    width: '100%',
    height: 300,
    width: 340,
    marginLeft: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  messageInput: {
    height: 200,
  },
  send: {
    marginTop: 145,
    width: 340,
    marginLeft: 20,
    height: 300,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ContactUs;