import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import RootNav from "./src/Navigation/RootNav";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/store";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);
export default function App() {
  const store = configureStore();
  return (
    <ReduxProvider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <RootNav />
    </ReduxProvider>
  );
}
