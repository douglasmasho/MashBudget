/**
 * This component handles the rendering of colored paths representing a single amount as a percentage of the pie.
 * For example, if an expense is 50% of the total expense, a path will be rendered with that expense's color and that path will take up 50% of the pie (donut in this case).
 * Authored by Douglas Mashonganyika, available at https://github.com/douglasmasho/MashBudget
 */
import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";

/**
 * DonutPath Component
 * @param {number} radius - Radius of the donut chart
 * @param {number} gap - Gap between sections in the chart
 * @param {number} strokeWidth - Width of the stroke for the path
 * @param {number} outerStrokeWidth - Outer stroke width of the chart
 * @param {string} color - Color of the path
 * @param {number[]} decimals - Array of decimal values representing percentages
 * @param {number} index - Index of the current section
 * @returns {JSX.Element} - DonutPath component
 */
const DonutPath = ({
  radius,
  gap,
  strokeWidth,
  outerStrokeWidth,
  color,
  decimals,
  index,
}) => {
  const innerRadius = radius - outerStrokeWidth / 2;

  // Creating the path for the donut chart
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  // Deriving the start position of the path animation
  const start = useDerivedValue(() => {
    if (index === 0) {
      return gap;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap, {
      duration: 1000,
    });
  }, []);

  // Deriving the end position of the path animation
  const end = useDerivedValue(() => {
    if (index === decimals.value.length - 1) {
      return withTiming(1, { duration: 1000 });
    }

    const decimal = decimals.value.slice(0, index + 1);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum, {
      duration: 1000,
    });
  }, []);

  return (
    <Path
      path={path}
      color={color}
      style="stroke"
      strokeJoin="round"
      strokeWidth={strokeWidth}
      strokeCap="round"
      start={start}
      end={end}
    />
  );
};

export default DonutPath;
