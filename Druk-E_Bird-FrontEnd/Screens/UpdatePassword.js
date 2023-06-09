import React, { useState, useContext } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ActivityIndicator, MD2Colors, TextInput } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Toast from "react-native-root-toast";
import Button from "../Components/Button";
import UpdatePasswordHeader from "../Components/UpdatePasswordHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { postUpdatePassword } from "../Api/Api";


function validatePassword(newPassword, confirmPassword) {
  if (confirmPassword === "") {
    Toast.show("Please confirm your new password", {
      duration: Toast.durations.SHORT,
    });
    return false;
  }

  if (newPassword.length < 8) {
    Toast.show("Enter a password with more than 8 characters.", {
      duration: Toast.durations.SHORT,
    });
    return false;
  } else if (!/[a-z]/.test(newPassword)) {
    Toast.show("Enter at least one lowercase letter.", {
      duration: Toast.durations.SHORT,
    });
    return false;
  } else if (!/[A-Z]/.test(newPassword)) {
    Toast.show("Enter at least one uppercase letter.", {
      duration: Toast.durations.SHORT,
    });
    return false;
  } else if (!/\d/.test(newPassword)) {
    Toast.show("Enter at least one digit.", {
      duration: Toast.durations.SHORT,
    });
    return false;
  }

  return true;
}


const UpdatePassword = () => {
  const { userToken } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = () => {
    if (currentPassword === "") {
      Toast.show("Please enter your current password", {
        duration: Toast.durations.SHORT,
      });
      return;
    }
  
    if (newPassword === "") {
      Toast.show("Please enter your new password", {
        duration: Toast.durations.SHORT,
      });
      return;
    }
  
    if (confirmPassword === "") {
      Toast.show("Please confirm your new password", {
        duration: Toast.durations.SHORT,
      });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Toast.show("New password and confirm password do not match.", {
        duration: Toast.durations.SHORT
      });
      return;
    }
  
    if (!validatePassword(newPassword, confirmPassword)) {
      return;
    }
    const data = {
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    };
  
    setIsLoading(true);
    axios
      .patch(
        postUpdatePassword,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          Toast.show("Password updated successfully", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Toast.show("Your current password is incorrect", {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        } else if (err.response.status === 500) {
          Toast.show(
            "Your password should contain at least 1 capital letter, 1 small letter, and one number",
            {
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
            }
          );
        }
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
        <Button styling={styles.buttonstyle} onPress={handleUpdatePassword}>
          Update Password
        </Button>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color={'#136D66'}
              size="large"
            />
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
    marginTop: hp('5%'),
  },
  header: {
    alignItems: "center",
    marginHorizontal: wp('5%'),
  },
  buttonstyle: {
    backgroundColor: "#136D66",
    marginTop: hp('8%'),
    width: wp('90%'),
    alignSelf: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inputStyle: {
    marginTop: hp('2%'),
    borderColor: "#ccc",
    borderRadius: 5,
    width: wp('90%'),
  },
});
export default UpdatePassword;



