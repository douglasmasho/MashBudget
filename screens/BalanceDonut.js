/**
 * This code handles the donut chart that shows your balance. What percentage is made up of income and what percentage is made up of expenses
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DonutChart from "../components/DonutChart";
import { useFont } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { calculatePercentage2 } from "../utils/CalculatePercentage";

import { db, doc, onSnapshot as SELECT } from "../Config";

// Constants for donut chart configuration
const RADIUS = 50;
const STROKE_WIDTH = 10;
const OUTER_STROKE_WIDTH = 30;
const GAP = 0.04;

export const BalanceDonut = () => {
  // Number of elements for the donut chart
  const n = 20;

  // State variables
  const [data, setData] = useState([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Colors for the donut chart
  const colors = ["#46a0f8", "#E00000"];

  useEffect(() => {
    // Fetch income and expense data after a delay
    setTimeout(() => {
      getItems();
    }, 500);
  }, [incomes, expenses]);

  // Fetch income and expense data from the database
  const getItems = async () => {
    try {
      // Fetch total income
      SELECT(doc(db, "totalIncome", "total"), (doc) => {
        setIncomes(doc.data()?.total);
      });

      // Fetch total expense
      SELECT(doc(db, "totalExpense", "total"), (doc) => {
        setExpenses(doc.data()?.total);
      });
    } catch (e) {
      console.log(e);
    } finally {
      showData([incomes, expenses]);
    }
  };

  // Process and display data for the donut chart
  const showData = (data) => {
    const total = data.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue),
      0
    );
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
    console.log(arrayOfObjects[0].data.name);
    setData(arrayOfObjects);
  };

  // Load custom fonts
  const font = useFont(require("../assets/fonts/PRegular.ttf"), 60);
  const smallFont = useFont(require("../assets/fonts/PRegular.ttf"), 25);

  // Return loading view if fonts are not yet loaded
  if (!font || !smallFont) {
    return <View />;
  }

  // Render the component
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

// Styles for the component
const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "#66B6FF",
    textAlign: "center",
    fontFamily: "PBold",
  },
  container: {
    flex: 1,
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

export default BalanceDonut;
