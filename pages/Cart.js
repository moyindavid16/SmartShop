import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useHeaderHeight} from "@react-navigation/elements";
import {useContext, useState, useEffect} from "react";
import {Dimensions, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {CartContext} from "../utils/CartContext";
import {formatCurrency, getSupportedCurrencies} from "react-native-format-currency";

export default function Cart() {
  const {cartItems} = useContext(CartContext);
  const windowHeight = Dimensions.get("window").height;
  const headerHeight = useHeaderHeight();
  const tabHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={cartItems}
          renderItem={({item}) => <ListItem item={item} />}
          contentContainerStyle={{backgroundColor: "#f7f8fa"}}
        />
      </View>
      <View style={{flex: 0}}>
        <ListFooter />
      </View>
    </SafeAreaView>
  );
}

const ListItem = ({item}) => {
  const {cartItems, setCartItems} = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const amount = parseInt(item.price.slice(1).replaceAll(",", "") * quantity);
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({amount: amount, code: "USD"});
  const calculatedPrice = "₦" + valueFormattedWithoutSymbol;

  const handleRemoveCartItem = name => {
    console.log("yes");
    const newCart = cartItems.filter(item => item.name != name);
    setCartItems(newCart);
  };

  useEffect(() => {
    const update = () => {
      const newCart = cartItems.filter(product => item.name != product.name);
      newCart.push({...item, quantity: quantity});
      setCartItems(newCart);
    };

    return update();
  }, [quantity]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <Image source={{uri: item.imageUrl}} style={{height: 100, width: 100}} />
        <View style={{paddingLeft: 10, justifyContent: "space-evenly"}}>
          <Text style={{flexWrap: "wrap", fontSize: 17}}>
            {quantity}x {item.name}
          </Text>
          <Text style={{fontSize: 17, fontWeight: "bold"}}>{calculatedPrice}</Text>
          <Text style={{fontSize: 17}}>In Stock</Text>

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "52%"}}>
            <Pressable
              style={({pressed}) => [styles.quantityButton, {backgroundColor: !pressed ? "#bbbbbb" : "orange"}]}
              onPress={() => {
                let c = Math.max(quantity - 1, 1);
                setQuantity(c);
              }}
            >
              <Text style={{color: "white", fontWeight: "bold", fontSize: 18}}>-</Text>
            </Pressable>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              textAlign="center"
              keyboardType="numeric"
              onChangeText={q => {
                setQuantity(q);
              }}
            />
            <Pressable
              style={({pressed}) => [styles.quantityButton, {backgroundColor: !pressed ? "#bbbbbb" : "orange"}]}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{flex: 1}} />
      <Pressable style={styles.removeButton} onPress={() => handleRemoveCartItem(item.name)}>
        <Image source={require("../assets/icons8-trash-can-50.png")} style={{height: 30, width: 30}} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "96%",
    height: 125,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  removeButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 3,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#bbbbbb",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  quantityInput: {
    width: 28,
    height: 23,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
  },
});

const ListFooter = () => {
  const {cartItems, setCartItems} = useContext(CartContext);
  var subtotal = 0, tax=0, delivery = 500
  cartItems.forEach(item => {
    var amount = parseInt(item.price.slice(1).replaceAll(",", "") * item.quantity);
    subtotal+=amount
    
  });
  const changeToCurrency = (num) => {
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({
      amount: num,
      code: "USD",
    });
    return "₦" + valueFormattedWithoutSymbol
  }
  const formattedSubtotal = changeToCurrency(subtotal)
  tax=subtotal* 75 / 1000
  var formattedTax= changeToCurrency(tax), formattedDelivery = changeToCurrency(delivery)
  var total = subtotal + tax + delivery, formattedTotal = changeToCurrency(total)

  return (
    <View style={{backgroundColor: "white"}}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={footerstyles.orderText}>Subtotal</Text>
        <View style={{flex: 1}} />
        <Text style={footerstyles.orderText}>{formattedSubtotal}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={footerstyles.orderText}>Tax</Text>
        <View style={{flex: 1}} />
        <Text style={footerstyles.orderText}>{formattedTax}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={footerstyles.orderText}>Delivery</Text>
        <View style={{flex: 1}} />
        <Text style={footerstyles.orderText}>{formattedDelivery}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={footerstyles.orderText}>Total</Text>
        <View style={{flex: 1}} />
        <Text style={footerstyles.orderText}>{formattedTotal}</Text>
      </View>

      <Pressable style={footerstyles.payButton}>
        <Text style={{color: "white"}}>Pay</Text>
      </Pressable>
    </View>
  );
};

const footerstyles = StyleSheet.create({
  orderText: {
    fontSize: 18,
    fontWeight: "300",
    padding: 15,
    paddingBottom: 2,
  },
  payButton: {
    width: "90%",
    height: 40,
    marginVertical: 15,
    backgroundColor: "orange",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
