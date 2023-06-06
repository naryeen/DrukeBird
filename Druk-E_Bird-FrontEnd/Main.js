import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './Screens/MainTabScreen';
import { DrawerContent } from './Screens/DrawerContent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerTitle: 'DrukeBird',
        headerTitleAlign: 'center',
        headerTintColor: '#136D66',
        headerTitleStyle: {
          fontSize: 25, // Increase the size of the header title
        },
      }}
    >
      <Drawer.Screen
        name="DrukeBird"
        component={MainTabScreen}
        options={{
          headerStyle: {
            height: hp("7.5%"), // Change the height of the header here
            elevation: 10, // Apply shadow on Android
            shadowColor: '#000', // Set shadow color on iOS
            shadowOffset: { width: 0, height: 2 }, // Set shadow offset on iOS
            shadowOpacity: 0.9, // Set shadow opacity on iOS
            shadowRadius: 3, // Set shadow radius on iOS
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;