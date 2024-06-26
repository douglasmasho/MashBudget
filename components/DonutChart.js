import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import DonutPath from "./DonutPath";

const DonutChart = ({
  n,
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

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `N$${Math.round(totalValue.value)}`,
    []
  );

  const fontSize = font.measureText("$00");
  const smallFontSize = smallFont.measureText("Total Spent");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
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
