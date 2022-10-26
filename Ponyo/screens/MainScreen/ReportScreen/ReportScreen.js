import { View, Text, Pressable, StyleSheet, Button, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import ItemBox from "../../../components/ui/ItemBox";
import { deviceWidth } from "../../../util/device-information";
import IconButton from "../../../components/ui/Login&SignUp/IconButton";
import getToday from "../../../util/getToday";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../../store/auth-context";
import * as Font from "expo-font";
import { UserInfoContext } from "../../../store/user-info";
import { loadMonthBlood, loadRecentBlood, loadTodayKcal } from "../../../util/getData";
function TempButton({ children, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.stateButton,
        pressed && styles.pressed,
        {
          width: 140,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          borderColor: color,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 14, color: color, textAlign: "center" }}>
        {children}
      </Text>
    </Pressable>
  );
}

function ReportScreen() {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserInfoContext);
  const navigation = useNavigation();
  const [blood, setBlood] = useState(0);
  const [today, setToday] = useState();
  const [font, setFont] = useState(false);
  const [kcal, setKcal] = useState(0);

  useEffect(() => {
    async function fontF() {
      await Font.loadAsync({
        Montserrat: require("../../../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-medium": require("../../../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-semibold": require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
      });
      setFont(true);
    }
    fontF();
  }, []);
  useEffect(() => {
    setToday(getToday());
  });
  useEffect(() => {
    loadTodayKcal(userCtx.id, getToday(), setKcal);
    loadRecentBlood(userCtx.id, setBlood);
  },[userCtx.id,userCtx.temp]);
  function press() {
    console.log("press");
  }
  function dayReport() {
    navigation.navigate("dayReportScreen");
  }
  function logout() {
    authCtx.logout();
  }
  if (font) {
    return (
      <SafeAreaView style={styles.rootContainer}>
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 0.9 * deviceWidth,
            paddingTop: 5,
          }}
        >
          <IconButton
            icon="notifications-outline"
            color="black"
            size={30}
            onPress={logout}
          />
          <IconButton
            icon="person-outline"
            color="black"
            size={30}
            onPress={() => navigation.navigate("Test")}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.date}>{today}</Text>
          <Text style={styles.title}>포뇨와 함께 {"\n"}편리하게 식단관리!</Text>
        </View>
        <View style={[styles.menuContainer, { marginBottom: 5 }]}>
          <Pressable
            onPress={() => {
              navigation.navigate("MonthReportScreen");
            }}
            style={({ pressed }) => [
              styles.reportButton,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.reportTextContainer}>
              <Text style={styles.reportButtonText}> 월별 리포트</Text>
              <Text style={styles.reportButtonText}>
                {"섭취량 확인하기  > "}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.menuContainer, { marginTop: 5 }]}>
          <View
            style={[
              styles.stateButton,
              { paddingVertical: 20, paddingHorizontal: 10 },
            ]}
          >
            <View style={[styles.textContainer, { marginHorizontal: 10 }]}>
              <Text style={styles.stateTitleText}>현재 상태</Text>
              <Text
                style={[styles.stateSubText]}
              >{`오늘의 혈당 지수는 ${blood}mg입니다.\n지금처럼 꾸준히 기록하면 건강을 지킬 수 있어요!`}</Text>
              <View>
                <Text
                  style={{
                    fontFamily: "Montserrat-bold",
                    fontSize: 15,
                    marginTop: 20,
                  }}
                >
                  오늘의 섭취 열량
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 7,
                    justifyContent: "flex-start",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: 150,
                      height: 100,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 48,
                        fontFamily: "Montserrat-bold",
                        marginBottom: 12,
                      }}
                    >
                      {kcal}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#999999",
                        marginLeft: 10,
                        fontFamily: "Montserrat-bold",
                      }}
                    >
                      kcal
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: 180,
                      height: 100,
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ marginBottom: 20 }}>
                      <Image
                        style={{
                          width: 150,
                          height: 50,
                          resizeMode: "cover",
                          marginTop: 30,
                        }}
                        source={require("../../../assets/Graph.png")}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#999999",
                        fontFamily: "Montserrat-bold",
                        paddingBottom: 10,
                      }}
                    >
                      Congrats, you're in healty range!
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 30,
                  }}
                >
                  <View>
                    <TempButton
                      onPress={() => navigation.navigate("AddDiet")}
                      color={"#FF6838"}
                    >
                      기록하기
                    </TempButton>
                  </View>
                  <View>
                    <TempButton onPress={press} color={"#171717"}>
                      식단 사진찍기
                    </TempButton>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.menuContainer, { marginTop: 10 }]}>
          <Pressable
            style={({ pressed }) => [
              styles.reportButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.navigate("Predict")}
          >
            <View style={styles.reportTextContainer}>
              <Text style={styles.reportButtonText}> 당뇨병 예측하기</Text>
              <Text style={styles.reportButtonText}>
                {"                      > "}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.menuContainer, { marginTop: 0 }]}>
          <View style={styles.menusContainer}>
            <View style={[styles.bottomLeftContainer]}>
              <ItemBox
                width={170}
                height={150}
                onPress={() => {
                  navigation.navigate("CommunityScreen");
                }}
              >
                전체게시판
              </ItemBox>
            </View>
            <View style={styles.bottomRightContainer}>
              <ItemBox
                width={170}
                height={150}
                onPress={() => {
                  navigation.navigate("CommunityScreen");
                }}
              >
                글쓰기
              </ItemBox>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>로딩중...</Text>
      </View>
    );
  }
}

export default ReportScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  menuContainer: {
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  headerContainer: {
    height: 50,
    width: deviceWidth * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 330,
    height: 100,
    
  },
  iconContainer: {
    flexDirection: "row",
  },
  reportButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "grey",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    width: deviceWidth * 0.9,
    height: 60,
    backgroundColor: "#FF6838",
  },
  reportButtonText: {
    color: "white",
    marginHorizontal: 70,
    fontWeight: "bold",
    fontSize: 15,
  },
  pressed: {
    opacity: 0.7,
  },
  reportTextContainer: {
    flexDirection: "row",
  },
  stateTitleText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  stateSubText: {
    marginTop: 5,
    color: "#8F8F8F",
    fontSize: 12,
  },
  stateButton: {
    borderRadius: 10,

    backgroundColor: "white",
    shadowColor: "rgb(200,200,200)",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    width: deviceWidth * 0.9,
    height: 330,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  textContainer: {},
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  date: {
    fontSize: 14,
    color: "#FF6838",
    marginBottom: 5,
  },
  bottomLeftContainer: {
    marginRight: 10,
  },
  bottomRightContainer: {
    marginLeft: 10,
  },
});
