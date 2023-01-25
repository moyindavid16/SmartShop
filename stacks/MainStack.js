import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Favourites from "../pages/Favourites";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import {CartContextProvider} from "../utils/CartContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Pressable, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainStack() {
  const TabIcon = ({size, focused}, name) => {};
  const TabTitle = ({size, focused}) => {
    tabBarLabel: ({focused, title}) => {
      <Text style={{color: focused ? "orange" : "grey"}}>title</Text>;
    };
  };

  return (
    <CartContextProvider>
      <Tab.Navigator initialRouteName={"Home"}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({size, focused, color}) => (
              <FontAwesome5 name="home" size={size} color={focused ? "orange" : "grey"} />
            ),
            tabBarLabel: ({focused, size}) => (
              <Text style={{color: focused ? "orange" : "grey", fontSize: 11}}>Home</Text>
            ),
          }}
        />
        <Tab.Screen
          name="My cart"
          component={CartNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, focused, color}) => (
              <FontAwesome5 name="shopping-cart" size={size} color={focused ? "orange" : "grey"} />
            ),
            tabBarLabel: ({focused, size}) => (
              <Text style={{color: focused ? "orange" : "grey", fontSize: 11}}>My Cart</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({size, focused, color}) => (
              <FontAwesome5 name="clipboard-list" size={size} color={focused ? "orange" : "grey"} />
            ),
            tabBarLabel: ({focused, size}) => (
              <Text style={{color: focused ? "orange" : "grey", fontSize: 11}}>Orders</Text>
            ),
          }}
        />
        
        <Tab.Screen
          name="Profile"
          component={ProfileNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, focused, color}) => (
              <FontAwesome5 name="user" size={size} color={focused ? "orange" : "grey"} />
            ),
            tabBarLabel: ({focused, size}) => (
              <Text style={{color: focused ? "orange" : "grey", fontSize: 11}}>Profile</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </CartContextProvider>
  );
}

const ProfileNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerBackTitleVisible: false, headerTintColor: "grey"}}
      initialRouteName={"ProfilePage"}
    >
      <Stack.Screen name="ProfilePage" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};

const CartNav = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "grey",
        headerTitleStyle: {fontWeight: "300"},
        headerStyle: {height: 1000},
        headerLeft: () => (
          <Pressable onPress={() => navigation.navigate("CartPage")}>
            <FontAwesome5 name={"long-arrow-alt-left"} size={26} style={{color: "grey"}} />
          </Pressable>
        ),
      }}
      initialRouteName="CartPage"
    >
      <Stack.Screen name="CartPage" component={Cart} options={{headerShown: false}} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};
