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
  SafeAreaView,
} from 'react-native';
import React, { useState, useRef,useEffect } from 'react';
import { Icon, withBadge,Button } from 'react-native-elements';
import DropdownComponent from '../components/Dropdown'
import { useIsFocused } from '@react-navigation/native';
import { io } from "socket.io-client";
import { BaseUrl } from '../constants/Baseurl';
export default function Order({ navigation,route }) {
  const items=route.params.data
  const [data,setData]=useState([items])
  const socket = useRef();
  const [value, setValue] = useState(data[0].Status);
  const [ch,setch]=useState();
  const [user,setuser]=useState(items.Restaurant)
   const [data2,setData2] = useState([
    { name: 'confirmed', value: '1' },
    { name: 'prepared', value: '2' },
    { name: 'deliverd', value: '3' },
    { name: 'completed', value: '4' },
    { name: 'cancelled', value: '5' },
  ]);
  const isFocused = useIsFocused();
  useEffect(()=>{
    socket.current = io(`http://${BaseUrl}:5000`);
  },[])
  useEffect(()=>{
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  },[user])
  useEffect(()=>{
   socket.current.emit("changeOrderStatus", {
      senderId: user,
      recieverId: items.user._id,
      text: value,
    });
     console.log("value",value)
  },[value])
  const update= async ()=>{
       const response = await fetch(`http://${BaseUrl}:5000/api/v1/order/`+items._id,
      {
        method: "PUT",
        headers: {
          Accept: "apllication/json",
          "Content-Type": "application/json",
          Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODFiNGY4N2YyOTU2YzM3MmM2YzIxNyIsImlhdCI6MTY1MjcyMDg5MywiZXhwIjoxNjU1MzEyODkzfQ.EKfeWn22m7cyzUryqCwXcndnaVaeMrxuQWvCe4VZPRg`
        },
        body: JSON.stringify({
          Status:value
        }),
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  useEffect(()=>{
    update()
    console.log("updates called")
  },[isFocused])

  const totalPrice=data[0].prefernceData.map((e)=>e.price).reduce((prev, curr) => prev + curr, 0)
  const totalUsd=data[0].prefernceData.map((e)=>e.price).reduce((prev, curr) => prev + curr, 0)+ data[0].productPrice
  return (
    <SafeAreaView style={{ flex: 1, padding: 10,paddingVertical:20 }}>
    {data?.map(()=>(
      <ScrollView>
      <Text style={{ fontWeight: '600', fontSize: 20 }}> Orders no {ch?.text}</Text>
      <View
        style={{
          marginVertical: 5,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <View style={{ justifyContent: 'space-between', width: '50%' }}>
          <TouchableOpacity onPress={()=>{update()}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
            }}>
            <Icon name="person" type="material" size={20} />
            <Text style={{ fontSize: 14, fontWeight: '400', padding: 5 }}>
              Customer Name{' '}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
            }}>
            <Icon name="place" type="material" size={20} />
            <Text style={{ fontSize: 14, fontWeight: '400', padding: 5 }}>
              Deliver Address{' '}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between', width: '50%' }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              padding: 5,
              borderBottomWidth: 1,
            }}>
            {data[0].user.name}{' '}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              padding: 5,
              borderBottomWidth: 1,
            }}>
           {data[0].user.address}{' '}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '500', paddingBottom: 0 }}>
         Items
        </Text> 
      <View style={{ paddingVertical: 10, flexDirection: 'row',justifyContent:'space-between',borderBottomWidth:1 }}>
        <View>
         <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 5 }}>
            {data[0].productName } x{ data[0].quantity}
          </Text> 
          <Text style={{ fontSize: 14, fontWeight: '400', paddingBottom: 5 }}>
           {data[0].prefernceData ? data[0].prefernceData.map(e=>e.name+', ') : "No items selected"}
          </Text>
        </View>
        <View>
        <Text style={{ fontSize: 16, fontWeight: '300', paddingBottom: 5 }}>
            ${data[0].productPrice}
          </Text>
           <Text style={{ fontSize: 18, fontWeight: '300', paddingBottom: 5 }}>
            ${totalPrice}
          </Text>
        </View>
      </View>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',borderBottomWidth:1}} >
        <Text style={{ fontSize: 18, fontWeight: '600', paddingBottom: 5 }}>
            Total:{' '}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', paddingBottom: 5 }}>
            ${totalUsd}
          </Text>
      </View>
      <View style={{paddingVertical:10}}>
      <Text style={{fontSize:18,fontWeight:'500'}}>Update Status: </Text>
    <DropdownComponent data={data2} value={value} setvalue={setValue} />
    </View>
    {!value && 
      <Button
              title="Reject Order"
              buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: "100%",
                marginVertical: 10,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
            />
    
    }
    </ScrollView>
    ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
  });