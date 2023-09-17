import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import {
  EvilIcons,
  Feather,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  increamentQuantity,
  removeFromTheCart,
} from "../redux/CartReducers";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const incrementQuantity = (item) => {
    dispatch(increamentQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromTheCart(item));
  };
  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>
      <View>
        {/* {cart.length > 0}?( */}
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
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal :</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
        </View>
        <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>
        <Pressable
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: "#FFC72C",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 15,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Proceed to Buy ({cart.length}) items
          </Text>
        </Pressable>
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        />
        <View>
          {cart?.map((item, index) => (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#F0F0F0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
              key={index}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 140, height: 140, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                </View>
                <View>
                  <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}
                  >
                    ₹ {item?.price}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}>In Stock</Text>
                  {/* <Text>{item?.ratings}</Text> */}
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}
                >
                  {item.quantity > 1 ? (
                    <Pressable
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 5,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                      }}
                    >
                      <Feather name="minus" size={24} color="#4B9CD3" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 5,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                      }}
                    >
                      <MaterialIcons name="delete" size={26} color="#4B9CD3" />
                    </Pressable>
                  )}

                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}
                  >
                    <Text>{item?.quantity}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => incrementQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 5,
                      borderTopLeftRadius: 4,
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    <Feather name="plus" size={24} color="#4B9CD3" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Delete</Text>
                </Pressable>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                  marginHorizontal: 10,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Save for Later</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>See More Like This </Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
        {/* ):(
        <Text>Your cart is Empty</Text>
        ) */}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
