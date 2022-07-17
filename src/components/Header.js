import React from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    StatusBar
} from "react-native";
import { colors, parameters } from "../global/styles";
import {Icon,withBadge} from "react-native-elements"

export default function Header({title,type,navigation})
{
    return(
      <View style={style.header}>
            <View style={{marginLeft:15,alignItems:'center'}}>
                <Icon 
                  type = "meterial-community"
                  name ={type}
                  color={colors.headertext}
                  size={28}
                  onPress={()=>{
                   navigation.goBack()
                  }}
                />
            </View>
            <View >
                <Text style={style.headerText}>
                        {title}
                </Text>
            </View>
        </View>
    )
}

const style =StyleSheet.create({
header:{
    flexDirection:"row",
    backgroundColor:colors.buttons,
    height:parameters.headerhiegt,
    alignItems:'center',
    marginTop:20

},
headerText :{
    color:colors.headertext,
    fontSize:22,
    fontWeight:"bold",
    marginLeft:10,
}
})
