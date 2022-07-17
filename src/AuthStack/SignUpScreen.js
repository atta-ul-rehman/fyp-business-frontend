import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { colors } from "../global/styles";
import { useFormik } from "formik";
import { Icon, Button } from "react-native-elements";
import { useToast } from "react-native-fast-toast";
//import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup";
import { BaseUrl } from "../constants/Baseurl";
import { SafeAreaView } from "react-native-safe-area-context";
const SignUpScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [passwordBlured, setPasswordBlured] = useState(true);
  //const dispatch=useDispatch();
  // const restaurantname = useSelector(
  //   (state) => state.authToken.authToken
  // );
  const toast = useToast();
  const inputRef = useRef(null);
  const emailRef = useRef(null);
  const pass = useRef(null);
  const LoginSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").required("Required"),
    role: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").trim().required("Required"),
    password: Yup.string()
      .trim()
      .min(6, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
  });

  const registerUser = async (data) => {
    if (values) {
      const response = await fetch(
        `http://${BaseUrl}:5000/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "apllication/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: "owner",
            address: data.role,
          }),
        }
      );
      const resp = await response.json();
      if (!resp.success) {
        setloading(false);
        toast.show("Email already exist", {
          duration: 1000,
          style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
        });
      } else {
        toast.show("User registered Succesfully", {
          duration: 1000,
          style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
        });
        navigation.pop();
        setloading(false);
      }
    } else {
      toast.show("Fields cannot be empty", { type: "success" });
      setloading(false);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { name: "", user: "", email: "", password: "", role: "" },
      onSubmit: (values) => registerUser(values),
    });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Sign-Up </Text>
        </View>
        <View style={styles.view2}>
          <View>
            <Text style={styles.text2}>New on Falla?</Text>
          </View>
          {errors.name ? (
            <Text style={{ color: "red" }}>*{errors.name}</Text>
          ) : null}
          <View style={styles.view10}>
            <TextInput
              placeholder="Name"
              style={styles.input1}
              autoFocus={true}
              onChangeText={handleChange("name")}
              value={values.name}
              onBlur={handleBlur("name")}
              error={errors.name}
              touched={touched.name}
              returnKeyType="done"
              onSubmitEditing={() => inputRef.current?.focus()}
            />
          </View>
          {errors.role ? (
            <Text style={{ color: "red" }}>*{errors.role}</Text>
          ) : null}
          <View style={styles.view10}>
            <TextInput
              placeholder="Address"
              style={styles.input1}
              onChangeText={handleChange("role")}
              value={values.role}
              onBlur={handleBlur("role")}
              error={errors.role}
              touched={touched.role}
              autoFocus={false}
              returnKeyType="done"
              ref={inputRef}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          </View>
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
                style={styles.input4}
                autoFocus={false}
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                returnKeyType="done"
                ref={emailRef}
                onSubmitEditing={() => pass.current?.focus()}
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
              style={{ flex: 1 }}
              secureTextEntry={passwordBlured}
              onChangeText={handleChange("password")}
              value={values.password}
              autoFocus={false}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              ref={pass}
            />
            <View style={{ paddingRight: 10 }}>
              <Icon
                name={passwordBlured ? "visibility-off" : "remove-red-eye"}
                color={colors.grey3}
                type="material"
                onPress={() => {
                  setPasswordBlured(!passwordBlured);
                }}
              />
            </View>
          </View>

          <View style={styles.view15}>
            <Text style={styles.text3}>
              By creating or logging into an account you are
            </Text>
            <View style={styles.view16}>
              <Text style={styles.text3}>agreeing with our </Text>
              <Text style={styles.text4}> Terms & Conditions</Text>
              <Text style={styles.text3}> and </Text>
            </View>
            <Text style={styles.text4}> Privacy Statement</Text>
          </View>

          <View style={styles.view17}>
            <Button
              title={
                loading ? (
                  <ActivityIndicator color="white" size="large" />
                ) : (
                  "Create my account"
                )
              }
              buttonStyle={styles.button1}
              titleStyle={styles.title1}
              onPress={handleSubmit}
            />
          </View>
        </View>

        <View style={styles.view18}>
          <Text style={styles.text5}>OR</Text>
        </View>
        <View style={styles.view19}>
          <View style={styles.view20}>
            <Text style={styles.text3}>
              Already have an account with Falla ?
            </Text>
          </View>
          <View style={styles.view21}>
            <Button
              title="Sign-In"
              buttonStyle={styles.button2}
              titleStyle={styles.title2}
              onPress={() => {
                toast.show("User with email not Found", {
                  duration: 2000,
                  style: {
                    padding: 0,
                    backgroundColor: "rgb(120,120,120)",
                    borderRadius: 100,
                  },
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  view1: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },

  text1: { fontSize: 22, color: colors.buttons, fontWeight: "bold" },

  view2: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },

  view3: { marginTop: 5, marginBottom: 10 },

  text2: { fontSize: 25, color: colors.grey2 },

  input1: { fontSize: 16 },

  view10: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 15,
    alignItems: "center",
    height: 48,
  },

  email: {
    fontSize: 24,
    marginLeft: 2,
  },

  view11: { marginLeft: 30, maxWidth: "65%" },

  input4: { fontSize: 16, marginLeft: -20, marginBottom: 0 },

  view13: { flexDirection: "row", height: 40 },

  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.grey4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginTop: 20,
  },

  view15: { alignItems: "center", justifyContent: "center", marginTop: 10 },

  text3: { fontSize: 13 },

  view16: { flexDirection: "row" },

  text4: { textDecorationLine: "underline", color: "green", fontSize: 13 },

  button1: {
    backgroundColor: colors.buttons,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },

  title1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },

  view17: { marginVertical: 10, marginTop: 30 },

  view18: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
  },

  text5: { fontSize: 15, fontWeight: "bold" },

  view19: { backgroundColor: "white", paddingHorizontal: 15 },

  view20: { marginTop: 5 },

  view21: { marginTop: 5, alignItems: "flex-end" },

  button2: {
    backgroundColor: colors.background3,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.background2,
    height: 40,
    paddingHorizontal: 20,
    // width:'100%'
  },

  title2: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
