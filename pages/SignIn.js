import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { AuthContext } from "../utils/AuthContext";
import { auth } from "../config/firebase";

auth.languageCode = "it";

export default function SignIn() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState()
  const {setUser} = useContext(AuthContext)

  const handleLogin = () => {
    setUser("moyin")
  }

  return (
    <ScrollView style={{flex: 1, height: "100%"}}>
      <View style={styles.container}>
        
        <View style={styles.imageContainer}>
          <Image source={require("../assets/SignInImage1.jpg")} style={styles.image} />
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.titleText}>Welcome Back</Text>
          <Text style={{color: "#bbbbbb"}}>Login to your account</Text>
          <View style={styles.inputContainer}>
            <PhoneInput
              placeholder="Mobile Number"
              containerStyle={styles.input}
              textContainerStyle={{backgroundColor: ""}}
              flagButtonStyle={{marginHorizontal: -10}}
              defaultCode="NG"
              value={phoneNumber}
              onChangeText={(num)=>setPhoneNumber(num)}
            />
            <TextInput placeholder="Passcode" style={styles.input} />
          </View>
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable>
            <Text style={{color: "grey"}}>Forgot your passcode?</Text>
          </Pressable>
          <View style={styles.signUpContainer}>
            <Text style={{color: "#bbbbbb"}}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
  },
  imageContainer: {
    height: "40%",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  signInContainer: {
    height: "62.5%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: "-5%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
    height: "45%",
    backgroundColor: "#f1f1f3",
    color: "black",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "orange",
    width: "80%",
    height: "11%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
  signUpContainer: {
    flexDirection: "row",
  },
  signUpText: {
    color: "orange",
    fontWeight: "bold",
  },
});
