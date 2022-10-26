import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import {
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "../../components/ui/Input";
import Header from "../../components/ui/Login&SignUp/Header";
import { deviceHeight, deviceWidth } from "../../util/device-information";
import SignUpButton from "../../components/ui/Login&SignUp/signUpButton";
import FlatButton from "../../components/ui/FlatButton";
import { createUser } from "../../util/auth";


function checkId(id) {
  if(id && id.includes('@')){
    return true;
  }
  Alert.alert("이메일을 확인하세요!","이메일 형식이 아닙니다");
  return false;
  
}

function checkPassword(pw) {
  const len = pw.length;
  if (pw) {
    if (6 <= len && len <= 15) {
      return true;
    }
  }
  Alert.alert("비밀번호를 확인하세요!", "비밀번호는 6~15자여야 합니다!");
}

function SignUpScreen1() {
  const [inputId, setInputId] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirm, setConfirm] = useState(false);
  const navigation = useNavigation();

  function confirmPW(pw) {
    setConfirmPassword(pw);
    if (pw === password) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }

  async function submitHandler() {
    try {
      if (checkId(inputId)) {
        if (checkPassword(password) && confirm) {
          navigation.navigate("SignUpScreen2",{email:inputId,
            password:password});
        } else {
          Alert.alert("잘못된 비밀번호입니다", "비밀번호는 6~15자여야 합니다");
        }
      } else {
        Alert.alert("이메일 형식이 아닙니다!", "다시 시도해주세요");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("중복된 아이디입니다", "다시 시도해주세요");
    }
  }

  function backScreen() {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header step={"1"}>회원 가입 정보를 {"\n"}입력해주세요</Header>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input text={"이메일 (example@example.com"} onChangeText={setInputId} value={inputId} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            text={"비밀번호 (6~15자)"}
            onChangeText={setPassword}
            value={password}
            encrypt={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            text={"비밀번호 확인"}
            onChangeText={confirmPW}
            value={confirmPassword}
            encrypt={true}
          />
          {confirm && password && confirmPassword ? (
            <Text style={styles.confirmText}>일치합니다</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton onPress={submitHandler}>다음</SignUpButton>
        <FlatButton onPress={backScreen}>뒤로가기</FlatButton>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen1;

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
