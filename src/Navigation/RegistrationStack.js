import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationForm from "../BusinessPanel/BusinessRegister/RegistrationForm";
import Thanku from "../BusinessPanel/BusinessRegister/Thanku";
const Stack = createStackNavigator();

export default function RegistrationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register Business"
        options={{
          headerShown: false,
        }}
        component={RegistrationForm}
      />
      <Stack.Screen
        name="Thank you"
        options={{
          headerShown: false,
        }}
        component={Thanku}
      />
    </Stack.Navigator>
  );
}
