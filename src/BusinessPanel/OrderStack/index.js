import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import ViewOrder from '../ViewOrder'
import Orders from '../Orders'
const Stack=createStackNavigator();

export default function OrderStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="MyOrder" component={Orders} />
        <Stack.Screen name="ViewOrder" component={ViewOrder} />
      </Stack.Navigator>
   
  )
}
