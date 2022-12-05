import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemBox from "../../../components/ui/ItemBox";
import { UserInfoContext } from "../../../store/user-info";
import { Entypo,Octicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import RingChart from "../../../components/chart/RingChart";
import { getHealthScore, loadMonthBlood, loadMonthCalory, loadRecentBlood } from "../../../util/getData";
import getToday from "../../../util/getToday";
import ProfileBox from "../../../components/ui/ProfileBox";
import Piechart from "../../../components/chart/Piechart";
import FlatButton from "../../../components/ui/FlatButton";
import { LineChart, XAxis, YAxis ,Grid} from "react-native-svg-charts";
import LoadingPage from "../../InitialScreen/LoadingScreen";


function MonthReportScreen() {
  const userCtx = useContext(UserInfoContext);
  const username = userCtx.name;
  const [blood,setBlood] = useState(0);
  const [font, setFont] = useState(false);
  const [monthCalory,setMonthCalory] = useState(0);
  const [score,setScore] = useState(0);
  const chartData = [{
    value:70,
    svg:{
      fill:'#F2FA9B',
      onPress:() => console.log('press')
    },
    key:1
  },
  {
    value:20,
    svg:{
      fill:'#FAD49B',
      onPress:() => console.log('press')
    },
    key:2
  },{
    value:10,
    svg:{
      fill:'#F8191E',
      onPress:(value) => console.log('press')
    },
    key:3
  }]
  
  const [basicData,setBasicData] = useState({
    cal:0.6,
    protein:0.3,
    fat:0.1
  });

  function CreateLineChart() {
    const [eatTime, setEatTime] = useState("아침");
    const [eatState, setEatState] = useState("식전");
    const [standard,setStandard] = useState(100);
    const [bloodData,setBloodData] = useState([50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]);
    const yaxis1=[80,90,100,110,120];
    const yaxis2=[110,120,130,140,150];
    useEffect(() => {
      loadMonthBlood(userCtx.id,eatTime,eatState,setBloodData);
    },[eatTime,eatState])
    
    useEffect(() => {
      if(eatState==='식전'){
        setStandard(100);
      }
      else{
        setStandard(140);
      }
    })
    function ChartButton({ children, onPress }) {
      return (
        <View
          style={[
            { width: 70, height: 30, borderBottomColor: "#FF6838" },
            children === eatTime ? { borderBottomWidth: 5 } : null,
            children === eatState ? { borderBottomWidth: 5 } : null,
          ]}
        >
          <FlatButton onPress={onPress} color="#FF6838" size={15}>
            {children}
          </FlatButton>
        </View>
      );
    }
  
    return (
        <View style={[{ width: 350, height: 350,marginTop:30},styles.button]}>
          <Text style={{paddingRight:220,paddingTop:10,textAlign:'left',fontFamily:'Montserrat-bold',fontSize:17, }}>평균 혈당 추세</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around"}}>
            <ChartButton
              onPress={() => {
                setEatTime("아침");
              }}
            >
              아침
            </ChartButton>
            <ChartButton
              onPress={() => {
                setEatTime("점심");
              }}
            >
              점심
            </ChartButton>
            <ChartButton
              onPress={() => {
                setEatTime("저녁");
              }}
            >
              저녁
            </ChartButton>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingTop: 5,
            }}
          >
            <ChartButton
              onPress={() => {
                setEatState("식전");
                console.log(eatState)
              }}
            >
              식전
            </ChartButton>
            <ChartButton
              onPress={() => {
                setEatState("식후");
                console.log(eatState)
              }}
            >
              식후
            </ChartButton>
  
          </View>
          <View style={{flexDirection:'column'}}>
          <View style={{justifyContent:'center',alignItems:'center',paddingTop:10,flexDirection:'row'}}>

            {eatState==='식전'?
            <View style={{flexDirection:'column',height:200,justifyContent:'space-around',marginRight:10}}>
                <Text style={{fontSize:10,color:'grey'}}>120</Text>
                <Text style={{fontSize:10,color:'grey'}}>110</Text>
                <Text style={{fontSize:10,color:'grey'}}>100</Text>
                <Text style={{fontSize:10,color:'grey'}}>90</Text>
                <Text style={{fontSize:10,color:'grey'}}>80</Text>
            </View>
            :
            <View style={{flexDirection:'column',height:200,justifyContent:'space-around',marginRight:10}}>
            <Text style={{fontSize:10,color:'grey'}}>160</Text>
            <Text style={{fontSize:10,color:'grey'}}>150</Text>
            <Text style={{fontSize:10,color:'grey'}}>140</Text>
            <Text style={{fontSize:10,color:'grey'}}>130</Text>
            <Text style={{fontSize:10,color:'grey'}}>120</Text>
        </View>
            }
              <LineChart
                style={{ height: 200,width:300 }}
                data={bloodData}
                svg={{ stroke: '#FF6838',strokeWidth:2 }}
                contentInset={{ top: 20, bottom: 20 }}
              >
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <View style={{width:300,height:2,borderStyle:"dotted",borderWidth:1,borderColor:'#999999'}}></View>
                </View>
                
              </LineChart>
              
            </View>
            <XAxis 
            
            data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{
              fill:'grey',
              fontSize:10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
            />
            </View>
        </View>
  
    );
  }

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
    loadRecentBlood(userCtx.id,setBlood);
    loadMonthCalory(userCtx.id,setMonthCalory);
    getHealthScore(userCtx.id,setScore,getToday());
  },[]);
  if (font&&blood&&score) {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <ScrollView>
          <View style={{marginTop:7}}>
            <ItemBox width={350} height={90}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                <View style={{marginRight:15}}>
                <ProfileBox width={100} height={100}/>
                </View>
                <Text style={{fontFamily:'Montserrat-medium',fontSize:14,marginRight:50}}>
              {username}
              </Text>
              <Image
                  style={{
                    width: 120,
                    height: 50, 
                    
                    resizeMode:"stretch"
                  }}
                  source={require("../../../assets/Lines.png")}
                />
              </View>
            </ItemBox>
          </View>
          <View>
            <ItemBox width={350} height={140}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingTop: 8,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {" "}
                    혈당량
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 48,
                      paddingTop: 8,
                      fontFamily: "Montserrat-bold",
                    }}
                  >
                    {blood}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#999999",
                      paddingTop: 4,
                      marginLeft: 8,
                      fontFamily: "Montserrat",
                    }}
                  >
                    mg/dl
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Image
                    style={{
                      marginTop: 30,
                      marginLeft: 60,
                      width: 140,
                      height: 50,
                      resizeMode: "cover",
                    }}
                    source={require("../../../assets/Graph.png")}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#999999",
                      paddingTop: 16,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {" "}
                    Congrats, you're in healthy range!
                  </Text>
                </View>
              </View>
            </ItemBox>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <ItemBox width={160} height={250}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontFamily: "Montserrat-bold" }}>
                  평균 섭취 열량
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 25,
                      fontFamily: "Montserrat-medium",
                    }}
                  >
                    {parseInt(monthCalory)}{" "}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 10,
                      fontSize: 15,
                      fontFamily: "Montserrat-medium",
                    }}
                  >
                    kcal
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#999999",
                    marginTop: 10,
                    fontFamily: "Montserrat",
                  }}
                >
                  in average
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#999999",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Lower{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#F8191E",
                      fontFamily: "Montserrat",
                    }}
                  >
                    53%
                  </Text>
                  <Entypo name="chevron-down" size={24} color="#F8191E" />
                </View>
                <Image
                  style={{
                    width: 130,
                    height: 50,
                    resizeMode: "cover",
                    marginTop: 30,
                  }}
                  source={require("../../../assets/Graph.png")}
                />
              </View>
            </ItemBox>
            <ItemBox width={160} height={250}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontFamily: "Montserrat-bold" }}>
                  건강 점수
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 0,
                  }}
                >
                  <Text
                    style={{ fontSize: 50, fontFamily: "Montserrat-medium" }}
                  >
                    {score}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 20,
                      fontSize: 12,
                      fontFamily: "Montserrat",
                    }}
                  >
                    점
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#999999",
                    marginTop: 0,
                    fontFamily: "Montserrat",
                  }}
                >
                  in average
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#999999",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Increased{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "green",
                      fontFamily: "Montserrat",
                    }}
                  >
                    53%
                  </Text>
                  <Entypo name="chevron-up" size={24} color="green" />
                </View>
                <Image
                  style={{
                    width: 130,
                    height: 50,
                    resizeMode: "cover",
                    marginTop: 30,
                  }}
                  source={require("../../../assets/Graph.png")}
                />
              </View>
            </ItemBox>
          </View>
          <View style={{ marginTop: 20}}>
            <ItemBox notText={true} width={350} height={320} >
              <Text style={{ fontFamily: "Montserrat-bold", fontSize: 18 ,paddingLeft:60}}>
                평균 섭취 영양분 비율
              </Text>
              <View style={{justifyContent:'center',alignItems:"center",marginTop:30}}>
                <Piechart data={chartData} width={150} height={150}>
                  <View><Text style={{fontSize:30}}>60%</Text></View>
                </Piechart>
              </View>
              <View style={{marginRight:200}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
              <Octicons name="dot-fill" size={24} color="#F2FA9B" /><Text style={{marginLeft:10}}>탄수화물</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Octicons name="dot-fill" size={24} color="#FFB800" /><Text style={{marginLeft:10}}>단백질</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Octicons name="dot-fill" size={24} color="#FF0000" /><Text style={{marginLeft:10}}>지방</Text>
              </View>
              </View>
            </ItemBox>
          </View>
          <View>
            <CreateLineChart />  
            </View>
          <View>
            <ItemBox width={350} height={150}>
              <Text style={{fontFamily:"Montserrat-bold",fontSize:18}}>
                현재 상태{'\n'}
              </Text>
              <Text style={{fontSize:12,color:'#999999'}}>
                오늘의 혈당 지수 평균은 120mg/dl 입니다.{'\n'}
                지금처럼 꾸준하게 기록하면 나의 건강을 지킬 수 있어요
              </Text>
            </ItemBox>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    console.log(font,blood,monthCalory,score);
    return (
      <LoadingPage message={'로딩중...'}/>
    );
  }
}

export default MonthReportScreen;


const styles=StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    borderRadius:10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  }})
  
