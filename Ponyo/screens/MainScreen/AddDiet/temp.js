import { View, Text, StyleSheet, Button ,Pressable} from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import SignUpButton from "../../../components/ui/Login&SignUp/signUpButton";
import { useNavigation } from "@react-navigation/native";
import {Calendar} from 'react-native-calendars';

function ChooseTimeScreen() {
  function submitHandler() {
    console.log("submit");

    navigation.navigate("AddDiet", { time: eatTime, month: month, day: day });
  }
  function press(){
    console.log('press');
  }
  const navigation = useNavigation();
  const [eatTime, setEatTime] = useState();
  const atTime = [
    { label: "공복", value: "공복" },
    { label: "아침 식전", value: "아침 식전" },
    { label: "아침 식후", value: "아침 식후" },
    { label: "점심 식전", value: "점심 식전" },
    { label: "점심 식후", value: "점심 식후" },
    { label: "저녁 식전", value: "저녁 식전" },
    { label: "저녁 식후", value: "저녁 식후" },
    { label: "자기 전", value: "자기 전" },
  ];

  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  const monthList = [
    { label: "1월", value: 1 },
    { label: "2월", value: 2 },
    { label: "3월", value: 3 },
    { label: "4월", value: 4 },
    { label: "5월", value: 5 },
    { label: "6월", value: 6 },
    { label: "7월", value: 7 },
    { label: "8월", value: 8 },
    { label: "9월", value: 9 },
    { label: "10월", value: 10 },
    { label: "11월", value: 11 },
    { label: "12월", value: 12 },
  ];

  const dayList = [];
  for (var i = 1; i < 32; i++) {
    dayList.push({ label: i + "일", value: i });
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>식사 시점</Text>
        <View style={styles.textInput1}>
          <RNPickerSelect
            onValueChange={setEatTime}
            items={atTime}
            fixAndroidTouchableBug={true}
            value={eatTime}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "선택하세요" }}
            itemKey={atTime.label}
            style={{
              inputIOS: {
                fontSize: 14,

                textAlign: "center",
              },
            }}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>날짜</Text>
        <Pressable style={styles.textInputContainer} onPress={press}>
          <View style={styles.textInput1}>
            
          </View>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}> 시간</Text>
        <View style={styles.textInput3}>{}</View>
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton onPress={submitHandler}>완료</SignUpButton>
      </View>
    </View>
  );
}

export default ChooseTimeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textInputContainer:{
    width: 150,
    height: 36,
    flexDirection: "row",
    marginLeft: 50,
    alignItems:'center,'
  },
  textInput1: {
    width: 150,
    height: 36,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 10,
    marginLeft: 50,
    justifyContent: "center",
  },
  textInput2: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 10,
    marginRight: 30,
    marginLeft:10,
    flexDirection: "row",
    justifyContent: "center",
  },
  textInput3: {
    width: 150,
    height: 36,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 10,
    marginLeft: 70,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 200,
  },
});
