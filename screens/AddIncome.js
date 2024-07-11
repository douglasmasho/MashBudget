/**
 * This component handles the screen where the user can input details of their income and then add them to the database.
 * It collects the user input and uses INSERT to add data to the database and SELECT to get the previous total incomes and then increase it when the new income has been added
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

import { Text } from "@ui-kitten/components";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button } from "@ui-kitten/components";
import { TextInput } from "react-native";
import {
  db,
  doc,
  setDoc as INSERT,
  getDoc as SELECT,
} from "../Config";
import uuid from "react-native-uuid";
import LottieView from "lottie-react-native";

const AddIncome = (props) => {
  // State variables to manage user input and loading state
  const [name, setName] = useState(""); // Name of the income
  const [amount, setAmount] = useState(""); // Amount of the income
  const [description, setDescription] = useState(""); // Description of the income
  const [isLoading, setIsLoading] = useState(false); // Loading state

  console.log("props", props);

  // Ref for Lottie animation
  const animation = useRef(null);

  // Effect hook to play animation on mount
  useEffect(() => {
    animation.current?.play();
  }, []);

  // Method to add a new income
  const addItem = async () => {
    setIsLoading(true);
    try {
      const id = uuid.v4();
      // Inserting new income data into the database
      await INSERT(doc(db, "income", id), {
        name,
        amount,
        description,
        time: Date.now(),
        id,
      });
      // Retrieving previous total income
      const docSnap = await SELECT(doc(db, "totalIncome", "total"));

      if (docSnap.exists()) {
        // Updating total income in the database
        await INSERT(doc(db, "totalIncome", "total"), {
          total: docSnap.data().total + parseFloat(amount),
        });
      } else {
        console.log("No such document!");
      }
      console.log("success");
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false);
      props.navigation.goBack();
    }
  };

  // Rendering the component
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        // Loading animation view
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
        // Input fields and button for adding income
        <>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter your income name"
            value={name}
            style={styles.input}
            placeholderTextColor={"white"}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Text style={styles.label}>Amount</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter your income amount (N$)"
            value={amount}
            style={styles.input}
            placeholderTextColor={"white"}
            onChangeText={(nextValue) => setAmount(nextValue)}
          />

          <Text style={styles.label}>Description</Text>

          <TextInput
            placeholder="Enter your income description"
            value={description}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={"white"}
            onChangeText={(nextValue) => setDescription(nextValue)}
          />
          <Button style={styles.button} onPress={addItem}>
            Add Income
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    marginBottom: 20,
    color: "white",
  },
  button: {
    borderRadius: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: 30,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default AddIncome;
