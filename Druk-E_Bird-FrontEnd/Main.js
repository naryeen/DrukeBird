import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './Screens/MainTabScreen';
import { DrawerContent } from './Screens/DrawerContent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckList from './Screens/CheckListScreen';


const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const headerHeight = Platform.OS === 'ios' ? hp("11.5%") : null;
  const headerShadow = Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      }
    : { elevation: 10 };
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerTitle: 'DrukeBird',
        headerTitleAlign: 'center',
        headerTintColor: '#136D66',
        headerTitleStyle: {
          fontSize: 25,
        },
        headerStyle: {
          height: headerHeight !== null ? headerHeight : undefined,
          ...headerShadow,
        },
      }}
    >
      <Drawer.Screen name="DrukeBird" component={MainTabScreen}/>
      <Drawer.Screen name="CheckList" component={CheckList}/>

    </Drawer.Navigator>
  );
};

export default MyDrawer;