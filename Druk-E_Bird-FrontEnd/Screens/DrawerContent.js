import React, { useContext } from "react";
import {View,StyleSheet,Alert,TouchableOpacity,Text,StatusBar} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";


const ICON_SIZE = 24; 

export function DrawerContent(props) {
  const navigation = useNavigation();
  const { logout, userInfo } = useContext(AuthContext);

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to exit?", [
      { text: "NO", style: "cancel" },
      { text: "YES", onPress: () => logout() },
    ]);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{ uri: userInfo.user.photo }}
              size={wp('30%')}
            />
            <View style={styles.userInfo}>
              <Title style={styles.title}>{userInfo.user.name}</Title>
              <Caption
                style={styles.caption}
                onPress={() => navigation.replace("MyProfile")}>
                View Profile
              </Caption>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-box-outline"
                  size={24}
                  color="white"
                />
              )}
              label="About"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate("About")}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  size={24}
                  color="white"
                />
              )}
              label="Unknown Verification"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate("UnknownVerification")}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="email-plus-outline"
                  size={24}
                  color="white"
                />
              )}
              label="Contact US"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate("ContactUs")}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={24}
                  color="white"
                />
              )}
              label="Help"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate("Help")}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.signOutContainer}
            >
              <MaterialIcons
                name="logout"
                size={24}
                color="white"
                style={styles.signOutIcon}
              />
              <Text style={styles.signOutText}>Log Out</Text>
            </TouchableOpacity>
          </Drawer.Section>
        </View>
        <StatusBar/>
      </DrawerContentScrollView>
    </View>
  );
}


import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#184e4a",
  },
  userInfoSection: {
    flex: 1,
    alignItems: "center",
    marginTop: hp('5%'),
  },
  userInfo: {
    marginTop: hp('2%'),
    alignSelf:'center'
  },
  title: {
    fontSize: wp('4%'), 
    fontWeight: "bold",
    color: "white",
    alignSelf:'center'

  },
  caption: {
    marginTop: wp('1%'), 
    fontSize: wp('3.5%'), 
    lineHeight: wp('3.5%'), 
    color: "white",
    textDecorationLine: "underline",
  },
  drawerSection: {
    marginTop: wp('8%'), 
  },
  drawerItemLabel: {
    color: "white",
    fontSize: wp('4%'), 
  },
  signOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp('8%'), 
  },
  signOutIcon: {
    marginLeft: wp('5%'), 
  },
  signOutText: {
    color: "white",
    marginLeft: wp('8.5%'), 
    fontSize: wp('4%'), 
  },
});