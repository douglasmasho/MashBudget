import React from "react";
import { ProgressBarAndroidComponent, ScrollView, StyleSheet, Text, View } from "react-native";

const DetailsExpense = (props) => {
    const {name, description, time, amount} = props.route.params
    // console.log(props.route.params)
  return (
    <View style={styles.middle}>
        <View style={styles.row}>
        <Text style={styles.headerAmount}>{name}</Text>
      <Text style={styles.amount}>{amount}</Text>

        </View>
      <Text style={styles.date}>{time}</Text>
      <ScrollView style={styles.detailsView}>
      <Text style={styles.detailsHeader}>Details</Text>
        <Text style={styles.details}>{description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
        // flexDirection: "row",
        // alignItems: "flex-end"
    },
  headerAmount: {
    fontSize: 30,
    color: "#66B6FF",
    marginRight: 10,
    fontFamily: "PBold"
  },
  middle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1f1f1f",
    fontFamily: "PRegular"
  },
  date: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
    textTransform: "capitalize",
    fontFamily: "PRegular"
    
  },
  amount: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "PRegular"

  },
  detailsHeader: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "PRegular"

  },
  detailsView: {
    backgroundColor: "#2e2e2e",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  details: {
    color: "white",
    fontSize: 16,
    textAlign: "justify",
    fontFamily: "PRegular"

  }
});

export default DetailsExpense;
