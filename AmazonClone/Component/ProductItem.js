import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducers";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  const [addedtoCart, setAddedToCart] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const addItemToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ProductInfo", 
          {
            title: item.title,
            id: item.id,
            carouselImages: [item.image],
            color:"blue",
            price: item.price,
            item:item,
        })
      }
      style={{ marginHorizontal: 20, marginVertical: 25 }}
    >
      <Image
        style={{ height: 150, width: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 20,
        }}
      >
        {addedtoCart ? (
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "400" }}
          >
            Added to Cart{" "}
            {cart?.filter((item1) => item1.id === item.id)[0].quantity}
          </Text>
        ) : (
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "400" }}
          >
            Add to Cart
          </Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
