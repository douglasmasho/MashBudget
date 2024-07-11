/**
 * This code shows the donut of the incomes and displays the percentage of total income that each individual income represents
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

// Importing necessary dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DonutChart from "../components/DonutChart"; // Importing DonutChart component
import { useFont } from "@shopify/react-native-skia"; // Importing font utility
import { useSharedValue, withTiming } from "react-native-reanimated"; // Reanimated library for animations
import { calculatePercentage } from "../utils/CalculatePercentage"; // Utility function for calculating percentages
import RenderItem from "../components/RenderItem"; // Importing RenderItem component
import { db, orderBy, collection, getDocs as SELECT, query } from "../Config"; // Database and query utilities

// Constants for donut chart styling
const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

// IncomeDonut component
export const IncomeDonut = () => {
  const n = 20; // Number of sections in the donut chart
  const [data, setData] = useState([]); // State for income data
  const totalValue = useSharedValue(0); // Shared value for total income
  const decimals = useSharedValue([]); // Shared value for percentage decimals
  const colors = [ /* Array of colors for chart sections */ ];

  // Fetch income data when component mounts
  useEffect(() => {
    setTimeout(() => {
      getItems();
    }, 500);
  }, []);

  // Function to fetch income data from database
  const getItems = async () => {
    const incomes = [];
    try {
      const q = query(collection(db, "income"), orderBy("time", "desc"));
      const querySnapshot = await SELECT(q);
      querySnapshot.forEach((doc) => {
        incomes.push(doc.data());
      });
    } catch (e) {
      console.log(e); // Log any errors
    } finally {
      showData(incomes);
    }
  };

  // Function to process and display income data
  const showData = (data) => {
    const total = data.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue.amount),
      0
    );
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
    setData(arrayOfObjects);
  };

  // Loading fonts
  const font = useFont(require("../assets/fonts/PRegular.ttf"), 60);
  const smallFont = useFont(require("../assets/fonts/PRegular.ttf"), 25);

  // Return empty view if fonts are not loaded
  if (!font || !smallFont) {
    return <View />;
  }

  // Render IncomeDonut component
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Income</Text>
      <View style={styles.chartContainer}>
        {/* Donut chart component */}
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
          title={"Total Earned"}
        />
      </View>
      {/* Render individual income items */}
      {data.map((item, index) => {
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
    backgroundColor: "#1a1a1a",
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 10,
    marginBottom: 25,
  },
});

export default IncomeDonut;
