import React, { createContext, useEffect, useState } from "react";
import {ToastAndroid } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { postLogin } from "../Api/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState([]);


  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(postLogin, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status == "success") {
          ToastAndroid.show("LogIn Successfully", ToastAndroid.LONG);
        }
        let userInfo = res.data.data;
        let userToken = res.data.token;
        setUserInfo(userInfo);
        setUserToken(userToken);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userToken);
      })
      .catch(err=>{
        let message = 
                typeof err.response !=='undefined'
                ?err.response.data.message
                :err.message

         ToastAndroid.show(message, 
            ToastAndroid.SHORT);
      });
    setIsLoading(false);
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
      console.log(`isLogged in Error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
