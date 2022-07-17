import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Chat from '../Chat'
import AllChats from '../AllChats'

const Stack=createStackNavigator();

export default function OrderStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Allchats" component={AllChats}  options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Chat" component={Chat} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
   
  )
}
