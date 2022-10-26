import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlatButton from "../../components/ui/FlatButton";
import Input from "../../components/ui/Input";
import Header from "../../components/ui/Login&SignUp/Header";
import SignUpButton from "../../components/ui/Login&SignUp/signUpButton";
import { deviceHeight } from "../../util/device-information";
import { createUser } from "../../util/auth";
import Picker from "../../components/ui/Picker";
function SignUpScreen3() {
  const [sex, setSex] = useState();
  const sexItem = [
    { label: "남성", value: "남성", key: "1" },
    { label: "여성", value: "여성", key: "2" },
  ];
  const [category, setCategory] = useState();
  const categoryItem = [
    { label: "2형", value: "2형", key: "1" },
    { label: "1형", value: "1형", key: "2" },
    { label: "내당능", value: "내당능", key: "3" },
    { label: "임신형", value: "임신형", key: "4" },
    { label: "기타", value: "기타", key: "5" },
  ];
  const categories = ["2형", "1형", "내당능", "임신형", "기타"];
  const [year, setYear] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  async function submitHandler() {
    if (sex !== "남성" && sex !== "여성") {
      Alert.alert("성별을 선택해주세요!");
    } else if (!categories.includes(category)) {
      Alert.alert("당뇨 유형을 선택해주세요!");
    } else if (year.length != 4) {
      Alert.alert("연도를 정확하게 입력하세요!", "ex) 2000");
    } else {
      if (sex=='남성'){
        setSex(true);
      }
      else{
        setSex(false);
      }
      navigation.navigate("SignUpScreen4", {
        email: route.params.email,
        password: route.params.password,
        name: route.params.name,
        height: route.params.height,
        weight: route.params.weight,
        birth: route.params.birth,
        sex: sex,
        category: category,
        year: year,
      });
    }
  }
  function backScreen() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header step={"3"}>회원 가입 정보를 {"\n"}입력해주세요</Header>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Picker
            text="성별을 선택하세요"
            items={sexItem}
            onValueChange={setSex}
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            text="당뇨 유형을 선택하세요"
            items={categoryItem}
            onValueChange={setCategory}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            text="발병년도 (yyyy)"
            onChangeText={setYear}
            value={year}
            keyboardType={"numeric"}
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
export default SignUpScreen3;

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
    justifyContent: "center",
  },
  buttonContainer: {},
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    textAlign: "center",
  },
});
