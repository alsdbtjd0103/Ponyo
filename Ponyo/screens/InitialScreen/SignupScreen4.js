import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import FlatButton from "../../components/ui/FlatButton";
import Header from "../../components/ui/Login&SignUp/Header";
import SignUpButton from "../../components/ui/Login&SignUp/signUpButton";
import Picker from "../../components/ui/Picker";
import { createUser } from "../../util/auth";
import { deviceHeight } from "../../util/device-information";
import { save_db } from "../../util/save_db";

function SignUpScreen4() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  const [exercise, setExercise] = useState();
  const selectItem = [
    { label: "주 1~2회", value: "1", key: "1" },
    { label: "3~4회", value: "2", key: "2" },
    { label: "5회 이상", value: "3", key: "3" },
  ];
  const [drink, setDrink] = useState();
  const [smoke, setSmoke] = useState();
  const smokeItem = [
    { label: "O", value: "true", key: "1" },
    { label: "X", value: "false", key: "2" },
  ];
  const [blood, setBlood] = useState();
  const bloodItem = [
    { label: "정상", value: "정상", key: "1" },
    { label: "저혈압", value: "저혈압", key: "2" },
    { label: "고혈압", value: "고혈압", key: "3" },
  ];
  function pressHandler() {
    console.log("press");
  }
  function backScreen() {
    navigation.goBack();
  }

  async function submitHandler() {
    if (!exercise || !drink || !smoke || !blood){
        Alert.alert('빈칸을 선택해주세요!');
        return;
    }
    try{
      const response = await save_db(`insert into user_info values('${route.params.email}','${route.params.name}','${route.params.sex}',${route.params.height},${route.params.weight},'${route.params.birth}','${route.params.category}','${route.params.year}',${exercise},${drink},'${smoke}','${blood}')`);
      console.log(response.data);
      if (!response.data.success){
        Alert.alert('회원가입 실패!');
        return;
      }
      const token = await createUser(route.params.email, route.params.password);
      console.log("signup success");
      navigation.navigate("Success");
    }
    catch (e) {
      console.log("signup fail", e);
    }
  }
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header step={"4"}>추가적인 건강 정보를{"\n"}입력해주세요</Header>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Picker
            text="운동 주기 (주/회)"
            items={selectItem}
            onValueChange={setExercise}
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            text="음주 주기 (주/회)"
            items={selectItem}
            onValueChange={setDrink}
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker text="흡연 여부" items={smokeItem} onValueChange={setSmoke} />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            text="혈압(정상, 저혈압, 고혈압)"
            items={bloodItem}
            onValueChange={setBlood}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton onPress={submitHandler}>회원가입 완료</SignUpButton>
        <FlatButton onPress={backScreen}>뒤로가기</FlatButton>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen4;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  form: {
    flex: 1,
    marginHorizontal: 30,
  },
  formContainer: {
    height: deviceHeight * 0.2,
  },

  inputContainer: {
    marginVertical: 8,
  },
});
