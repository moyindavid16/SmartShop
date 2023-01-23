import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Stack = createNativeStackNavigator();

export default function AuthStack(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"SignIn"}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};