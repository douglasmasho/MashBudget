/**
 * This code handles the expenses screen and its functionality.
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

// Importing necessary dependencies
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { db, collection, orderBy, onSnapshot as SELECT, query } from "../Config";
import LottieView from "lottie-react-native";
import ExpenseItem from "../components/ExpenseItem";

// Importing money formatting library
const { FormatMoney } = require('format-money-js');
const fm = new FormatMoney({ decimals: 2 });

const Expense = (props) => {
   // State variables for expenses, loading state, and total expenses
   const [expenses, setExpenses] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const animation = useRef(null);
   const [total, setTotal] = useState(0);

   // Start the loading animation
   useEffect(() => {
     animation.current?.play();
   }, []);

   // Fetch all expenses from the database and listen for changes
   const getItems = async () => {
     try {
       const q = query(collection(db, "expense"), orderBy("time", "desc"));
       await SELECT(q, (querySnapshot) => {
         setIsLoading(false);
         const expenses = [];
         querySnapshot.forEach((doc) => {
           expenses.push(doc.data());
         });
         setExpenses(expenses)
       });
     } catch (e) {
       console.log(e);
     }
   };

   // Get the total expense from the database
   const getTotal = async () => {
     await SELECT(doc(db, "totalExpense", "total"), (doc) => {
       setTotal(doc.data()?.total)
     })
   }

   // Call getItems() and getTotal() when the screen mounts
   useEffect(() => {
     getItems();
     getTotal();
   }, []);

   return (
     // Layout of the page
     <View style={styles.page}>
       {
         isLoading ? 
         // Render loading animation
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
         </View> :
         // Render expenses and add expense button
         <>
           <View style={styles.buttonContainer}>
             <Text style={styles.headerAmount}>Total: {fm.from(total, { symbol: 'N$' })}</Text>
             <Button
               style={styles.button}
               onPress={() => props.navigation.navigate("AddExpense")}
             >
               Add Expense
             </Button>
           </View>
           <ScrollView>
             {expenses.map((expense) => (
               <ExpenseItem
                 key={expense.id}
                 id={expense.id}
                 name={expense.name}
                 description={expense.description}
                 amount={expense.amount}
                 time={expense.time}
                 navigation={props.navigation}
               />
             ))}
           </ScrollView>
         </>
       }
     </View>
   );
}

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
    color: "#FF8282",
    fontFamily: "PRegular"
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

export default Expense;
