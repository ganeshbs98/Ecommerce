import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigatore from "./StackNavigatore";
import { Provider } from "react-redux";
import store from "./store";
import { ModalPortal } from "react-native-modals";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigatore />
        <ModalPortal />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
