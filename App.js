/**
 * THis is the entry point of the app which houses all the screens and components in the app
 * it handles the navigation between the different screens and the routes of each screen
 * It also handles what is to be shown on the header of each screen
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */
import React, { useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import AddIncome from "./screens/AddIncome";
import DetailsIncome from "./screens/DetailsIncome";
import EditIncome from "./screens/EditIncome";
import AddExpense from "./screens/AddExpense";
import DetailsExpense from "./screens/DetailsExpense";
import EditExpense from "./screens/EditExpense";
import { useFonts } from "expo-font";
import DonutChartContainer from "./screens/DonutChartScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Component for the header displayed on each screen
const HeaderComp = () => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Image
          style={[{ width: 50, height: 50, borderRadius: 200 }, styles.image]}
          source={require("./assets/dougie.jpeg")}
        />
        <View style={styles.leftTextContainer}>
          <Text style={styles.greeting}>Hi Douglas</Text>
          <Text style={styles.title}>Your Budget</Text>
        </View>
      </View>

      <View style={styles.right}>
        <View>
          <View style={styles.pill}>
            <Text style={styles.LogoText}>MashBudget</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Main App Component
export default function App() {
  const [isLoaded] = useFonts({
    PRegular: require("./assets/fonts/PRegular.ttf"),
    PBold: require("./assets/fonts/PBold.ttf"),
  });

  const Stack = createNativeStackNavigator();

  // Wait until fonts are loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {/* Navigation screens */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Welcome",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 20 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
                headerTitle: (props) => <HeaderComp />,
              }}
            />
            <Stack.Screen
              name="Chart"
              component={DonutChartContainer}
              options={{
                title: "Financial Report",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
            <Stack.Screen
              name="AddIncome"
              component={AddIncome}
              options={{
                title: "Add Income",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
            <Stack.Screen
              name="AddExpense"
              component={AddExpense}
              options={{
                title: "Add Expense",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
            <Stack.Screen
              name="DetailsIncome"
              component={DetailsIncome}
              options={{
                title: "Income Details",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
            <Stack.Screen
              name="DetailsExpense"
              component={DetailsExpense}
              options={{
                title: "Expense Details",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
            <Stack.Screen
              name="EditIncome"
              component={EditIncome}
              options={{
                title: "Edit Income",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
            <Stack.Screen
              name="EditExpense"
              component={EditExpense}
              options={{
                title: "Edit Expense",
                headerTintColor: "#fff",
                headerTitleStyle: { fontSize: 25 },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  header: { flexDirection: "row" },
  left: { flex: 1, flexDirection: "row", alignItems: "center" },
  leftTextContainer: { flex: 1, flexDirection: "column", width: "80%" },
  greeting: { color: "white", fontFamily: "PBold" },
  title: { color: "white", fontFamily: "PRegular" },
  image: { marginRight: 10 },
  right: { flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" },
  pill: { backgroundColor: "#242424", borderColor: "#2b2d2d", borderRadius: 200, paddingHorizontal: 10, paddingVertical: 5, fontFamily: "PBold" },
  LogoText: { color: "white", fontSize: 18, fontFamily: "PBold" },
});
