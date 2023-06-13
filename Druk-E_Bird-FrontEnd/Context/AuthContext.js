import React, { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { postLogin } from "../Api/Api";
import Toast from 'react-native-root-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(postLogin, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === "success") {
          Toast.show("LogIn Successfully", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER
          });
          setUserInfo(res.data.data);
          setUserToken(res.data.token);
          AsyncStorage.setItem("userInfo", JSON.stringify(res.data.data));
          AsyncStorage.setItem("userToken", res.data.token);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        let message =
          typeof err.response !== "undefined"
            ? err.response.data.message
            : err.message;
        Toast.show(message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
        setIsLoading(false);
      });
  };

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");

      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      Toast.show(e, { duration: Toast.durations.LONG, position: Toast.positions.CENTER });
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
