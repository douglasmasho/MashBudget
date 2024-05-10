import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';


const RenderItem = ({item, index, name, amount}) => {
  const {width} = useWindowDimensions();
  return (
    <Animated.View
      style={[styles.container, {width: width * 0.9}]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}>
      <View style={styles.contentContainer}>
        <View style={styles.smContainer}>
        <View style={[styles.color, {backgroundColor: item.color, marginRight: 10}]} />
        <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.smContainer}>
        <Text style={[styles.text,  { marginRight: 10}]}>{item.percentage}%</Text>
        <Text style={styles.text}>${amount}</Text>
        </View>

      </View>
    </Animated.View>
  );
};

export default RenderItem;

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