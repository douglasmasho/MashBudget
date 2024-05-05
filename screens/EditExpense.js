import { Text } from "@ui-kitten/components";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button } from "@ui-kitten/components";
// import { Input } from "@ui-kitten/components";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  db,
  doc,
  setDoc as UPDATE,
  getDoc as SELECT,
} from "../Config";
import LottieView from "lottie-react-native";

const EditExpense = (props) => {
  const [name, setName] = useState(props.route.params.name);
  const [amount, setAmount] = useState(props.route.params.amount);
  const [description, setDescription] = useState(
    props.route.params.description
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log(props.route.params.id);

  const animation = useRef(null);
  useEffect(() => {

    animation.current?.play();
  }, []);
  // add new item
  const addItem = async () => {
    setIsLoading(true);
    try {
      await UPDATE(doc(db, "expense", props.route.params.id), {
        name,
        amount,
        description,
        time: Date.now(),
        id: props.route.params.id,
      });
      const docSnap = await SELECT(doc(db, "totalExpense", "total"));

      if (docSnap.exists()) {
        const difference = parseFloat(amount) - parseFloat(props.route.params.amount);
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
  icon: {
    marginRight: 30,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default EditExpense;
