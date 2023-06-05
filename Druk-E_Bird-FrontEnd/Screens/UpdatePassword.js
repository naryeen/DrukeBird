import React, { useState, useContext } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ActivityIndicator, MD2Colors, TextInput } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Toast from 'react-native-root-toast';
import Button from "../Components/Button";
import UpdatePasswordHeader from "../Components/UpdatePasswordHeader"


const UpdatePassword = () => {
  const { userToken } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = () => {
    const data = {
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    };

    if (newPassword === "") {
      Toast.show("Please enter your new password", { duration: Toast.durations.SHORT });

    }
    else if (confirmPassword === "") {
      Toast.show("Please enter confirm new password", { duration: Toast.durations.SHORT });

    }
    else if (currentPassword === "") {
      Toast.show("Please enter your current password", { duration: Toast.durations.SHORT });
    }
    // if (newPassword !== confirmPassword) {
    //   Toast.show("New password and confirm password do not match.", { duration: Toast.durations.SHORT });
    //   return;
    // }
    setIsLoading(true);
    axios
      .patch(
        "https://drukebird.onrender.com/api/v1/users/updateMyPassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          Toast.show("Password updated successfully", { duration: Toast.durations.SHORT, position: Toast.positions.CENTER });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((err) => {
        let message = err.response?.data?.message || err.message;
        console.log(message);
        Toast.show(message, { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
      })
    .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <UpdatePasswordHeader title={"Update Password"} />
      <View style={styles.container1}>
        <View style={styles.header}>
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            label="Current Password"
            placeholder="Enter Your Current Password"
            onChangeText={(text) => setCurrentPassword(text)}
            value={currentPassword}
          />
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            label="New Password"
            placeholder="Enter Your New Password"
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            label="Confirm New Password"
            placeholder="Enter Your New Password Again"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <Button styling={styles.buttonstyle} onPress={handleUpdatePassword}>Update Password</Button>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
          </View>
        )}
        <StatusBar />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  container1: {
    marginTop: 20

  },
  header: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  buttonstyle: {
    backgroundColor: '#136D66',
    marginTop: 30,
    width: "90%",
    alignSelf: "center"
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputStyle: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%"
  },
});

export default UpdatePassword;

