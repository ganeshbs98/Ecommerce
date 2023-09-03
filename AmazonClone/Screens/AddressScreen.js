import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const AddressScreen = () => {
    const[name,setName]=useState("")
    const[mobileNo,setMobileNo]=useState("")
    const[houseNo,setHouseNo]=useState("")
    const[street,setStreet]=useState("")
    const[landmark,setLandmark]=useState("")
    const[pincode,setPincode]=useState("x")
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          Add a new Address
        </Text>
        <TextInput
        
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: "#D0D0D0",
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 6 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Full name (First and Last name)
          </Text>
          <TextInput
          value={name}
          onChangeText={(text)=>setName(text)}
            placeholderTextColor={"black"}
            placeholder="enter your name"
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 6 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Mobile Number
          </Text>
          <TextInput
          value={mobileNo}
          onChangeText={(text)=>setMobileNo(text)}
            placeholderTextColor={"black"}
            placeholder="enter your mobile number"
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 6 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Flat,House No,Building,Company
          </Text>
          <TextInput
          value={houseNo}
          onChangeText={(text)=>setHouseNo(text)}
            placeholderTextColor={"black"}
            placeholder=""
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 6 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Area,Street,sector,Village
          </Text>
          <TextInput
          value={street}
          onChangeText={(text)=>setStreet(text)}
            placeholderTextColor={"black"}
            placeholder=""
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 6 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Landmark</Text>
          <TextInput
          value={landmark}
          onChangeText={(text)=>setLandmark(text)}
            placeholderTextColor={"black"}
            placeholder="Eg near handpost"
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 6 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Pincode</Text>
          <TextInput
          value={pincode}
          onChangeText={(text)=>setPincode(text)}
            placeholderTextColor={"black"}
            placeholder="Enter Pincode"
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <Pressable
          style={{
            backgroundColor: "#FFC72C",
            padding: 17,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginVertical:20
          }}
        >
          <Text style={{fontWeight:'bold'}}>Add address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
