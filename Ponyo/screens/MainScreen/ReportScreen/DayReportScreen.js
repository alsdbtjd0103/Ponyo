import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getToday from "../../../util/getToday";

function DayReportScreen() {
  const [content, setContent] = useState({
    blood: 0,
    carbo: 0,
    protein: 0,
    fat: 0,
    cal: 0,
  });
  useEffect(() => {
    async function totalDay() {
      const tempContent = {
        blood: content.blood,
        carbo: content.carbo,
        protein: content.protein,
        fat: content.fat,
        cal: content.cal,
      };
      const today = getToday();
      const temp = JSON.parse(await AsyncStorage.getItem(today));
      console.log('getItem:',temp);
      for (var data of temp) {
        tempContent.blood += parseInt(data.blood);
        tempContent.carbo += parseInt(data.carbo);
        tempContent.protein += parseInt(data.protein);
        tempContent.fat += parseInt(data.fat);
        tempContent.cal += parseInt(data.cal);
      }
      setContent(tempContent);
    }
    totalDay();
    console.log(content);
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text>dayreportscreen</Text>
      <Text> {content.blood}</Text>
      <Text>{content.carbo}</Text>
      <Text>{content.protein}</Text>
      <Text>{content.fat}</Text>
      <Text>{content.cal}</Text>
    </SafeAreaView>
  );
}

export default DayReportScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
