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
import LottieView from "lottie-react-native";
import MyPieChart from "../components/MyPieChart";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";


const data=[ {
  value: 47,
  color: '#009FFF',
  gradientCenterColor: '#006DFF',
},
{value: 10, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
{value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
{value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'}, ]

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
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
  useEffect(() => {}, []);

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
              <PieChart  donut innerCircleColor="#1f1f1f" radius={70} data={data} />
        </TouchableOpacity>
        <View style={styles.inner}>
          <Text>Your Balance</Text>
          <Text style={styles.headerAmount}>
            {fm.from(totalIncome - totalExpense, { symbol: "N$" })}
          </Text>
        </View>
      </View>
      <TabNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 30,
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    justifyContent: "space-evenly"
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
