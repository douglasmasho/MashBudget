/**
 * This component creates a donut chart to visualize percentages of income or expenses.
 * It's designed to be reusable, accommodating different data inputs for varied amounts.
 * Authored by Douglas Mashonganyika, available at https://github.com/douglasmasho/MashBudget
 */

import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import DonutPath from "./DonutPath";

/**
 * DonutChart Component
 * @param {number} gap - Gap between sections in the chart
 * @param {number} decimals - Number of decimal places to display for percentages
 * @param {string[]} colors - Colors for different sections of the chart
 * @param {SharedValue<number>} totalValue - Total value of the chart
 * @param {number} strokeWidth - Width of the stroke for each section
 * @param {number} outerStrokeWidth - Outer stroke width of the chart
 * @param {number} radius - Radius of the chart
 * @param {SkFont} font - Font for displaying the total value
 * @param {SkFont} smallFont - Font for displaying the title
 * @param {string} title - Title of the chart
 * @param {boolean} showTitle - Determines whether to show the title or not
 * @returns {JSX.Element} - DonutChart component
 */
const DonutChart = ({
  gap,
  decimals,
  colors,
  totalValue,
  strokeWidth,
  outerStrokeWidth,
  radius,
  font,
  smallFont,
  title,
  showTitle,
}) => {
  const array = Array.from({ length: 8 });

  const innerRadius = radius - outerStrokeWidth / 2;

  // Creating the path for the donut chart
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  // Deriving the text to display the total value
  const targetText = useDerivedValue(
    () => `N$${Math.round(totalValue.value)}`,
    []
  );

  // Measuring font sizes for alignment
  const fontSize = font.measureText("$00");
  const smallFontSize = smallFont.measureText("Total Spent");

  // Calculating x position for text alignment
  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {/* Drawing the outer circle */}
        <Path
          path={path}
          color="#1f1f1f"
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="round"
          start={0}
          end={1}
        />
        {/* Rendering each section of the donut chart */}
        {array.map((_, index) => {
          return (
            <DonutPath
              key={index}
              radius={radius}
              strokeWidth={strokeWidth}
              outerStrokeWidth={outerStrokeWidth}
              color={colors[index]}
              decimals={decimals}
              index={index}
              gap={gap}
            />
          );
        })}
        {/* Rendering the title and total value if showTitle flag is true */}
        {showTitle ? (
          <>
            <Text
              x={radius - smallFontSize.width / 2}
              y={radius + smallFontSize.height / 2 - fontSize.height / 1.2}
              text={title}
              font={smallFont}
              color="white"
            />
            <Text
              x={textX}
              y={radius + fontSize.height / 2}
              text={targetText}
              font={font}
              color="white"
            />
          </>
        ) : null}
      </Canvas>
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
