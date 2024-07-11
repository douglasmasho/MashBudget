/**
 * This code handles the screen which displays both the pie chart of incomes/expenses but also the individual incomes/expenses.
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DonutChart from "../components/DonutChart";
import { useFont } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { calculatePercentage } from "../utils/CalculatePercentage";
import RenderItem from "../components/RenderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, orderBy, collection, getDocs as SELECT, query } from "../Config";
import IncomeDonut from "./IncomesDonut";

// This data handles how the donut chart looks like
const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

export const DonutChartContainer = () => {
  const n = 20;
  const [data, setData] = useState([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue([]);
  const colors = [
    "#fe769c",
    "#46a0f8",
    "#c3f439",
    "#88dabc",
    "#e43433",
    "#ff6f61",
    "#6b5b95",
    "#88b04b",
    "#f7cac9",
    "#92a8d1",
    "#955251",
    "#b565a7",
    "#009473",
    "#e195b8",
    "#f4acb7",
    "#6c5b7b",
    "#e06c9f",
    "#88b04b",
    "#ffa69e",
    "#ff847c",
  ];

  useEffect(() => {
    setTimeout(() => {
      getItems();
    }, 500);
  }, []);

  const getItems = async () => {
    const expenses = [];
    try {
      // Query for fetching expenses
      const q = query(collection(db, "expense"), orderBy("time", "desc"));
      // Fetching expenses data
      const querySnapshot = await SELECT(q);

      querySnapshot.forEach((doc) => {
        expenses.push(doc.data());
      });
    } catch (e) {
      // Error handling
      console.log(e);
    } finally {
      console.log(expenses);
      showData(expenses);
    }
  };

  const showData = (data) => {
    // Calculate total expense
    const total = data.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue.amount),
      0
    );
    // Calculate percentage of each expense
    const generatePercentages = calculatePercentage(data, total);
    // Generate decimal percentages
    const generateDecimals = generatePercentages.map(
      (number) => Number(number.toFixed(0)) / 100
    );
    // Set total value with animation
    totalValue.value = withTiming(total, { duration: 1000 });
    // Set decimal percentages
    decimals.value = [...generateDecimals];

    const arrayOfObjects = data.map((data, index) => ({
      data,
      percentage: generatePercentages[index],
      color: colors[index],
    }));
    console.log(arrayOfObjects[0].data.name);
    setData(arrayOfObjects);
  };

  const font = useFont(require("../assets/fonts/PRegular.ttf"), 60);
  const smallFont = useFont(require("../assets/fonts/PRegular.ttf"), 25);

  // Render loading if fonts are not yet loaded
  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Your Expenses</Text>

        {/* Donut Chart */}
        <View style={styles.chartContainer}>
          <DonutChart
            showTitle={true}
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
            title={"Total Spent"}
          />
        </View>

        {/* Render individual expense items */}
        <View style={{ marginBottom: 50 }}>
          {data.map((item, index) => {
            console.log(item.data.name);
            return (
              <RenderItem
                item={item}
                key={index}
                index={index}
                name={item.data.name}
                amount={item.data.amount}
              />
            );
          })}
        </View>

        {/* Render income donut chart */}
        <IncomeDonut />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "#66B6FF",
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
    marginBottom: 25,
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
