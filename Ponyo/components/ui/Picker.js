import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { deviceHeight, deviceWidth } from "../../util/device-information";
import RNPickerSelect from "react-native-picker-select";
function Picker({ text, value, items,onValueChange,width,height }) {
  return (
    <View style={[styles.input,{width:width,height:height}]}>
      <RNPickerSelect
        placeholder={{label:text}}
        value={items.label}
        onValueChange={onValueChange}
        items={items}
        
      />
    </View>
  );
}

export default Picker;

const styles = StyleSheet.create({
  input: {
    borderColor: "#dadada",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 12,
    width: deviceWidth * 0.9,
    height: 40,
  },
});
