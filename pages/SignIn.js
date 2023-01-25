import {useNavigation} from "@react-navigation/native";
import {useContext, useRef, useState} from "react";
import {Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import {AuthContext} from "../utils/AuthContext";
import firebase from "firebase/compat/app";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {firebaseConfig} from "../config/firebase";

export default function SignIn() {
  const navigation = useNavigation();
  const {setUser} = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState(1);
  const [verificationID, setVerificationID] = useState("");
  const recaptchaVerifier = useRef(null);
  const phoneRef = useRef(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const verificationIDRef = useRef()
  const codeRef = useRef()
  const phoneNumberText = useRef("");

  const sendVerification = () => {
    var formattedphoneNumber = "";
    for (let i = 0; i < 14; i++) {
      formattedphoneNumber += phoneNumberText.current[i];
      if (i == 3) formattedphoneNumber += " ";
      if (i == 7) formattedphoneNumber += "-";
      if (i == 10) formattedphoneNumber += "-";
    }

    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(formattedphoneNumber, recaptchaVerifier.current)
      .then(setVerificationID)
      .catch(err => console.log(err.message));
      setPhoneNumber("");
  };
  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationIDRef.current, codeRef.current);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        console.log("Successful");
        setUser(phoneNumberText.current)
      })
      .catch(error => {
        Alert.alert(error.message);
        console.log(error.message)
      });
  };
  const handleLogin = () => {
    setUser("moyin");
  };

  const [numberInputDisplay, setNumberInputDisplay] = useState(
    <>
      <PhoneInput
        ref={phoneRef}
        placeholder="Mobile Number"
        containerStyle={styles.input}
        textContainerStyle={{backgroundColor: ""}}
        flagButtonStyle={{marginHorizontal: -10}}
        defaultCode="NG"
        value={phoneNumber}
        onChangeFormattedText={text => {
          setPhoneNumber(text);
          phoneNumberText.current = text.toString();
        }}
      />
      <Text>{phoneNumber}</Text>
      <Pressable style={({pressed}) => [styles.loginButton, {backgroundColor: pressed ? "#bbbbbb" : "orange"}]} onPress={sendVerification}>
        <Text style={styles.loginButtonText}>Send Verification Code</Text>
      </Pressable>
    </>,
  );
  const [codeInputDisplay, setCodeInputDisplay] = useState(
    <>
      <TextInput
        placeholder="Verification Code"
        style={styles.input}
        value={code}
        onChangeText={text => {setCode(text); codeRef.current = text}}
      />
      <Pressable style={({pressed}) => [styles.loginButton, {backgroundColor: pressed ? "#bbbbbb" : "orange"}]} onPress={confirmCode}>
        <Text style={styles.loginButtonText}>Confirm Verification Code</Text>
      </Pressable>
    </>,
  );
    verificationIDRef.current=verificationID
  
  return (
    <ScrollView style={{flex: 1, height: "100%"}}>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />

        <View style={styles.imageContainer}>
          <Image source={require("../assets/SignInImage1.jpg")} style={styles.image} />
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.titleText}>Welcome Back</Text>
          <Text style={{color: "#bbbbbb"}}>Login to your account</Text>
          {verificationID ? codeInputDisplay : numberInputDisplay}
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
    height: "12%",
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
