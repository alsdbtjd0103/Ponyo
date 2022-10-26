import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import FlatButton from "../../components/ui/FlatButton";
import Input from "../../components/ui/Input";
import Header from "../../components/ui/Login&SignUp/Header";
import SignUpButton from "../../components/ui/Login&SignUp/signUpButton";
import { deviceHeight } from "../../util/device-information";


function SignUpScreen2() {
  const [name, setName] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [birth, setBirth] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  async function submitHandler() {
    try {
      if (!name) {
        Alert.alert("이름을 입력하세요!");
      } else if (!height) {
        Alert.alert("키를 입력하세요!");
      } else if (!weight) {
        Alert.alert("몸무게를 입력하세요!");
      } else if (!birth) {
        Alert.alert("생년월일을 입력하세요!");
      } else {

        navigation.navigate("SignUpScreen3", {
          email: route.params.email,
          password: route.params.password,
          name: name,
          height: height,
          weight: weight,
          birth: birth,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function backScreen() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header step={"2"}>회원 가입 정보를 {"\n"}입력해주세요</Header>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input text={"이름"} onChangeText={setName} value={name} />
        </View>
        <View style={styles.inputContainer}>
          <Input text={"키 (cm)"} onChangeText={setHeight} value={height} />
        </View>
        <View style={styles.inputContainer}>
          <Input text={"몸무게 (kg)"} onChangeText={setWeight} value={weight} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            text={"생년월일 (yyyy-mm-dd)"}
            onChangeText={setBirth}
            value={birth}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton onPress={submitHandler}>다음</SignUpButton>
        <FlatButton onPress={backScreen}>뒤로가기</FlatButton>
      </View>
    </SafeAreaView>
  );
}
export default SignUpScreen2;

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
  confirmText: {
    marginVertical: 6,
    marginHorizontal: 6,
    fontSize: 12,
    color: "#818181",
  },
  buttonContainer: {},
});
