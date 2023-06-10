import HomeScreen from "./HomeScreen";
import StartBirdingScreen from "./StartBirdingScreen";
import ExploreScreen from "./ExploreScreen";
import CheckListScreen from "./CheckListScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#D3D3D3",
      tabBarInactiveTintColor: "white",
      tabBarStyle: { backgroundColor: "#136D66" },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name="home-outline" size={30} color="white" />
        ),
      }}
    />
    <Tab.Screen
      name="StartBirding"
      component={StartBirdingScreen}
      options={{
        tabBarLabel: "Birding",
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons
            name="sticker-plus-outline"
            size={29}
            color={focused ? color : "white"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons
            name="file-eye-outline"
            size={29}
            color={focused ? color : "white"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="CheckList"
      component={CheckListScreen}
      options={{
        tabBarLabel: "CheckList",
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={29}
            color={focused ? color : "white"}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;