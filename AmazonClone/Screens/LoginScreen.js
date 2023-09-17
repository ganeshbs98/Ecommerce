import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [Pwd, setPwd] = useState("");
  const [shwPwd, setShwPwd] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    const ChkLoginStatus=async()=>{
      try{
        console.log("token");
        const token=await AsyncStorage.getItem("authtoken");
        console.log("token-"+token);
        if(token){
          navigation.replace("Main")
        }
      }catch(error){
        console.log("error message",error)
      }
    }
    ChkLoginStatus();
  },[])

  const handlerlogin = () => {
    const user = {
      email: email,
      password: Pwd,
    };
    axios
      .post("http://192.168.0.106:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authtoken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <View>
        <Image
          style={styles.ImageContainer}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View>
          <Text style={styles.text}>Login In to your Account</Text>
        </View>

        <View style={styles.loginContainer}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#D0D0D0",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 6,
            }}
          >
            <MaterialCommunityIcons
              style={{ marginLeft: 5 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 5,
                width: 220,
                marginLeft: 10,
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#D0D0D0",
              alignItems: "center",
              padding: 5,
              borderRadius: 6,
              alignItems: "center",
            }}
          >
            <AntDesign
              style={{ marginLeft: 5 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={Pwd}
              onChangeText={(text) => setPwd(text)}
              secureTextEntry={shwPwd}
              style={{
                color: "gray",
                marginVertical: 5,
                width: 220,
                marginLeft: 10,
                fontSize: Pwd ? 16 : 16,
              }}
              placeholder="enter your Password"
            />
            <Pressable onPress={() => setShwPwd(!shwPwd)}>
              <Entypo
                style={{ marginRight: 8 }}
                name={shwPwd ? "eye-with-line" : "eye"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            Keep me Logged in
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#007FFF" }}>
            Forgot Password
          </Text>
        </View>
        <View style={{ marginTop: 70 }} />
        <Pressable
          onPress={handlerlogin}
          style={{
            width: 150,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  ImageContainer: {
    width: 150,
    height: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  loginContainer: {
    marginTop: 70,
  },
});
