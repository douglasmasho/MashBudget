/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DonutChart from "../components/DonutChart";
import { useFont } from "@shopify/react-native-skia";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { calculatePercentage } from "../utils/CalculatePercentage";
import { generateRandomNumbers } from "../utils/generateRandomNumbers";
import RenderItem from "../components/RenderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  db,
  doc,
  orderBy,
  collection,
  getDocs as SELECT,
  query,
} from "../Config";
import IncomeDonut from "./IncomesDonut";
import { Divider } from "@ui-kitten/components";
// This data handles how the donut chart looks like
const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

export const DonutChartContainer = () => {
  const n = 6;
  const [data, setData] = useState([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue([]);
  const colors = [ "#fe769c", "#46a0f8", "#c3f439", "#88dabc", "#e43433",
  "#ff6f61", "#6b5b95", "#88b04b", "#f7cac9", "#92a8d1",
  "#955251", "#b565a7", "#009473", "#e195b8", "#f4acb7",
  "#6c5b7b", "#e06c9f", "#88b04b", "#ffa69e", "#ff847c"];

  useEffect(()=>{
    setTimeout(()=>{
      getItems();

    },500)
  }, [])

  const getItems = async () => {
    const expenses = [];
    try {
      //the query specifies the specific document we want to get from our database, in this case we want the document with all the expenses
      const q = query(collection(db, "expense"), orderBy("time", "desc"));
      //the select method will then fetch the document specified by the query

      const querySnapshot = await SELECT(q);

      querySnapshot.forEach((doc) => {
        expenses.push(doc.data());

      });

    } catch (e) {
      //this part catches any errors
      console.log(e);
    } finally {
      console.log(expenses);
      showData(expenses)
    }
  };


  const showData = (data) => {
    const total = data.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue.amount),0);
    const generatePercentages = calculatePercentage(data, total);
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Your Expenses</Text>
        <View style={styles.chartContainer}>
          <DonutChart
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
          />
        </View>
        <View style={{marginBottom: 50}}>
        {data.map((item, index) => {
          console.log(item.data.name)
          return <RenderItem item={item} key={index} index={index} name={item.data.name} amount={item.data.amount}/>;
        })}
        </View>

        <IncomeDonut/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "#66B6FF",
    // fontWeight: "600",
    fontFamily: "PBold",
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
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

export default DonutChartContainer;
