import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ConfirmationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  useEffect(() => {
    fetchAddress();
  }, []);
  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.106:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedAddress, setSelectedAddress] = useState("");
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");
  const steps = [
    { title: "Address", content: "address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 1, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                  {step.title}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>
          <Pressable>
            {addresses.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  gap: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 17,
                  marginVertical: 7,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={24}
                    color="black"
                  />
                )}

                <View style={{ marginLeft: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={18} color="red" />
                  </View>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.street}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    India,Banglore
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Phone no:{item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Pincode:{item?.pincode}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>
                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#008397",
                          padding: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                          borderRadius: 20,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "white" }}>
                          Deliver to this address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Choose your delivery Options
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 0.7,
              margin: 10,
            }}
          >
            {options ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setOptions(true)}
                name="circle"
                size={24}
                color="black"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "600" }}>
                Tomorrow by 10pm
              </Text>
              <Text> - Free delivery with your Prime membership</Text>
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select Your Payment Method
          </Text>
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              borderColor: "#D0D0D0",
              borderWidth: 0.7,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {selectedOptions == "cash" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOptions("cash")}
                name="circle"
                size={16}
                color="black"
              />
            )}

            <Text style={{ fontSize: 15 }}>Cash on Delivery</Text>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              borderColor: "#D0D0D0",
              borderWidth: 0.7,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {selectedOptions == "card" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOptions("cash")}
                name="circle"
                size={16}
                color="black"
              />
            )}
           
            <Text style={{ fontSize: 15 }}>UPI/Credit or debit card</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 3 && selectedOptions == "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.7,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Save 5% and never runout
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                turn on auto deliveries
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{}}>shipping To {selectedAddress.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>Items</Text>
              <Text style={{ color: "gray", fontSize: 15 }}>₹ {total}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>Delivery</Text>
              <Text style={{ color: "gray", fontSize: 15 }}>₹ 0</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                OrderTotal
              </Text>
              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                ₹ {total}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: 16, fontWeight: "400", color: "gray" }}>
              Pay with
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 7 }}>
              Pay on delivery(Cash)
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Place Your Order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
