import { TextInput, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { deviceWidth } from "../../util/device-information";

function SearchBox({ placeholder, onChangeText, value }) {
  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      ></TextInput>
    </View>
  );
}

export default SearchBox;

const styles = StyleSheet.create({
  rootContainer: {
    width: deviceWidth * 0.9,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 5,
    justifyContent:'center',

  },
  text: {
    paddingLeft:20,
    fontSize:15,
  },
});
