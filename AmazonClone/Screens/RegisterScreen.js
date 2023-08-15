import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [Pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const [shwPwd, setShwPwd] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: username,
      email: email,
      password: Pwd,
    };
    //send a post request to the backend API
    axios
      .post("http://192.168.0.105:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration succesfull",
          "You have registered successfully"
        );
        setUsername(""), setEmail(""), setPwd("");
      })
      .catch((error) => {
        console.log("registeration failed", error.response);
        Alert.alert(
          "Registration Error",
          "An error ouccured during registration"
        );
        if (error.response) {
          console.log("Response Data:", error.response.data);
          console.log("Response Status:", error.response.status);
        } else if (error.request) {
          console.log("No Response Received:", error.request);
        } else {
          console.log("Error Message:", error.message); // Log the error message
        }

        console.log("Request Config:", error.config);

        Alert.alert(
          "Registration Error",
          "An error occurred during registration"
        );
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
          <Text style={styles.text}>Register to your Account</Text>
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
            <Ionicons
              style={{ marginLeft: 8 }}
              name="person"
              size={24}
              color="gray"
            />
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={{
                color: "gray",
                marginVertical: 5,
                width: 220,
                marginLeft: 10,
                fontSize: username ? 16 : 16,
              }}
              placeholder="enter your name"
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
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

        <View style={{ marginTop: 20 }}>
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
          onPress={handleRegister}
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
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack("Login")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 50,
  },
});
