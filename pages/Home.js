import {collection, getDocs} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {db} from "../config/firebase";
import {CartContext} from "../utils/CartContext";
import DropDownPicker from "react-native-dropdown-picker";

const data = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 81},
  {id: 28},
  {id: 18},
  {id: 48},
];

export default function Home() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      var products = [];
      productsSnapshot.forEach(product => products.push(product.data()));
      setProductsData(products);
      //console.log(products)
    };

    getProducts();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={productsData}
        renderItem={({item}) => <CatalogueItem product={item} />}
        ListHeaderComponent={
          <View style={styles.searchBarContainer}>
            <Image source={require("../assets/svg-search-icon-15.jpg")} style={styles.searchIcon} />
            <ScrollView scrollEnabled={false}>
              <TextInput placeholder="Search Products" style={{width: "91%"}} />
            </ScrollView>
          </View>
        }
        ListHeaderComponentStyle={{height: 55, backgroundColor: "white"}}
        stickyHeaderIndices={[0]}
        numColumns={2}
        contentContainerStyle={{backgroundColor: "white"}}
      />
    </SafeAreaView>
  );
}

const CatalogueItem = ({product}) => {
  const {cartItems, setCartItems} = useContext(CartContext);

  const handleAddToCart = product => {
    const newCart = cartItems.filter(item => item.name != product.name);
    newCart.push({...product, quantity: quantity});
    setCartItems(newCart);
    console.log(cartItems);
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.catalogueItem}>
      <View style={styles.catalogueImageContainer}>
        <Image source={{uri: product.imageUrl}} style={styles.catalogueItemImage} />
      </View>
      <Text>{product.name}</Text>
      <View style={{flexDirection: "row", flexWrap: "wrap", width: "120%"}}>
        <Text>{product.price}</Text>
      </View>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "115%"}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "57%"}}>
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

        <Pressable
          style={({pressed}) => [styles.addToCart, {backgroundColor: pressed ? "#bbbbbb" : "orange"}]}
          onPress={() => handleAddToCart(product)}
        >
          <Text style={{color: "white", fontWeight: "bold", fontSize: 10}}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  searchBarContainer: {
    height: "90%",
    flexDirection: "row",
    borderRadius: 30,
    borderColor: "lightgrey",
    borderWidth: 2,
    alignItems: "center",
  },
  searchIcon: {
    height: "60%",
    width: "9%",
    marginHorizontal: 10,
  },
  catalogueContainer: {
    backgroundColor: "green",
    alignItems: "center",
    height: "89%",
  },
  catalogueItem: {
    width: "40%",
    height: 200,
    minHeight: 160,
    backgroundColor: "white",
    marginHorizontal: "4%",
    marginVertical: "3%",
  },
  catalogueItemImage: {
    height: "85%",
    width: "70%",
  },
  catalogueImageContainer: {
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 0,
    height: 135,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 27,
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
  addToCart: {
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 4,
    height: 23,
  },
});
