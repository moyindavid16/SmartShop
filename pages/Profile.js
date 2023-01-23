import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {SafeAreaView, Text, View, Image, Pressable, StyleSheet, Alert, Share} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../utils/AuthContext";

export default function Profile() {
  const navigation = useNavigation()
  const {setUser} = useContext(AuthContext)

  const handleShare = async() => {
    try {
      const result = await Share.share({
        message:
          "Here's the new Ebeano app. Try it and share with friends!!!",
      });
      
    } catch (error) {
      Alert.alert(error.message);
    }    
  }

  return (
    <SafeAreaView style={{height: "100%", backgroundColor: "white"}}>
      <View style={{height: "35%", justifyContent: "flex-end"}}>
        <Image source={require("../assets/ebeano.png")} style={{width: "70%", height: "100%", alignSelf: "center"}} />
      </View>

      <View style={{height: "65%", justifyContent: "space-around"}}>
        <Text style={{alignSelf: "center", fontSize: 30, fontWeight: "300"}}>Welcome Moyin!</Text>

        <Pressable style={styles.menuItem} onPress={()=>navigation.navigate("Orders")} >
          <FontAwesome5 name={"clipboard-list"} size={30} style={{color: "orange"}} />
          <Text style={{width: "78%"}}>Track your orders</Text>
          <FontAwesome5 name={"chevron-right"} size={15} style={{color: "lightgrey"}} />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <FontAwesome5 name={"user-edit"} size={30} style={{color: "orange"}} />
          <Text style={{width: "78%"}}>Personal Details</Text>
          <FontAwesome5 name={"chevron-right"} size={15} style={{color: "lightgrey"}} />
        </Pressable>
        <Pressable style={styles.menuItem} onPress={()=>handleShare()}>
          <FontAwesome5 name={"share"} size={30} style={{color: "orange"}} />
          <Text style={{width: "78%"}}>Share</Text>
          <FontAwesome5 name={"chevron-right"} size={15} style={{color: "lightgrey"}} />
        </Pressable>
        <Pressable style={styles.menuItem} onPress={()=>navigation.navigate("Help")}>
          <FontAwesome5 name={"question"} size={30} style={{color: "orange"}} />
          <Text style={{width: "78%"}}>Need help?</Text>
          <FontAwesome5 name={"chevron-right"} size={15} style={{color: "lightgrey"}} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <FontAwesome5 name={"users"} size={30} style={{color: "orange"}} />
          <Text style={{width: "78%"}}>About Us</Text>
          <FontAwesome5 name={"chevron-right"} size={15} style={{color: "lightgrey"}} />
        </Pressable>
        <Pressable style={styles.menuItem} onPress={()=>setUser(null)}>
          <FontAwesome5 name={"sign-out-alt"} size={30} style={{color: "red"}} />
          <Text style={{width: "82%", color: "red"}}>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    width: "100%",
    height: "13%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
