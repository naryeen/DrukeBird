import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = ({ title, stylings}) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.Headercontainer,stylings]}>
      <TouchableOpacity onPress={() => navigation.replace('MainScreen')}>
        <Icon name="arrow-left" size={20} color="#136D66" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = {
  Headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    padding: 16,
    borderRadius: 1,
    elevation: 2,
    marginTop:30

  },
  title: {
    color: "#136D66",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 140,
  },
};

export default NavigationHeader;