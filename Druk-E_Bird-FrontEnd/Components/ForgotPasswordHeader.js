import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordHeader = ({title}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.Headercontainer}>
      <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
        <Icon name="arrow-left" size={20} color="#136D66" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = {
  Headercontainer: {
    flexDirection: "row",
    height: 60,
    padding: 16,
    borderRadius: 1,
    elevation: 2,
  },
  title: {
    color: "#136D66",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft:"30%",
  },
};

export default ForgotPasswordHeader;