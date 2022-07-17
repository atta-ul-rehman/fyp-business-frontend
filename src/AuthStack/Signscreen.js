import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { colors, parameters, title } from "../global/styles";
import { Icon, Button, SocialIcon } from "react-native-elements";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-fast-toast";
import { useFormik } from "formik";
import { BaseUrl } from "../constants/Baseurl";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInscreen({ navigation }) {
  const [textinput2state, settextinput2state] = useState(true);
  const [passwordBlured, setPasswordBlured] = useState(true);
  const textinput1 = useRef(1);
  const textinput2 = useRef(2);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const new_user = (token, LoginState) => {
    dispatch({
      type: "New_User",
      payload: {
        authToken: token,
        LoginState: LoginState,
      },
    });
  };
  const Logined_User = (name) => {
    dispatch({
      type: "Get_Logined",
      payload: name,
    });
  };
  const loginUser = async (data) => {
    const response = await fetch(`http://${BaseUrl}:5000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        Accept: "apllication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: "owner",
      }),
    });
    const resp = await response.json();
    if (!resp.success) {
      setloading(false);
      toast.show(resp.error, {
        duration: 1000,
        style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
      });
    } else {
      setloading(true);

      await fetch(`http://${BaseUrl}:5000/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${resp.token}`,
        },
      })
        .then((resp) => resp.json())
        .then((json2) => {
          //console.log("rest have=", json2.data.Restaurant == "");
          Logined_User(json2.data);
          let LoginState =
            json2.data.Restaurant == "" ? "RegisterBusiness" : null;
          console.log("signinLogin", LoginState);
          new_user(json2.token, LoginState);
        })
        .catch((error) =>
          toast.show("Error Occcured" + error, {
            duration: 1000,
          })
        );
      setloading(false);
    }
  };

  // const updateUser = (name, val) => {
  //   setUser({...user, [name] : val})
  // }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      onSubmit: (values) => {
        loginUser(values);
      },
    });

  return (
    <>
      <Header title="My Account" type="arrow-left" navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <View style={{ marginLeft: 20, marginTop: 0 }}>
          <Text style={styles.title}>Sign-In</Text>
        </View>
        <View style={{ alignItems: "center", margintop: 10 }}>
          <Text style={styles.text1}>Please enter email</Text>
          <Text style={styles.text1}>Rigister with your account</Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingBottom: 15,
          }}
        >
          {errors.email ? (
            <Text style={{ color: "red" }}>*{errors.email}</Text>
          ) : null}
          <View style={styles.view10}>
            <View>
              <Icon
                name="email"
                style={styles.email}
                color={colors.grey3}
                type="material"
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="grey"
                style={{
                  fontSize: 16,
                  marginLeft: 0,
                  marginBottom: 0,
                  color: "black",
                }}
                autoFocus={false}
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                returnKeyType="done"
                onSubmitEditing={() => textinput2.current?.focus()}
              />
            </View>
          </View>
          {errors.password ? (
            <Text style={{ color: "red" }}>*{errors.password}</Text>
          ) : null}
          <View style={styles.view10}>
            <Icon name="lock" color={colors.grey3} type="material" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="grey"
              style={{ flex: 1, color: "black" }}
              secureTextEntry={passwordBlured}
              onChangeText={handleChange("password")}
              value={values.password}
              autoFocus={false}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              ref={textinput2}
            />

            <Icon
              name={passwordBlured ? "visibility-off" : "remove-red-eye"}
              color={colors.grey3}
              type="material"
              style={{ paddingRight: 20 }}
              onPress={() => {
                setPasswordBlured(!passwordBlured);
              }}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title={loading ? <ActivityIndicator size={"small"} /> : "Sign-In"}
            buttonStyle={parameters.styledbutton}
            titleStyle={parameters.statusText}
            onPress={handleSubmit}
          />
        </View>

        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 10 }}
          onPress={() => {
            navigation.navigate("ForgetPassword");
          }}
        >
          <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>OR</Text>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <SocialIcon
            title="SignIn with FaceBook"
            button
            type="facebook"
            style={styles.socialicon}
            onPress={() => {
              toast.show("User Logined Succesfully", {
                type: "success",
                duration: 2000,
                style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
              });
            }}
          />
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <SocialIcon
            title="SignIn with Google"
            button
            type="google"
            style={styles.socialicon}
            onPress={() => {
              promptAsync({ useProxy: true, showInRecents: true });
            }}
          />
        </View>

        <View style={{ marginLeft: 25, marginTop: 10 }}>
          <Text style={[styles.text1, { fontSize: 16 }]}>New To Falla ?</Text>
        </View>
        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
          <Button
            title="Create an account"
            buttonStyle={styles.buttoncreate}
            titleStyle={styles.buttoncreatetitle}
            onPress={() => navigation.navigate("SignUpScreen")}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    color: colors.grey4,
    fontSize: 16,
  },
  view10: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    paddingRight: 10,
    marginTop: 15,
    alignItems: "center",
    height: 48,
  },
  TextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#869390",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 10,
    color: "black",
  },
  view11: { maxWidth: "65%" },
  TextInput2: {
    height: 40,
    width: "89%",
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: "#869390",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    padding: 5,
    color: "black",
    paddingRight: -5,
  },
  socialicon: {
    borderRadius: 12,
    height: 50,
  },
  buttoncreate: {
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    paddingHorizontal: 20,
    height: 40,
  },
  buttoncreatetitle: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  styledButton: {
    backgroundColor: "#ff8c52",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff8c52",
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },

  buttonTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
