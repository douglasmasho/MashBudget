/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DonutChart from "../components/DonutChart";
import { useFont } from "@shopify/react-native-skia";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { calculatePercentage, calculatePercentage2 } from "../utils/CalculatePercentage";
import { generateRandomNumbers } from "../utils/generateRandomNumbers";
import RenderItem from "../components/RenderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  db,
  doc,
  orderBy,
  collection,
  onSnapshot as SELECT,
  query,
} from "../Config";
// This data handles how the donut chart looks like
const RADIUS = 50;
const STROKE_WIDTH = 10;
const OUTER_STROKE_WIDTH = 30;
const GAP = 0.04;

export const BalanceDonut = () => {
  const n = 20;
  const [data, setData] = useState([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const colors = [  "#46a0f8", "#E00000", "#c3f439", "#88dabc", "#e43433",
  "#ff6f61", "#6b5b95", "#88b04b", "#f7cac9", "#92a8d1",
  "#955251", "#b565a7", "#009473", "#e195b8", "#f4acb7",
  "#6c5b7b", "#e06c9f", "#88b04b", "#ffa69e", "#ff847c"];

  useEffect(()=>{
    setTimeout(()=>{
      getItems();

    },500)
  }, [incomes, expenses])

  const getItems = async () => {
    try {
       //the select method will then fetch the document specified by the query
       SELECT(doc(db, "totalIncome", "total"), (doc)=>{
        setIncomes(doc.data()?.total)
      })
      SELECT(doc(db, "totalExpense", "total"), (doc)=>{
        setExpenses(doc.data()?.total)
      })
    } catch (e) {
      //this part catches any errors
      console.log(e);
    } finally {
      showData([incomes, expenses])
    }
  };


  const showData = (data) => {
    const total = data.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue),0);
    const generatePercentages = calculatePercentage2(data, total);
    const generateDecimals = generatePercentages.map(
      (number) => Number(number.toFixed(0)) / 100
    );
    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];
    const arrayOfObjects = data.map((data, index) => ({
      data,
      percentage: generatePercentages[index],
      color: colors[index],
    }));
    console.log(arrayOfObjects[0].data.name)
    setData(arrayOfObjects);
  };

  const font = useFont(require("../assets/fonts/PRegular.ttf"), 60);
  const smallFont = useFont(require("../assets/fonts/PRegular.ttf"), 25);

  //this method collects all the expenses from the database, it also listens to any changes made to the expenses records. So if any change happens, it will fetch the updated list and then display the list on the screen.

  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <View style={styles.container}>
        <View style={styles.chartContainer}>
          <DonutChart
          showTitle={false}
            radius={RADIUS}
            gap={GAP}
            strokeWidth={STROKE_WIDTH}
            outerStrokeWidth={OUTER_STROKE_WIDTH}
            font={font}
            smallFont={smallFont}
            totalValue={totalValue}
            n={n}
            decimals={decimals}
            colors={colors}
            title={"Total Earned"}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    
  header: {
    fontSize: 30,
    color: "#66B6FF",
    textAlign: "center",
    // fontWeight: "600",
    fontFamily: "PBold",
  },
  container: {
    flex: 1,
    // backgroundColor: "#1a1a1a",
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 10,
    marginBottom: 25
  },
  button: {
    marginVertical: 40,
    backgroundColor: "#f4f7fc",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default BalanceDonut;
