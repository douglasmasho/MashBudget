/**
 * This code handles the details screen that allows the user to edit an expense.
 * There will be inputs, that will be filled with the current values, but they can change the values to what they like.
 * Once done they can click on edit and the UPDATE function will change the value of that specific expense on the database.
 * The SELECT is also used to update the total expense once the individual expense item was edited.
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

import { Text } from "@ui-kitten/components";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button } from "@ui-kitten/components";
import { TextInput } from "react-native";
import { db, doc, setDoc as UPDATE, getDoc as SELECT } from "../Config";
import LottieView from "lottie-react-native";

const EditExpense = (props) => {
  // State variables for expense details
  const [name, setName] = useState(props.route.params.name);
  const [amount, setAmount] = useState(props.route.params.amount);
  const [description, setDescription] = useState(
    props.route.params.description
  );
  const [isLoading, setIsLoading] = useState(false);

  // Ref for animation
  const animation = useRef(null);

  // Auto play animation on mount
  useEffect(() => {
    animation.current?.play();
  }, []);

  // Function to edit expense item
  const addItem = async () => {
    setIsLoading(true);
    try {
      // Update expense item in database
      await UPDATE(doc(db, "expense", props.route.params.id), {
        name,
        amount,
        description,
        time: Date.now(),
        id: props.route.params.id,
      });

      // Fetch total expense from database
      const docSnap = await SELECT(doc(db, "totalExpense", "total"));

      if (docSnap.exists()) {
        // Calculate difference in amount
        const difference =
          parseFloat(amount) - parseFloat(props.route.params.amount);

        // Update total expense in database
        await UPDATE(doc(db, "totalExpense", "total"), {
          total: docSnap.data().total + difference,
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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        // Render loading animation while updating
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
        // Render form to edit expense details
        <>
          <Text style={styles.label}>Change Name</Text>
          <TextInput
            placeholder="Expense Name"
            value={name}
            style={styles.input}
            placeholderTextColor={"white"}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Text style={styles.label}>Change Amount</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Expense Amount (N$)"
            value={amount}
            style={styles.input}
            placeholderTextColor={"white"}
            onChangeText={(nextValue) => setAmount(nextValue)}
          />

          <Text style={styles.label}>Change Description</Text>
          <TextInput
            placeholder="Expense Description"
            value={description}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={"white"}
            onChangeText={(nextValue) => setDescription(nextValue)}
          />
          <Button style={styles.button} onPress={addItem}>
            Edit Expense
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};

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
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default EditExpense;
