import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from "react-native-fast-toast";
import BottomTab from "../BusinessPanel/BottonTab";
import AuthStack from "./authStack";
import { useSelector } from "react-redux";
import RegistrationStack from "./RegistrationStack";
export default function RootNav() {
  const authToken = useSelector((state) => state.authToken.authToken);
  const LoginState = useSelector((state) => state.authToken.LoginState);

  return (
    <NavigationContainer>
      <ToastProvider>
        {authToken == "" ? (
          <AuthStack />
        ) : LoginState === "RegisterBusiness" ? (
          <RegistrationStack />
        ) : (
          <BottomTab />
        )}
      </ToastProvider>
    </NavigationContainer>
  );
}
