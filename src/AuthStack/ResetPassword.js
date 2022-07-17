import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { Icon, Button } from "react-native-elements";
import { colors, parameters } from "../global/styles";
import { useToast } from "react-native-fast-toast";
import { BaseUrl } from "../constants/Baseurl";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ResetPassword({ navigation, route }) {
  const { token } = route.params;
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [loading, setloading] = useState(false);
  const [authtoken, setauthtoken] = useState("");

  const toast = useToast();
  let url = "http://${BaseUrl}:5000/api/v1/auth/resetpassword/" + token;
  const resetpassword = async (data) => {
    if (password) {
      setError(false);
      setloading(true);
      const response = await fetch(
        `ttp://${BaseUrl}:5000/api/v1/auth/resetpassword/${token}`,
        {
          method: "PuT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        setError(true);
        seterrormsg(response.status);
        console.log(response.statusText, error);
        setloading(false);
        toast.show("Email Not found", {
          type: "warning",
          duration: 2000,
          style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
        });
      } else {
        console.log(loading);
        const json = await response.json();
        console.log("token", json.token);
        setauthtoken(json.token);
        navigation.navigate("Signscreen");
        setloading(false);
        toast.show("Password changed succesfully", {
          type: "warning",
          duration: 2000,
          style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
        });
      }
    } else {
      setError(true);
      toast.show("Email cannot be empty", {
        duration: 2000,
        style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
      });
      seterrormsg("Password field cannot be empty");
      console.log("eroore is");
      setloading(false);
    }
  };

  return (
    <SafeAreaView style={{ padding: 5, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingBottom: 20,
        }}
      ></View>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", paddingVertical: 10 }}>
          {" "}
          Enter Your Reset pasword{" "}
        </Text>
        <TextInput
          placeholder="Enter New Password"
          style={{
            paddingVertical: 10,
            borderColor: "#cfcfcf",
            borderWidth: 1,
            paddingHorizontal: 5,
            marginVertical: 10,
          }}
          autoFocus={true}
          onChangeText={(e) => setpassword(e)}
          value={password}
        />

        <Button
          title={
            loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Reset Password"
            )
          }
          buttonStyle={parameters.button1}
          titleStyle={parameters.title1}
          onPress={() => {
            resetpassword({ password }), console.log("Token", url);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
