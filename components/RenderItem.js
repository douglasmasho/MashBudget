/**
 * Represents a single income/expense item in the Financial Report screen.
 * Displays the income/expense name, amount, and the percentage that it makes up of the total income/expense.
 * Authored by Douglas Mashonganyika, available at https://github.com/douglasmasho/MashBudget
 */

import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

/**
 * RenderItem Component
 * @param {object} item - Income/expense item object containing properties like color and percentage
 * @param {number} index - Index of the item in the list
 * @param {string} name - Name of the income/expense
 * @param {number} amount - Amount of the income/expense
 * @returns {JSX.Element} - RenderItem component
 */
const RenderItem = ({ item, index, name, amount }) => {
  const { width } = useWindowDimensions();
  
  // Render a single income/expense item
  return (
    <Animated.View
      style={[styles.container, { width: width * 0.9 }]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}>
      <View style={styles.contentContainer}>
        {/* Display the income/expense name and color */}
        <View style={styles.smContainer}>
          <View style={[styles.color, { backgroundColor: item.color, marginRight: 10 }]} />
          <Text style={styles.text}>{name}</Text>
        </View>
        {/* Display the percentage and amount of the income/expense */}
        <View style={styles.smContainer}>
          <Text style={[styles.text, { marginRight: 10 }]}>{item.percentage}%</Text>
          <Text style={styles.text}>${amount}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: 10
  },
  container: {
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
  },
  smContainer: {
    flexDirection: 'row',
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  color: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RenderItem;
