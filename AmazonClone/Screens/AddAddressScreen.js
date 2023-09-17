import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { EvilIcons, Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
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
  //refresh the addresses whenthe component is focused ie basically when we navigate back
  useFocusEffect(
    useCallback(()=>{
      fetchAddress()
    },[])
  )
  return (
    <ScrollView style={{ marginTop: 50 }} showsVerticalScrollIndicator={false}>
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
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Your addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Address")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
            gap: 5,
          }}
        >
          <Text>Add a New Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 8,
                gap: 3,
                flexDirection: "column",
                marginVertical: 7,
                borderRadius:5,
              }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
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
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
