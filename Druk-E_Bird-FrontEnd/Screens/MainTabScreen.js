import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import StartBirdingScreen from './StartBirdingScreen';
import ExploreScreen from './ExploreScreen';
import CheckListScreen from './CheckListScreen';
import NotificationScreen from './NotificationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{headerShown:false, 
        tabBarActiveTintColor:"#FFCED7",
        tabBarInactiveTintColor:"white",  
        tabBarStyle: {backgroundColor:"#136D66"}}}>   
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{tabBarLabel: 'Home',
            activeColor:'green',
            tabBarColor:'green',
            tabBarIcon: () => (<FontAwesome5 name="home" size={29} color="white" />),}}/>
        <Tab.Screen
            name="StartBirding"
            component={StartBirdingScreen}
            options={{tabBarLabel: 'StartBirding',tabBarColor: 'red',
            tabBarIcon: () => (<MaterialIcons name="filter-9-plus" size={29} color="white" />),}}/>
        <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{tabBarLabel: 'Explore',tabBarColor: '#136d66',
                tabBarIcon: () => (<AntDesign name="pluscircleo" size={29} color="white" />),}}/>
        <Tab.Screen
            name="CheckList"
            component={CheckListScreen}
            options={{tabBarLabel: 'CheckList',tabBarColor: '#136d66',
            tabBarIcon: () => (<FontAwesome name="list-alt" size={29} color="white" />),}}/>

        <Tab.Screen
            name="Notification"
            component={NotificationScreen}
            options={{tabBarLabel: 'Notification',tabBarColor: '#136d66',
            tabBarIcon: () => (<Ionicons name="notifications" size={29} color="white" />),}}/>
    </Tab.Navigator>
);

export default MainTabScreen;


