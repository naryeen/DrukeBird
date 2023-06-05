import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";

const { width, height } = Dimensions.get("window");
const ICON_SIZE = 24; // Set the desired size for all icons

export function DrawerContent(props) {
  const navigation = useNavigation();
  const { logout, userInfo } = useContext(AuthContext);

  const handleSignOut = () => {
    // Handle sign out logic here
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
              size={width * 0.30}
            />
            <View style={styles.userInfo}>
              <Title style={styles.title}>{userInfo.user.name}</Title>
              <Caption
                style={styles.caption}
                onPress={() => navigation.replace("MyProfile")}
              >
                View Profile
              </Caption>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-box-outline"
                  size={ICON_SIZE}
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
                  size={ICON_SIZE}
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
                  size={ICON_SIZE}
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
                  size={ICON_SIZE}
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
                size={ICON_SIZE}
                color="white"
                style={styles.signOutIcon}
              />
              <Text style={styles.signOutText}>Log Out</Text>
            </TouchableOpacity>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

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
    flexDirection: "column",
    marginTop: hp('1%')
  },
  title: {
    fontSize: width * 0.04,
    marginTop: width * 0.01,
    fontWeight: "bold",
    color: "white",
  },
  caption: {
    marginTop: width * 0.01,
    marginLeft: wp('7%'),
    fontSize: width * 0.035,
    lineHeight: width * 0.035,
    color: "white",
    textDecorationLine: "underline",
  },
  drawerSection: {
    marginTop: width * 0.13,
    width: wp('80%'),
  },
  drawerItemLabel: {
    color: "white",
    fontSize: width * 0.04,
  },
  signOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.08,
  },
  signOutIcon: {
    marginLeft: width * 0.05,
  },
  signOutText: {
    color: "white",
    marginLeft: width * 0.085,
    fontSize: width * 0.04,
  },
});