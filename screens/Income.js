/**
 * This code handles the income screen and its functionality
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

// Importing necessary dependencies
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import IncomeItem from "../components/IncomeItem"; // Importing the IncomeItem component
import {
  db,
  doc,
  orderBy,
  collection,
  onSnapshot as SELECT,
  query,
} from "../Config";
import LottieView from "lottie-react-native";

// Importing money formatting library
const { FormatMoney } = require('format-money-js');
const fm = new FormatMoney({
  decimals: 2
});

// Income screen component
const Income = (props) => {
  // State variables for incomes, loading state, and total income
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const animation = useRef(null);
  const [total, setTotal] = useState(0);

  // Start the loading animation when the component mounts
  useEffect(() => {
    animation.current?.play();
  }, []);

  // Fetch all incomes from the database and listen for changes
  const getItems = async () => {
    try {
      const q = query(collection(db, "income"), orderBy("time", "desc"));
      SELECT(q, (querySnapshot) => {
        setIsLoading(false);
        const incomes = [];
        querySnapshot.forEach((doc) => {
          incomes.push(doc.data());
        });
        setIncomes(incomes);
      });
    } catch (e) {
      console.log(e); // Log any errors
    }
  };

  // Fetch the total income from the database
  const getTotal = async () => {
    SELECT(doc(db, "totalIncome", "total"), (doc) => {
      setTotal(doc.data()?.total);
    });
  };

  // Call getItems() and getTotal() when the component shows
  useEffect(() => {
    getItems();
    getTotal();
  }, []);

  return (
    // Layout of the income screen
    <View style={styles.page}>
      {isLoading ? (
        // Show loading animation if data is still loading
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
        </View>
      ) : (
        <>
          {/* Display total income and Add Income button */}
          <View style={styles.buttonContainer}>
            <Text style={styles.headerAmount}>Total: {fm.from(total, { symbol: 'N$' })}</Text>
            <Button
              style={styles.button}
              onPress={() => props.navigation.navigate("AddIncome")}
            >
              Add Income
            </Button>
          </View>
          {/* Display list of income items */}
          <ScrollView>
            {incomes.map((income) => (
              <IncomeItem
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
      )}
    </View>
  );
};

// Styles for components
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
    fontWeight: '600',
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
