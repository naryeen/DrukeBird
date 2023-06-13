import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, ToastAndroid, StatusBar, SafeAreaView } from 'react-native';
import Button from '../Components/Button';
import UnknownHeader from '../Components/UnknownHeader';
import * as MailComposer from 'expo-mail-composer';
import Toast from 'react-native-root-toast'; // Add this import


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (name.trim() === '') {
      Toast.show('Please enter your name', { duration: Toast.durations.SHORT });
      return;
    } else if (email.trim() === '') {
      Toast.show('Please enter your email', { duration: Toast.durations.SHORT });
      return;
    } else if (message.trim() === '') {
      Toast.show("Write the message", { duration: Toast.durations.SHORT });
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
      .catch(error => {
        ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.con}>
        <UnknownHeader title={'Contact Us'} />
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              style={styles.name}
              mode="outlined"
              label="Name"
              placeholder="Enter Your Name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.email}
              mode="outlined"
              label="Email"
              placeholder="Enter Your Email"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  container: {
    padding: wp('3%'),
    backgroundColor: '#FFFFFF',
    height: hp('80%'),
    marginTop: hp('4%'),
    width: wp('95%'),
    marginLeft: wp('2.5%'),
    borderRadius: wp('2%'),
    elevation: 20,
  },
  name: {
    marginTop: hp('2%'),
    borderRadius: wp('2%'),
  },
  email: {
    marginTop: hp('2%'),
    borderRadius: wp('2%'),
  },
  message: {
    marginTop: hp('2%'),
    borderRadius: wp('2%'),
    height: hp('40%'),
  },
  buttonStyle: {
    backgroundColor: '#136D66',
    marginTop: hp('5%'),
    width: '100%',
  },
});


export default ContactUs;