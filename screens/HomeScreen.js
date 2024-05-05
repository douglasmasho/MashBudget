import React, {useState, useRef, useEffect} from 'react';
import { SafeAreaView , StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text, Button, Icon } from '@ui-kitten/components';
import Income from './Income';
import Expense from './Expense';
import BottomPopup from '../components/BottomPopup';
import {
  db,
  doc,
  orderBy,
  collection,
  onSnapshot as SELECT,
  query,
} from "../Config";
import LottieView from "lottie-react-native";
//this code handles the formatting of the money so it displays with commas and 2 decimal places
const { FormatMoney } = require('format-money-js');
const fm = new FormatMoney({
  decimals: 2
});
const { Navigator, Screen } = createMaterialTopTabNavigator();

  const TopTabBar = ({ navigation, state }) => (
    <TabBar
    indicatorStyle={styles.tabColor}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])} style={styles.tabBg}>
      <Tab title='Incomes' style={styles.tabColor}/>
      <Tab title='Expenses'/>
    </TabBar>
  );
  
  const TabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='Income' component={Income}/>
      <Screen name='Expenses' component={Expense}/>
    </Navigator>
  );



const HomeScreen = (props) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(()=>{

  },[])

   //this method gets the total income figure from the database and then displays it on the screen
   const getTotalIncome = async ()=>{
    await SELECT(doc(db, "totalIncome", "total"), (doc)=>{
      setTotalIncome(doc.data()?.total)
    })
  }

     //this method gets the total expense figure from the database and then displays it on the screen
     const getTotalExpense = async ()=>{
      await SELECT(doc(db, "totalExpense", "total"), (doc)=>{
        setTotalExpense(doc.data()?.total)
      })
    }

    useEffect(()=>{
      getTotalIncome();
      getTotalExpense();
    }, [])

    return (
       <SafeAreaView style={styles.container}>
        <View style={styles.middle}>
           <Text>Your Net Income</Text>
            <Text style={styles.headerAmount}>{fm.from(totalIncome - totalExpense, { symbol: 'N$' })}</Text>
        </View>
         <TabNavigator/>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1a1a1a"

    },
    topContainer: {
      flex: 1,
    },
    middle: {
        paddingHorizontal: 20,
        paddingVertical:30,
        backgroundColor: "#1f1f1f"
    },
    headerAmount: {
      fontSize: 30,
      fontWeight: 600
    },
    tabBg: {
      backgroundColor: "#1a1a1a"

    },
    tabColor: {
      color: "white"
    }

  });
  


export default HomeScreen;
