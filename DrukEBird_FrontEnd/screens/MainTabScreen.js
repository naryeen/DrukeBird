import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import StartBirdingScreen from './StartBirdingScreen';
import ExploreScreen from './ExploreScreen';
import CheckListScreen from './CheckListScreen';

const HomeStack = createStackNavigator();
const StartBirdingStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const color = 'white';


const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor='red'
        inactiveColor="white"
        activeBackgroundColor="#009387"
        inactiveBackgroundColor="#009387"
        // activeColor="#136d66" style={styles.container}
        style={{ backgroundColor: '#009387' }}

        tabBarOptions={{
            style: {
                backgroundColor: '#009387',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                position: "absolute",
                bottom: 0,
            },
        }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="home" size={29} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="StartBirding"
            component={StartBirdingScreen}
            options={{
                tabBarLabel: 'StartBirding',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="filter-9-plus" size={24} color="black" />
                ),
            }}
        />
        <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
                tabBarLabel: 'Explore',
                tabBarColor: '#136d66',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="pluscircleo" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="CheckList"
            component={CheckListScreen}
            options={{
                tabBarLabel: 'CheckList',
                tabBarColor: '#136d66',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="list-alt" size={24} color="black" />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title: 'Druk eBird',
            headerLeft: () => (
                <Icon.Button name="home" size={25}
                    backgroundColor="#009387" onPress={() =>
                        navigation.openDrawer()
                    }></Icon.Button>
            )
        }} />
    </HomeStack.Navigator >
);
const StartBirdingStackScreen = ({ navigation }) => (
    <StartBirdingStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#fff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <StartBirdingStack.Screen name="StartBirding" component={StartBirdingScreen} options={{
            headerLeft: () => (
                <Icon.Button name="home" size={25}
                    backgroundColor="#1f65ff" onPress={() =>
                        navigation.openDrawer()
                    }></Icon.Button>
            )

        }} />
    </StartBirdingStack.Navigator >
);

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#009387'
//     },

// });
