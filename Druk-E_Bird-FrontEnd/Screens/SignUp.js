import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../Components/Button";
import axios from "axios";
import countryOptions from "../Components/Country";
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = () => {
  const navigation = useNavigation();
  const [DoB, setDoB] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const windowDimensions = Dimensions.get('window');
  const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

  const register = () => {
    let user = {
      dob: DoB,
      country: country,
      profession: profession,
      password: password,
      passwordConfirm: passwordConfirm
    };
    axios
      .post('https://druk-ebirds.onrender.com/api/v1/users/signup', user)
      .then(res => {
        if (res.data.status == "success") {
          ToastAndroid.show('Successfully Created Your Account',
            ToastAndroid.LONG);

          setTimeout(() => {
            navigation.navigate('Login');
          }, 200);
        }
      })
      .catch(err => {
        JSON.stringify(err);
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;

        ToastAndroid.show(message,
          ToastAndroid.SHORT);
      });
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);

    if (date !== undefined) {
        setDoB(date);
    }
};

const showDatepicker = () => {
    setShowDatePicker(true);
};

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    text1: {
      marginTop: marginTopDistance,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    inputStyle: {
      marginTop: 20,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    countryContainer: {
      marginTop: 20,
      borderColor: '#ccc',
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      backgroundColor:'white'
    },
    countryPicker: {
      flex: 1,
    },
    flagIcon: {
      marginRight: 10,
    },
    createtext: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 14,
    },
    loginText: {
      color: '#2437E4',
    },
    buttonstyle: {
      backgroundColor: '#136D66',
      marginTop: 30,
      width: "100%",
    },
    datePickerContainer: {
      position: 'relative',
      flex: 1,
  },
  });

  return (
    <View style={styles.container}>

      <Text style={styles.text1}>
        Create Account
      </Text>
      <ScrollView>
      <View style={styles.datePickerContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        mode="outlined"
                        label="DoB"
                        placeholder="MM/DD/YYYY"
                        left={
                            <TextInput.Icon
                                icon="calendar"
                                onPress={showDatepicker}
                                forceTextInputFocus={false}
                            />
                        }
                        onTouchStart={showDatepicker}
                        value={DoB ? DoB.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }) : ''}
                        editable={false} // Allow manual entry of date
                    />
                    {showDatePicker && (
                        <DateTimePicker
                            mode="date"
                            display="default"
                            value={DoB ? new Date(DoB) : new Date()}
                            onChange={handleDateChange}
                        />
                    )}
                </View>
        <View style={styles.countryContainer}>
          <Icon name="flag" size={20} color="#000" style={styles.flagIcon} />
          <View style={styles.countryPicker}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
            >
              <Picker.Item label="Select Country" value="" />
              {countryOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </View>
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Profession"
          placeholder="Write Your Profession"
          left={<TextInput.Icon icon="briefcase" />}
          onChangeText={(text) => setProfession(text)}
          value={profession}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          secureTextEntry={!passwordVisible}
          label="Password"
          placeholder="Write Your Password"
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          secureTextEntry={!passwordVisible}
          label="Confirm Password"
          placeholder="Enter the Your Password Again"
          left={<TextInput.Icon icon="key-variant" />}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
          onChangeText={(text) => setPasswordConfirm(text)}
          value={passwordConfirm}
        />
        <Button styling={styles.buttonstyle} onPress={() => register()}>Create Account</Button>
        <Text style={styles.createtext}>
          Already have an account?
          <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>Login</Text>
        </Text>
      </ScrollView>
    </View>
  );
};


export default SignUp;