import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AddAddressScreen = () => {
    const navigation=useNavigation()
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
        <Pressable onPress={()=> navigation.navigate("Address")}
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
          }}
        >
          <Text>Add a New Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
            {/* all the added address */}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
