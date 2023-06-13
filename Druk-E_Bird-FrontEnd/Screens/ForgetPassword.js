import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View,StatusBar, Text } from 'react-native';
import Button from "../Components/Button";
import axios from "axios";
import ForgotPasswordHeader from "../Components/ForgotPasswordHeader";
import Toast from 'react-native-root-toast';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postForgetpassword } from "../Api/Api";
import { ActivityIndicator, MD2Colors} from "react-native-paper";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [Isloading, setIsLoading] = useState(false);

  const forgetPassword = () => {
    if (!email) {
      Toast.show("Please enter your email", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      return;
    }

    let user = {
      email: email,
    };
    setIsLoading(true);
    axios.post(postForgetpassword, user)
      .then(res => {
        if (res.status === 201) {
          Toast.show("Link is Successfully sent in Your Mail", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          
        }
      })
      .catch(err => {
        let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
        Toast.show(message, {duration: Toast.durations.SHORT,});
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <ForgotPasswordHeader title={"Forget Password"}/>
      <View style={styles.lock}>
      <MaterialCommunityIcons style={styles.logo}
                  name="lock-open-outline"
                  size={125}
                  color="gray"
                  alignContent="center"
                />
      </View>
      <Text style={styles.txt}>Forgot your Password?</Text>
      <Text style={styles.txt1}>Enter your email below to reset your password</Text>
      <View style={styles.con}>
      <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Email"
          placeholder="Write Your Email"
          left={<TextInput.Icon icon="email" />}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      <Button styling={styles.buttonStyle} onPress={() => forgetPassword()}>Send</Button>
      {Isloading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
            </View>
          )}
    </View>
    <StatusBar />
    </View>
  );
};
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  con: {
    marginHorizontal: wp('4%'),
  },
  inputStyle: {
    marginTop: hp('6%'),
    borderColor: '#ccc',
    borderRadius: 5,
    width: wp('92%'),
  },
  buttonStyle: {
    width: wp('92%'),
    marginTop: hp('3%'),
  },
  lock: {
    marginHorizontal: wp('30%'),
    alignItems: 'center',
    marginTop: hp('7%'),
    width: wp('40%'),
    height: wp('40%'),
    backgroundColor: 'white',
    borderWidth: wp('1%'),
    borderColor: 'gray',
    borderRadius: 10,
  },
  logo: {
    marginTop: hp('1%'),
  },
  txt: {
    marginTop: hp('4%'),
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  txt1: {
    marginTop: hp('2%'),
    marginLeft: wp('8%'),
    fontSize: wp('4%'),
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ForgetPassword;