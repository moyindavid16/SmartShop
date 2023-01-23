import {NavigationContainer} from "@react-navigation/native";
import {createContext, useContext, useState} from "react";
import {SafeAreaView} from "react-native";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";

import {AuthContext, AuthContextProvider} from "./utils/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
}

const RootNavigator = () => {
  const {user} = useContext(AuthContext);
  return <NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};
