import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducers";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const height = (width * 100) / 100;
  const [addedtoCart, setAddedToCart] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const AddItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}
    >
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            backgroundColor: "white",
            gap: 10,
            height: 38,
            flex: 1,
            borderRadius: 4,
          }}
        >
          <EvilIcons
            style={{ marginLeft: 5 }}
            name="search"
            size={30}
            color="black"
          />
          <TextInput style={{}} placeholder="search amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages?.map((item, index) => (
          <ImageBackground
            style={{ height, width, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "#C60C30",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 12,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  20% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                backgroundColor: "#E0E0E0",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 10 }}>
          ₹ {route?.params?.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderWidth: 1, borderColor: "#D0D0D0" }} />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color : </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size : </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>
      <Text style={{ height: 1, borderWidth: 1, borderColor: "#D0D0D0" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total : ₹ {route?.params?.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
            gap: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Deliver to Ganesh - Boppnahalli 571114
          </Text>
        </View>
      </View>
      <Text style={{ marginHorizontal: 10, color: "green", fontWeight: "500" }}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => AddItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          borderRadius: 20,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedtoCart ? (
          <Text>
            Added to Cart{" "}
            {cart?.filter((item1) => item1.id === route.params.id)[0]?.quantity}
          </Text>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          borderRadius: 20,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
