import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View,LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInfoContextProvider, { UserInfoContext } from "./store/user-info";
//screens
import LoginScreen from "./screens/InitialScreen/LoginScreen";
import SignUpScreen1 from "./screens/InitialScreen/SignUpScreen1";
import SignUpScreen2 from "./screens/InitialScreen/SignUpScreen2";
import SignUpScreen3 from "./screens/InitialScreen/SignUpScreen3";
import SignUpScreen4 from "./screens/InitialScreen/SignupScreen4";
import LoadingPage from "./screens/InitialScreen/LoadingScreen";
import AddDietScreen from "./screens/MainScreen/AddDiet/AddDietScreen";
import FindIdScreen from "./screens/InitialScreen/FindIdScreen";
import FindPasswordScreen from "./screens/InitialScreen/FindPasswordScreen";
import ReportScreen from "./screens/MainScreen/ReportScreen/ReportScreen";
import CommunityScreen from "./screens/MainScreen/Community/CommunityScreen";
import WritingScreen from "./screens/MainScreen/Community/WritingScreen";
import MypageScreen from "./screens/MainScreen/Profile/MypageScreen";
import Success from "./screens/InitialScreen/Success";
import DayReportScreen from "./screens/MainScreen/ReportScreen/DayReportScreen";
import IconButton from "./components/ui/Login&SignUp/IconButton";
import ShowContent from "./screens/MainScreen/Community/ShowContent";
import MonthReportScreen from "./screens/MainScreen/ReportScreen/MonthReportScreen";
import Test from "./screens/Test";
import PredictScreen from "./screens/MainScreen/ReportScreen/PredictScreen";
import PredictResultScreen from "./screens/MainScreen/ReportScreen/PredictResultScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
        }}
      ></Stack.Screen>
      <Stack.Screen
      name='Test'
      component={Test}
      options={{
        headerShown:true
      }}
      />
      <Stack.Screen 
      name='Predict'
      component={PredictScreen}
      options={{
        headerShown:true,
        title:"당뇨병 예측하기"
      }}
      />
        <Stack.Screen 
      name='PredictResult'
      component={PredictResultScreen}
      options={{
        headerShown:true,
        title:"당뇨병 예측 결과"
      }}
      />
      <Stack.Screen
        name="AddDiet"
        component={AddDietScreen}
        options={{
          headerShown: true,
          title: "식단 추가하기",
          headerBackButtonMenuEnabled: false,
        }}
      />


      <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          headerShown: true,
          title: "전체 게시판",
          headerBackTitle: "",
          headerSearchBarOptions: true,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="WritingScreen"
        component={WritingScreen}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="ShowContent"
        component={ShowContent}
        options={{
          headerShown: true,
          title: "게시글",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="Mypage"
        component={MypageScreen}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="dayReportScreen"
        component={DayReportScreen}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="MonthReportScreen"
        component={MonthReportScreen}
        options={{
          headerShown: true,
          title: "월별 리포트",
          headerBackTitle: "",
        }}
      />

    </Stack.Navigator>
  );
}

function BasicStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name="SignUpScreen1"
        component={SignUpScreen1}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUpScreen2"
        component={SignUpScreen2}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUpScreen3"
        component={SignUpScreen3}
      ></Stack.Screen>
      <Stack.Screen name="SignUpScreen4" component={SignUpScreen4} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="FindIdScreen" component={FindIdScreen}></Stack.Screen>
      <Stack.Screen
        name="FindPasswordScreen"
        component={FindPasswordScreen}
      ></Stack.Screen>
      <Stack.Screen name="test" component={Test} />
    </Stack.Navigator>
  );
}
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <BasicStack />}
      {authCtx.isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
}
function Root() {
  // const [isTryingLogin, setIsTryingLogin] = useState(true);
  // const authCtx = useContext(AuthContext);
  // const userCtx = useContext(UserInfoContext);
  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = await AsyncStorage.getItem("token");
  //     if (storedToken) {
  //       authCtx.saveAuthenticate(storedToken);
  //     }
  //     setIsTryingLogin(false);
  //   }
  //   fetchToken();
  // }, []);

  // if (isTryingLogin) {
  //   return <LoadingPage />;
  // }
  return <Navigation />;
}

export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <UserInfoContextProvider>
          <Root />
        </UserInfoContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
