import React, { useState, useCallback, useEffect, useRef } from "react";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { Icon, Button } from "react-native-elements";

import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import { BaseUrl } from "../constants/Baseurl";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
export default function Example({route,navigation}) {
  const{userName,resPhoto,userID,resID }=route.params
  const isFocused=useIsFocused()
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState();
  const [senderId, setsenderId] = useState(resID);
  const [recieverId, setrecieverId] = useState(userID);
  const [user, setuser] = useState(resID);
  const RES = useSelector((state) => state.BusinessOnline.BusinessOnline);
  const [conversationId,setConversationId]=useState(route.params ? route.params.conversationId: senderId+'-'+recieverId) 
  let date=new Date()
  useEffect(() => {
    //socket.current.emit("Welcome", `Welcome to ${senderId}`);
    socket.current = io(`http://${BaseUrl}:5000`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        _id: Date.now(),
        senderId: data.senderId,
        text: data.text,
        createdAt: date.toISOString(),
        user: { _id: data.senderId },
      });
    });
    //console.log("arrivalMessage ", arrivalMessage);
  }, []);
  useEffect(() => {
    const getMessage = async () => {
      await fetch(`http://${BaseUrl}:5000/api/v1/messages/` + conversationId)
        .then((response) => response.json())
        .then((json) => {
          const data = json.data.reverse();
          setMessages(data);
        })
        .catch((error) => console.error(error))
    };
    getMessage();
  }, []);

  useEffect(() => {
    {
    let temp = [arrivalMessage];
    temp.concat(messages).sort(
      (a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    )
    {
      arrivalMessage &&
        setMessages(temp);
    }
    }
   // console.log("Message ", messages);
  }, [arrivalMessage]);
  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
    console.log(user);
  }, [user]);

  const onSend = async (messageArray) => {
    socket.current.emit("sendMessage", {
      senderId: senderId,
      recieverId: recieverId,
      text: messageArray[0].text,
    });
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      senderId,
      recieverId,
      conversationId,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, mymsg)
    );
    await fetch(`http://${BaseUrl}:5000/api/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: senderId,
        recieverId: recieverId,
        conversationId: conversationId,
        text: messageArray[0].text,
        createdAt: messageArray[0].createdAt,
      }),
    });
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Icon
            name="send-circle"
            type="material-community"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };
  const scrollToBottomComponent = () => {
    return <Icon name="keyboard-arrow-down" size={22} color="#333" />;
  };

  return (
    <>
     <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "red",
            alignItems: "center",
            paddingLeft:20
          }}
        >
          <Icon
            name="arrow-back-ios"
            size={16}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Image
            source={{
              uri: resPhoto,
            }}
            style={{ height: 35, width: 35, borderRadius: 100 ,marginLeft:10}}
          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              color: "white",
              fontWeight: "500",
            }}
          >
            {" "}
            {userName}
          </Text>
        </View>
      </SafeAreaView>
      <GiftedChat
        messages={messages}
        onSend={(text) => onSend(text)}
        user={{
          _id: senderId,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </>
  );
}
