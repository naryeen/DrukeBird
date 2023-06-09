import React, { useState } from "react";
import { ActivityIndicator, MD2Colors, TextInput } from "react-native-paper";
import {StyleSheet,View,Text,ScrollView,Dimensions,SafeAreaView,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";
import axios from "axios";
import Toast from "react-native-root-toast";
import countryOptions from "../Components/Country";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { postSignup } from "../Api/Api";

const SignUp = () => {
  const navigation = useNavigation();
  const [DoB, setDoB] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [Isloading, setIsLoading] = useState(false);

  const windowDimensions = Dimensions.get("window");
  const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

  const register = () => {
    let user = {
      dob: DoB,
      country: country,
      profession: profession,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    setIsLoading(true);
    axios
      .post(postSignup, user)
      .then((res) => {
        if (res.data.status == "success") {
          Toast.show("Successfully Created Your Account", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          setTimeout(() => {
            navigation.navigate("Login");
          }, 200);
        }
      })
      .catch((err) => {
        JSON.stringify(err);
        let message =
          typeof err.response !== "undefined"
            ? err.response.data.message
            : err.message;
        Toast.show(message, { duration: Toast.durations.SHORT });
      })
      .finally(() => setIsLoading(false));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
  
    if (date !== undefined) {
      const currentDate = new Date(); // Get the current date
      if (date <= currentDate) {
        setDoB(date);
      }
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      borderColor: "#ccc",
      borderRadius: 5,
    },
    loginText: {
      color: "#2437E4",
    },
    buttonstyle: {
      backgroundColor: "#136D66",
      marginTop: 30,
      width: "100%",
    },
    datePickerContainer: {
      position: "relative",
    },
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center"
    },
    scrollViewContainer: {
      marginTop: 20,
    },

    dropdown1BtnStyle: {
      width: "100%",
      backgroundColor: "#FFF",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    dropdown1BtnTxtStyle: { textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Create Account</Text>
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
            value={
              DoB
                ? DoB.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                : ""
            }
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

        <SafeAreaView>
          <View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <SelectDropdown
                data={countryOptions}
                onSelect={(selectedItem) => {
                  setCountry(selectedItem);
                }}
                defaultButtonText={"Select country"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
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
              icon={passwordVisible ? "eye" : "eye"}
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
          placeholder="Write Your Password Again"
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye"}
              onPress={togglePasswordVisibility}
            />
          }
          onChangeText={(text) => setPasswordConfirm(text)}
          value={passwordConfirm}
        />
        <Button styling={styles.buttonstyle} onPress={() => register()}>
          Create Account
        </Button>
        {Isloading && (
          <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
      )}
      </ScrollView>
    </View>
  );
};
export default SignUp;