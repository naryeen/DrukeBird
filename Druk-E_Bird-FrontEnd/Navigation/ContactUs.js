import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid, StatusBar } from 'react-native';
import Button from '../Components/Button';
import NavigationHeader from '../Components/NavigationHeader';
import * as MailComposer from 'expo-mail-composer';

const { width, height } = Dimensions.get('window');

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (name.trim() === '') {
      ToastAndroid.show('Please enter your name', ToastAndroid.SHORT);
      return;
    } else if (email.trim() === '') {
      ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
      return;
    } else if (message.trim() === '') {
      ToastAndroid.show('Write the message', ToastAndroid.SHORT);
      return;
    }

    const emailSubject = `New message from ${name}`;
    const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const recipientEmail = '12190099.gcit@rub.edu.bt';

    MailComposer.composeAsync({
      recipients: [recipientEmail],
      subject: emailSubject,
      body: emailBody,
    })
      .then(result => {
        console.log(result.status)
        if (result.status !== 'sent') {
          ToastAndroid.show('Email sending cancelled', ToastAndroid.SHORT);
        } else if (result.status === 'sent') {
          ToastAndroid.show('Email sent successfully', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
        console.log(error);
      });
  };

  return (
    <View style={styles.con}>
      <NavigationHeader title={'Contact Us'} />
      <Text style={styles.messages}>Leave a message</Text>
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.name}
            mode="outlined"
            label="Name"
            placeholder="Write Your Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.email}
            mode="outlined"
            label="Email"
            placeholder="Write Your Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.message}
            mode="outlined"
            label="Message"
            placeholder="Write Your Message"
            multiline
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Button styling={styles.buttonStyle} onPress={sendMessage}>
            Send Message
          </Button>
        </ScrollView>
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  con:{
    flex:1,
  },
  container: {
    padding: width * 0.03,
    backgroundColor: '#FFFFFF',
    height: height * 0.7,
    marginTop: height * 0.04,
    width: width * 0.95,
    marginLeft: width * 0.025,
    borderRadius: width * 0.02,
    elevation: 20,
    borderColor: 'black',
  },
  messages: {
    color: 'gray',
    marginLeft: width * 0.07,
    marginTop: height * 0.035,
    fontSize: width * 0.05,
  },
  name: {
    marginTop: height * 0.02,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
  },
  email: {
    marginTop: height * 0.02,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
  },
  message: {
    marginTop: height * 0.02,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    height: height * 0.3,
  },
  buttonStyle: {
    backgroundColor: '#136D66',
    marginTop: height * 0.08,
    width: '100%',
  },
});

export default ContactUs;
