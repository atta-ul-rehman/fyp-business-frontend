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
  Button,
  toast,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Icon, withBadge } from "react-native-elements";
import { useToast } from "react-native-fast-toast";
import { useIsFocused } from "@react-navigation/native";
import { BaseUrl } from "../constants/Baseurl";
export default function Orders({ navigation }) {
  const toast = useToast();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState();
  const [meal, setmeal] = useState(false);
  const [price, setprice] = useState([]);
  const [restaurantName, setrestaurantName] = useState();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const getOrders = async () => {
    try {
      const response = await fetch(
        `http://${BaseUrl}:5000/api/v1/res/626976503f8cb7c029438bde/Order`
      );
      const json = await response.json();
      setData(json.data);
      setUser(json.data.map((e) => e.user));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const infoMessage = (msg) => {
    toast.show(msg, {
      type: "warning",
      duration: 2000,
      style: { padding: 0, backgroundColor: "rgba(120,120,120,0.9)" },
    });
  };
  useEffect(() => {
    getOrders();
    console.log("data", user.length);
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "600", fontSize: 20, padding: 5 }}>
        {" "}
        All Orders{" "}
      </Text>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            item?.Reservation!=undefined ?
            infoMessage("Reservation Status")
            :
            item.Status !== "canceled" && item.Status !== "completed"
              ? navigation.navigate("ViewOrder", { data: data[index] })
              : infoMessage("Order already " +item.Status);
          }}
        >
          <View
            style={{
              padding: 5,
              borderWidth: 1,
              marginVertical: 5,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              borderColor: item.Status == "cancelled" && "red",
              paddingVertical: 10,
            }}
          >
            <View style={{ paddingBottom: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: "400" }}>
                {item.user.name}{" "}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "400" }}>
                {item.user.address}{" "}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "800",
                top: 0,
                right: 0,
                color: item.Status == "canceled" ? "red" : "green",
                position: "absolute",
              }}
            >
              {" "}
              {item.Status}{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                bottom: 0,
                right: 0,
                color: "grey",
                position: "absolute",
              }}
            >
              {new Date(item.createdAt).toDateString()}{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                position: "absolute",
                top: "50%",
                right: 5,
              }}
            >
              {item?.Reservation != undefined ? "Reservation" : " "}{" "}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
