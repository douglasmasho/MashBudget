/**
 * This component handles the rendering of colored paths representing a single amount as a percentage of the pie.
 * For example, if an expense is 50% of the total expense, a path will be rendered with that expense's color and that path will take up 50% of the pie (donut in this case).
 * Authored by Douglas Mashonganyika, available at https://github.com/douglasmasho/MashBudget
 */

// Importing necessary modules and components
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { Text, Divider } from "@ui-kitten/components";
import moment from "moment";
import ActionSheet from "react-native-actions-sheet";
import {
  db,
  doc,
  deleteDoc as DELETE,
  setDoc as UPDATE,
  getDoc as SELECT,
} from "../Config";
import LottieView from "lottie-react-native";

// Importing FormatMoney module for currency formatting
const { FormatMoney } = require("format-money-js");

// Creating an instance of FormatMoney
const fm = new FormatMoney({
  decimals: 2,
});

// ExpenseItem Component
const ExpenseItem = ({ name, amount, description, time, navigation, id }) => {
  // Ref for action sheet menu
  let actionSheet = useRef();
  // Options for the action sheet menu
  let optionArray = ["View Details", "Edit", "Delete", "Cancel"];
  
  // Function to show the action sheet menu
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  // State to manage loading animation
  const [isLoading, setIsLoading] = useState(false);
  // Ref for Lottie animation
  const animation = useRef(null);
  
  // Effect hook to play animation on mount
  useEffect(() => {
    animation.current?.play();
  }, []);

  // Method to delete an expense
  const deleteExpense = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        // Delete the expense from the database
        await DELETE(doc(db, "expense", id));
        // Decrease the total expense
        const docSnap = await SELECT(doc(db, "totalExpense", "total"));

        if (docSnap.exists()) {
          await UPDATE(doc(db, "totalExpense", "total"), {
            total: docSnap.data().total - parseFloat(amount),
          });
        } else {
          console.log("No such document!");
        }
        console.log("success");
      } catch (e) {
        console.log(e);
        alert("Error Fetching");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  // Rendering the component
  return (
    <>
      <TouchableOpacity onPress={showActionSheet}>
        <View style={styles.expenseItem}>
          <View style={styles.details}>
            <Text style={styles.detailsName}>{name}</Text>
            <Text style={styles.detailsTime}>{moment(time).fromNow()}</Text>
          </View>
          <Text style={styles.amount}>
            {fm.from(parseFloat(amount), { symbol: "N$" })}
          </Text>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheet}
        title="Options"
        options={optionArray}
        cancelButtonIndex={4}
      >
        {isLoading ? (
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
          <View style={styles.actionSheet}>
            <Text style={styles.header}>{name}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailsExpense", {
                  name,
                  description,
                  amount: fm.from(parseFloat(amount), { symbol: "N$" }),
                  time: moment(time).fromNow(),
                })
              }
            >
              <View style={styles.option}>
                <Text style={styles.text}>View Details</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditExpense", {
                  id,
                  name,
                  description,
                  amount,
                })
              }
            >
              <View style={styles.option}>
                <Text style={styles.text}>Edit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteExpense}>
              <View style={styles.option}>
                <Text style={[styles.text, styles.redText]}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ActionSheet>
    </>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  actionSheet: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "#1f1f1f",
  },
  header: {
    fontSize: 22,
    textAlign: "center",
    color: "#66B6FF",
    marginBottom: 20,
    fontFamily: "PRegular",
  },
  divider2: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#454545",
  },
  redText: {
    color: "red",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "PRegular",
  },
  expenseItem: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    width: "100%",
    fontFamily: "PRegular",
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: "#290000",
    borderRadius: 20,
  },
  details: {
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "PRegular",
  },
  detailsName: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "PRegular",
  },
  detailsTime: {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: "PRegular",
  },
  amount: {
    fontSize: 18,
    fontFamily: "PRegular",
  },
  divider: {
    backgroundColor: "#1e1e1e",
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    backgroundColor: "#1f1f1f",
  },
  option: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    marginBottom: 10,
    color: "white",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
  },
});

export default ExpenseItem;
