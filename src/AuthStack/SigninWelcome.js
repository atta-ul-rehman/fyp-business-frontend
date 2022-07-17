import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import { colors, parameters } from "../global/styles";
import { Button } from "react-native-elements";

export default function SigninWelcome({ navigation }) {
  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{ fontSize: 26, color: colors.buttons, fontWeight: "bold" }}
          >
            DISCOVER BUSINESS
          </Text>
          <Text
            style={{ fontSize: 26, color: colors.buttons, fontWeight: "bold" }}
          >
            IN YOUR AREA
          </Text>
        </View>

        <View style={{ paddingTop: 200, justifyContent: "center" }}>
          <View style={{ marginHorizontal: 20, marginTop: 0 }}>
            <Button
              title="SIGN-IN"
              buttonStyle={parameters.styledbutton}
              titleStyle={parameters.buttonTitle}
              onPress={() => {
                navigation.navigate("SignInScreen");
              }}
            />
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Button
              title="Register New Business"
              buttonStyle={styles.buttoncreate}
              titleStyle={styles.buttoncreatetitle}
              onPress={() => {
                navigation.navigate("SignUpScreen");
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  slide1: {
    fles: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9006EB",
  },
  slide2: {
    fles: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    fles: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  buttoncreate: {
    backgroundColor: "#00000",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    paddingHorizontal: 20,
    height: 50,
  },
  buttoncreatetitle: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
