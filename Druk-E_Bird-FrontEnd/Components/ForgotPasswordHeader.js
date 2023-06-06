import React from "react";
import { View, Text, TouchableOpacity, StatusBar, Platform, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ForgotPasswordHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Ionicons name="chevron-back" size={28} color="#136D66" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
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
    paddingHorizontal: wp('2.78%'), 
    textAlign:'center'
  },
});
export default ForgotPasswordHeader;