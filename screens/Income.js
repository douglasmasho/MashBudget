/**
 * This code handles the income screen and its functionality
 * 
 */

//this part imports all the dependencies needed for the screen to function 
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import Incomeitem from "../components/Incomeitem";
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



//this is the income screen
const Income = (props) => {
  //this stores the value of incomes, the loading state, the total income
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const animation = useRef(null);
  const [total, setTotal] = useState(0);

  //this method starts the loading animation
  useEffect(() => {
    animation.current?.play();
  }, []);


  //this method collects all the incomes from the database, it also listens to any changes made to the incomes records. So if any change happens, it will fetch the updated list and then display the list on the screen.
  const getItems = async () => {
    try {
      //the query specifies the specific document we want to get from our database, in this case we want the document with all the incomes
      const q = query(collection(db, "income"), orderBy("time", "desc"));
      //the select method will then fetch the document specified by the query
      SELECT(q, (querySnapshot) => {
      setIsLoading(false);
        const incomes = [];
        querySnapshot.forEach((doc) => {
          incomes.push(doc.data());
        });
        //we then use this method to update all the incomes on the screen
        setIncomes(incomes)
      });
    } catch (e) {
      //this part catches any errors
      console.log(e);
    } finally{
    }
  };

  //this method gets the total income figure from the database and then displays it on the screen
  const getTotal = async ()=>{
    await SELECT(doc(db, "totalIncome", "total"), (doc)=>{
      setTotal(doc.data()?.total)
    })
  }

  //this function calls the getItems() and getTotal() method when the screen shows
  useEffect(() => {
    getItems();
    getTotal();
  }, []);
  return (
    // This code below is the layout of our page, it determines the content that is shown on the screen
    <View style={styles.page}>
      {
        isLoading? 
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../assets/loading.json")}
          />
        </View>:
        <>
        <View style={styles.buttonContainer}>
        <Text style={styles.headerAmount}>Total: {fm.from(total, { symbol: 'N$' })}</Text>
        <Button
          style={styles.button}
          onPress={() => props.navigation.navigate("AddIncome")}
        >
          Add Income
        </Button>
      </View>
      <ScrollView>
        {incomes.map((income) => (
          <Incomeitem
            key={income.id}
            id={income.id}
            name={income.name}
            description={income.description}
            amount={income.amount}
            time={income.time}
            navigation={props.navigation}
          />
        ))}
      </ScrollView>

        </>
      }
      
      
    </View>
  );
};

//this code stores all the styling of the components in this screen. it shows all the colors, font sizes etc
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerAmount: {
    fontSize: 22,
    fontWeight: 600,
    color: "#66B6FF",
  },
  button: {
    borderRadius: 30,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  
});

export default Income;
