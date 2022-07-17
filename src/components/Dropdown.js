import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const DropdownComponent = ({ value, setvalue, data }) => {
  const [show, setshow] = useState(true);
  const ps = (item) => {
    setshow(!show);
    setvalue(item.name);
  };
  const [checked, setchecked] = useState([]);
  return (
    <View style={{}}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setshow(!show)}>
        <Text style={{ fontSize: 18 }}>
          {!value ? "Select Catagory" : value}{" "}
        </Text>
        <Icon
          name={show ? "expand-more" : "expand-less"}
          type="material"
          color={"grey"}
          size={22}
        />
      </TouchableOpacity>
      {!show &&
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              marginHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderColor: "#ececec",
            }}
            onPress={() => {
              ps(item);
            }}
          >
            <Text
              style={{ color: checked.includes(index) ? "#cfcfcf" : "black" }}
            >
              {item.name}{" "}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#bdc6cf",
  },
});
