import React, { useState, useContext } from "react";
import { TextInput} from 'react-native-paper';
import { StyleSheet, View, Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button';
import Toast from 'react-native-root-toast'; // Add this import
import { AuthContext } from "../Context/AuthContext";

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (email.trim() === "") {
      Toast.show("Please enter your email", {duration: Toast.durations.SHORT});
      return;
    }

    else if (password.trim() === "") {
      Toast.show("Please enter your password", {
        duration: Toast.durations.SHORT
      });
      return;
    }
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Image/Logo.png')} />

      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Email"
        placeholder="Write Your Email"
        left={<TextInput.Icon icon="email" />}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Password"
        placeholder="Write Your Password"
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={togglePasswordVisibility}
          />
        }
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={!passwordVisible}
      />
      <Text style={styles.forgetpasswordtext} onPress={() => navigation.replace('ForgetPassword')}>
        Forgot Password?
      </Text>
      <Button styling={styles.buttonstyle} onPress={handleLogin}>Login</Button>
      <Text style={styles.createtext}>
        Don't have an account?
        <Text style={styles.createaccountText} onPress={() => navigation.replace('Verifying')}>  Register</Text>
      </Text>
    </View>
  );
};
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'), 
  },
  inputStyle: {
    marginTop: hp('2%'), 
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonstyle: {
    marginTop: hp('5%'), 
    width: wp('92%'), 
    alignItems: 'center'
  },
  createtext: {
    marginTop: hp('2%'), 
    textAlign: 'center',
    fontSize: hp('1.8%'), 
  },
  createaccountText: {
    color: '#2437E4',
  },
  image: {
    maxWidth: wp('70%'), 
    maxHeight: hp('30%'), 
    alignSelf: 'center',
    marginTop: hp('14%'), 
  },
  forgetpasswordtext: {
    fontSize: hp('1.8%'), 
    marginTop: hp('1%'), 
    textAlign: 'right',
    color: '#2437E4',
  },
  backimage: {
    backgroundColor: 'transparent',
    opacity: 0.2,
  }
});

export default LogIn;