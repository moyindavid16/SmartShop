import { useNavigation } from "@react-navigation/native";
import {useContext, useState} from "react";
import {Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {CartContext} from "../utils/CartContext";

export default function Checkout() {
  const navigation = useNavigation()
  const {cartItems, checkoutTotal, setCartItems, setCheckoutTotal} = useContext(CartContext);
  const [address, setAddress] = useState();
  const [modalVisible, setModalVisible] = useState(false)


  const handleSuccessfulPay = () => {
    setModalVisible(true)
  }
  const handleExit = () => {
    setCartItems([])
    setCheckoutTotal("₦0")
    setModalVisible(false)
  }

  return (
    <ScrollView style={{flex: 1, height: "100%"}} scrollEnabled={false} >
      <View style={{minHeight: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f8f8"}}>
        <View style={styles.itemContainer}>
          <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          >
            <View style={{height: "100%", width: "100%", justifyContent: "center", backgroundColor: "rgba(52, 52, 52, 0.6)"}}>
              <View style={[styles.itemContainer, {height: "69%", paddingLeft: 0, alignSelf: "center", justifyContent: "space-around", alignItems: "center"}]}>
                <FontAwesome5 name={"check-circle"} style={{color: "orange"}} size={140} />
                <View style={{alignItems: "center"}}><Text style={{fontSize: 27, fontWeight: "300",}}>Your purchase was</Text>
                <Text style={{fontSize: 27, fontWeight: "300",}}>successful</Text>
                </View>
                <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 19, fontWeight: "300",}}>You can track the deliveries</Text>
                <Text style={{fontSize: 19, fontWeight: "300",}}>in the "Orders" section</Text>
                </View>
                
                <Pressable style={({pressed}) => [styles.paymentBox, {backgroundColor: pressed ? "#bbbbbb" : "orange"}]} onPress={()=>{handleExit();navigation.navigate("Home")}}>
                  <Text style={{color: "white"}}>Continue Shopping</Text>
                </Pressable>
                <Pressable style={styles.paymentBox} onPress={()=>{handleExit();navigation.navigate("Orders")}}>
                  <Text style={{color: "white"}}>Go to Orders</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Text style={{fontWeight: "bold", fontSize: 16}}>Confirm payment of {checkoutTotal}</Text>
          <View style={{height: "30%", justifyContent: "space-around"}}>
            <Text style={{fontWeight: "300", fontSize: 16}}>Delivery Address</Text>
            <View>
              <TextInput
                placeholder="Enter your address"
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.box}
              />
            </View>
          </View>

          <View style={{height: "50%", justifyContent: "space-around"}}>
            <Text style={{fontWeight: "300", fontSize: 16}}>Payment method</Text>
            <Pressable style={styles.paymentBox}>
              <FontAwesome5 name={"credit-card"} size={24} style={{color: "white"}} />
              <View style={{flex: 3}} />
              <Text style={{color: "white"}}>Pay with Card</Text>
              <View style={{flex: 4}} />
            </Pressable>
            <Pressable style={({pressed}) => [styles.paymentBox, {backgroundColor: pressed ? "#bbbbbb" : "orange"}]} onPress={handleSuccessfulPay}>
              <FontAwesome5 name={"wallet"} size={24} style={{color: "white"}} />
              <View style={{flex: 3}} />
              <Text style={{color: "white"}}>Pay with Cash</Text>
              <View style={{flex: 4}} />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "78%",
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  box: {
    height: 60,
    width: "90%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    paddingLeft: 10,
  },
  paymentBox: {
    height: 60,
    width: "90%",
    backgroundColor: "orange",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    paddingLeft: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
