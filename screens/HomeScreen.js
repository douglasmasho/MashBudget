/**
 * This code handles the home screen, it also incorporates the smaller components and smaller screens.
 * It contains both the income and expense screens in a tab view so the user can switch between them easily.
 * It also contains the part which displays the user's balance after finding the difference between income and expenses.
 * It also shows the BalanceDonut which displays the percentage that the total incomes and expenses make up of your balance.
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar, Tab, Text } from "@ui-kitten/components";
import Income from "./Income";
import Expense from "./Expense";
import { db, doc, onSnapshot as SELECT } from "../Config";
import BalanceDonut from "./BalanceDonut";

// Importing money formatting library
const { FormatMoney } = require("format-money-js");
const fm = new FormatMoney({ decimals: 2 });
const { Navigator, Screen } = createMaterialTopTabNavigator();

// Custom top tab bar component
const TopTabBar = ({ navigation, state }) => (
  <TabBar
    indicatorStyle={styles.tabColor}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={styles.tabBg}
  >
    <Tab title="Incomes" style={styles.tabColor} />
    <Tab title="Expenses" />
  </TabBar>
);

// Tab navigator component
const TabNavigator = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="Income" component={Income} />
    <Screen name="Expenses" component={Expense} />
  </Navigator>
);

// Home screen component
const HomeScreen = (props) => {
  // State variables for total income and total expense
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Fetch total income from the database
  const getTotalIncome = async () => {
    await SELECT(doc(db, "totalIncome", "total"), (doc) => {
      setTotalIncome(doc.data()?.total);
    });
  };

  // Fetch total expense from the database
  const getTotalExpense = async () => {
    await SELECT(doc(db, "totalExpense", "total"), (doc) => {
      setTotalExpense(doc.data()?.total);
    });
  };

  // Call getTotalIncome() and getTotalExpense() when the component mounts
  useEffect(() => {
    getTotalIncome();
    getTotalExpense();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.middle}>
        {/* BalanceDonut component */}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Chart");
          }}
        >
          <BalanceDonut />
        </TouchableOpacity>
        <View style={styles.inner}>
          <Text>Your Balance</Text>
          {/* Displaying the balance */}
          <Text style={styles.headerAmount}>
            {fm.from(totalIncome - totalExpense, { symbol: "N$" })}
          </Text>
          {/* Displaying the percentage of income and expenses */}
          <View>
            <View style={styles.row}>
              <View
                style={[
                  styles.colordot,
                  styles.marginRight,
                  { backgroundColor: "#46a0f8" },
                ]}
              ></View>
              <Text style={styles.marginRight}>Income</Text>
              <Text>
                {((totalIncome / (totalIncome + totalExpense)) * 100).toFixed(
                  0
                )}
                %
              </Text>
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.colordot,
                  styles.marginRight,
                  { backgroundColor: "#E00000" },
                ]}
              ></View>
              <Text style={styles.marginRight}>Expenses</Text>
              <Text>
                {((totalExpense / (totalIncome + totalExpense)) * 100).toFixed(
                  0
                )}
                %
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Tab navigator for incomes and expenses */}
      <TabNavigator />
    </SafeAreaView>
  );
};

// Styles for components
const styles = StyleSheet.create({
  marginRight: {
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  colordot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  inner: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  topContainer: {
    flex: 1,
  },
  middle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerAmount: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "PBold",
  },
  tabBg: {
    backgroundColor: "#1a1a1a",
  },
  tabColor: {
    color: "white",
  },
});

export default HomeScreen;
