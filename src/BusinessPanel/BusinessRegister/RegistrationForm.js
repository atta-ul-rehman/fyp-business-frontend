import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../global/styles";
import { useFormik } from "formik";
import { Icon, Button } from "react-native-elements";
import { useToast } from "react-native-fast-toast";
import DropdownComponent from "../../components/Dropdown";
import * as Yup from "yup";
import BaseUrl from "../../constants/Baseurl";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
export default function RegistrationForm({ navigation }) {
  const [loading, setloading] = useState(false);
  const authToken = useSelector((state) => state.authToken.authToken);
 // const LoginState = useSelector((state) => state.authToken.LoginState);
  const toast = useToast();
  const inputRef = useRef(null);
  const catagoryRef = useRef(null);
  const pass = useRef(null);
  const [data, setData2] = useState([
    { name: "Restaurant", value: "1" },
    { name: "Gym", value: "2" },
    { name: "Saloon", value: "3" },
    { name: "cafe", value: "4" },
  ]);
  const LoginSchema = Yup.object().shape({
    businessName: Yup.string().min(4, "Too Short!").required("Required"),
    location: Yup.string().required("Required"),
    catagory: Yup.string().required("Please Select one"),
    cnic: Yup.string().min(4, "Too Short!").required("Required"),
  });

  const registerUser = () => {
    navigation.navigate("Thank you");
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {
        businessName: "",
        location: "",
        catagory: "",
        cnic: "",
        owner: "",
      },
      onSubmit: (values) => SendAddBusiReq(values),
    });

    const SendAddBusiReq = async (data) => {
      setloading(true);
      await fetch(`http://${BaseUrl}:5000/api/v1/res/reqBusiness`, {
        method: "POST",
        headers: {
          Accept: "apllication/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          name: data.businessName,
          catagory: data.catagory,
          location:data.location,
          cnic:data.cnic,
          role: "owner",
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (!resp.success) {
            setloading(false);
            toast.show(resp.error, {
              duration: 1000,
              style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
            });
            setVerifyAcc(true);
          } else if (resp.token) {
            setloading(false);
            new_user(resp.token);
            toast.show("User Logined Succesfully", {
              duration: 1000,
              style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
            });
            setloading(false);
          } 
        })
      }  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Register New Business</Text>
        </View>
        <View style={styles.view2}>
          <View>
            <Text style={styles.text2}>New on falla ?</Text>
          </View>
          {errors.businessName ? (
            <Text style={{ color: "red" }}>*{errors.businessName}</Text>
          ) : null}
          <View style={styles.view10}>
            <Icon
              name={"business"}
              color={colors.grey3}
              type="material"
              style={{ marginRight: 10 }}
              onPress={() => {}}
            />
            <TextInput
              placeholder="Business Name"
              style={styles.input1}
              autoFocus={true}
              onChangeText={handleChange("businessName")}
              value={values.businessName}
              onBlur={handleBlur("businessName")}
              error={errors.businessName}
              touched={touched.businessName}
              returnKeyType="done"
              onSubmitEditing={() => inputRef.current?.focus()}
            />
          </View>

          {errors.cnic ? (
            <Text style={{ color: "red" }}>*{errors.businessName}</Text>
          ) : null}
          <View style={styles.view10}>
            <Icon
              name={"badge"}
              color={colors.grey3}
              type="material"
              style={{ marginRight: 10 }}
              onPress={() => {}}
            />
            <TextInput
              placeholder="Owner Cnic"
              style={styles.input1}
              autoFocus={true}
              onChangeText={handleChange("cnic")}
              value={values.cnic}
              onBlur={handleBlur("cnic")}
              error={errors.cnic}
              touched={touched.cnic}
              returnKeyType="done"
              onSubmitEditing={() => inputRef.current?.focus()}
            />
          </View>

          {errors.location ? (
            <Text style={{ color: "red" }}>*{errors.location}</Text>
          ) : null}
          <View style={styles.view10}>
            <Icon
              name={"place"}
              color={colors.grey3}
              type="material"
              style={{ marginRight: 10 }}
              onPress={() => {}}
            />
            <TextInput
              placeholder="Business Location"
              style={styles.input1}
              onChangeText={handleChange("location")}
              value={values.location}
              onBlur={handleBlur("location")}
              error={errors.location}
              touched={touched.location}
              autoFocus={true}
              returnKeyType="done"
              onSubmitEditing={() => inputRef.current?.focus()}
            />
          </View>
          {errors.catagory ? (
            <Text style={{ color: "red" }}>*{errors.catagory}</Text>
          ) : null}
          <View style={{ marginTop: 5 }}>
            <DropdownComponent
              value={values.catagory}
              setvalue={handleChange("catagory")}
              data={data}
              error={errors.catagory}
            />
          </View>

          <View style={styles.view15}>
            <Text style={styles.text3}>
              By Sending approval Request you are
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
                  "Send Approval Request"
                )
              }
              buttonStyle={styles.button1}
              titleStyle={styles.title1}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    paddingLeft: 5,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
    height: 48,
  },

  catagory: {
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
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },

  view17: { marginVertical: 10, marginTop: 30 },
});
