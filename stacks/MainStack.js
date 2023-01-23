import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../pages/Cart";
import Favourites from "../pages/Favourites";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import {CartContextProvider} from "../utils/CartContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

export default function MainStack() {
  return (
    <CartContextProvider>
      <Tab.Navigator initialRouteName={"Home"}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="My cart" component={Cart} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Favourites" component={Favourites} />
        <Tab.Screen name="Profile" component={ProfileNav} options={{headerShown: false}}/>
      </Tab.Navigator>
    </CartContextProvider>
  );
}

const ProfileNav = () => {
  return(
    <Stack.Navigator screenOptions={{headerBackTitleVisible: false, headerTintColor: "orange"}} initialRouteName={"ProfilePage"}>
      <Stack.Screen name="ProfilePage" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  )
}