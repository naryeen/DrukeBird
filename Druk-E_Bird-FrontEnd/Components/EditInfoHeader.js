import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const EditInfoHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack('MainScreen')}>
        <Ionicons name="chevron-back" size={26} color="#136D66" />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp('7.5%'), 
    paddingHorizontal: wp('5%'), 
    borderRadius: wp('0.278%'), 
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp('0.13%') }, 
        shadowOpacity: 0.2,
        shadowRadius: wp('0.278%'), 
      },
      android: {
        elevation: 2,
      },
    }),
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    color: "#136D66",
    fontWeight: "600",
    fontSize: wp('6%'), 
    marginHorizontal: wp('26%'), 
  },
});

export default EditInfoHeader;