import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar, Tab, Layout, Text, Button, Icon } from "@ui-kitten/components";
import Income from "./Income";
import Expense from "./Expense";
import BottomPopup from "../components/BottomPopup";
import {
  db,
  doc,
  orderBy,
  collection,
  onSnapshot as SELECT,
  query,
} from "../Config";
import BalanceDonut from "./BalanceDonut";


//this code handles the formatting of the money so it displays with commas and 2 decimal places
const { FormatMoney } = require("format-money-js");
const fm = new FormatMoney({
  decimals: 2,
});
const { Navigator, Screen } = createMaterialTopTabNavigator();

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

const TabNavigator = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="Income" component={Income} />
    <Screen name="Expenses" component={Expense} />
  </Navigator>
);

const HomeScreen = (props) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  //this method gets the total income figure from the database and then displays it on the screen
  const getTotalIncome = async () => {
    await SELECT(doc(db, "totalIncome", "total"), (doc) => {
      setTotalIncome(doc.data()?.total);
    });
  };

  //this method gets the total expense figure from the database and then displays it on the screen
  const getTotalExpense = async () => {
    await SELECT(doc(db, "totalExpense", "total"), (doc) => {
      setTotalExpense(doc.data()?.total);
    });
  };

  useEffect(() => {
    getTotalIncome();
    getTotalExpense();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.middle}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate("Chart")}}>
              {/* <PieChart  donut innerCircleColor="#1f1f1f" radius={70} data={data} /> */}
              <BalanceDonut/>
        </TouchableOpacity>
        <View style={styles.inner}>
          <Text>Your Balance</Text>
          <Text style={styles.headerAmount}>
            {fm.from(totalIncome - totalExpense, { symbol: "N$" })}
          </Text>
          <View>
            <View style={styles.row}>
              <View style={[styles.colordot, styles.marginRight,{backgroundColor: "#46a0f8"}]}></View>
               <Text style={styles.marginRight}>Income</Text>
               <Text>{(totalIncome / (totalIncome + totalExpense) * 100).toFixed(0)}%</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.colordot, styles.marginRight,{backgroundColor: "#E00000"}]}></View>
               <Text style={styles.marginRight}>Expenses</Text>
               <Text>{(totalExpense / (totalIncome + totalExpense) * 100).toFixed(0)}%</Text>
            </View>
          </View>
        </View>
      </View>
      <TabNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  colordot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  inner: {
    marginLeft: 10
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
    alignItems: "center"
  },
  headerAmount: {
    fontSize: 30,
    fontWeight: 600,
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
