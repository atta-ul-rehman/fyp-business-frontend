import React, { useState, useEffect} from "react";
import { Icon, withBadge } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BusinessConsole from "./businessConsole";
import OrderStack from "./OrderStack/index";
import ChatStack from "./ChatStack/index";
import { useNavigation } from "@react-navigation/native";
import {BaseUrl} from '../constants/Baseurl'
const ClientTabs = createBottomTabNavigator();

export default function BottomTab() {
  const navigation = useNavigation();
  const [data,setData]=useState([])
const getOrders = async () => {
  try {
    const response = await fetch(
      `http://${BaseUrl}:5000/api/v1/res/626976503f8cb7c029438bde/Order`
    );
    const json = await response.json();
    setData(json.data);
  } catch (error) {
    console.error(error);
  }
};
const[chatIcon,setChatIcon]=useState(0)
useEffect(() => {
  const getMessage = async () => {
    await fetch(
      `http://${BaseUrl}:5000/api/v1/conversation?canView.Restaurant=true`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.count == 0) {
        console.log("no")
        }
        else{
          const data = json.data.filter((e) =>
          e.conversationId.includes("626976503f8cb7c029438bde")
        );
        setChatIcon(data?.length);
        }
      })
      .catch((error) => console.error(error));
  };
  getMessage();
}, []);

useEffect(()=>{
getOrders()
},[])
const Cart = data.length;
const BadgeIcon = withBadge(Cart)(Icon);
const BadgeIcon2=withBadge(chatIcon)(Icon)
  return (
    <ClientTabs.Navigator
      screenOptions={{
        activeTintColor: "red",
      }}
    >
      <ClientTabs.Screen
        name="Home"
        component={BusinessConsole}
        options={{
          tabBarLable: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={size} />
          ),
        }}
      />

      <ClientTabs.Screen
        name="Chatz"
        component={ChatStack}
        options={{
          tabBarLable: "Chat",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <BadgeIcon2
              name="wechat"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <ClientTabs.Screen
        name="MYOrder"
        component={OrderStack}
        options={{
          tabBarLable: "Order",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <BadgeIcon
              name="emoji-food-beverage"
              type="material"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </ClientTabs.Navigator>
  );
}
