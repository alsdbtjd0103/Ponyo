import { StyleSheet, View, Text, Alert,LogBox} from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';

import Input from "../../components/ui/Input";
import { deviceHeight, deviceWidth } from "../../util/device-information";
import FlatButton from "../../components/ui/FlatButton";
import SignUpButton from "../../components/ui/Login&SignUp/signUpButton";
import Header from "../../components/ui/Login&SignUp/Header";
import { login } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import { UserInfoContext } from "../../store/user-info";
import { save_db } from "../../util/save_db";


function checkEmail(inputId) {
    if (inputId && inputId.includes("@")) {
      return true;
    }
    Alert.alert("Check Email!", "This is not email form");
    return false;
  }
  
  function checkPassword(inputPassword) {
    const len = inputPassword.length;
    if (inputPassword) {
        if(6<=len&&len<=16){
            return true
          }
    }
    Alert.alert("Check Password!", "Password should be 6~16 digits");
    return false;
  }
  

function LoginScreen() {
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const [inputId, setInputId] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserInfoContext);
  function signUp() {
    navigation.navigate("SignUpScreen1");
  };
  function findId(){
    navigation.navigate("FindIdScreen");
  }
  function findPw(){
    navigation.navigate("FindPasswordScreen");
  }



  async function Login(){
    try{
        if(checkEmail(inputId) && checkPassword(password)){
            const token = await login(inputId,password);
            authCtx.saveAuthenticate(token);
            authCtx.isAuthenticated=true;
            
            const response=await save_db(`select name from user_info where email='${inputId}';`);
            if (!response){
              console.log('save db error');
              Alert.alert('DB 오류','다시 시도해주세요');
              return;
            }
            console.log(response.data);
            const username=response.data.message[0].name;
            console.log(username);
            userCtx.saveUserID(inputId);
            userCtx.saveUsername(username);
            console.log(userCtx.id);
        }
    }
    catch (error){
        Alert.alert('로그인에 실패했습니다', "다시 시도해주세요");
        console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Header>PONYO</Header>
      <View style={styles.formContainer}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input text={"이메일"} onChangeText={setInputId} value={inputId} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            text={"비밀번호"}
            onChangeText={setPassword}
            value={password}
            encrypt={true}
          />
        </View>
      </View>
      </View>
      <View style={styles.flatButton}>
        <View style={styles.flatButtonContainer}>
          <FlatButton onPress={signUp}>회원가입</FlatButton>
          <Text style={styles.temp}> | </Text>
          <FlatButton onPress={findId}>아이디 찾기</FlatButton>
          <Text style={styles.temp}> | </Text>
          <FlatButton onPress={findPw}>비밀번호 찾기</FlatButton>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton onPress={Login}>로그인</SignUpButton>
      </View>
    </SafeAreaView>
  );
}
export default LoginScreen;

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
  formContainer:{
    height:deviceHeight*0.2
  },

  inputContainer: {
    marginVertical: 8,
  },
  flatButtonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  flatButton: {
    width:deviceWidth*0.5,
    height:30,
    justifyContent:'center',
    alignItems:'center',
  },
  temp: {
    paddingVertical: 6,
  },
  buttonContainer: {
    flex: 1,
    marginTop:200,
    
  },
});
