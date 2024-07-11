/**
 * This code handles the details screen for an income.
 * It shows the income name, amount, description, and relative time (e.g., 2 days ago).
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const DetailsIncome = (props) => {
    // Extracting data from route params
    const { name, description, time, amount } = props.route.params;

    return (
        <View style={styles.middle}>
            {/* Income name and amount */}
            <View style={styles.row}>
                <Text style={styles.headerAmount}>{name}</Text>
                <Text style={styles.amount}>{amount}</Text>
            </View>

            {/* Income time */}
            <Text style={styles.date}>{time}</Text>

            {/* Income description */}
            <ScrollView style={styles.detailsView}>
                <Text style={styles.detailsHeader}>Details</Text>
                <Text style={styles.details}>{description}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
    },
    headerAmount: {
        fontSize: 30,
        color: "#66B6FF",
        marginRight: 10,
        fontFamily: "PBold"
    },
    middle: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#1f1f1f",
        fontFamily: "PRegular"
    },
    date: {
        color: "white",
        fontSize: 14,
        marginBottom: 10,
        textTransform: "capitalize",
        fontFamily: "PRegular"
    },
    amount: {
        color: "white",
        fontSize: 20,
        marginBottom: 5,
        fontFamily: "PRegular"
    },
    detailsHeader: {
        color: "white",
        fontSize: 18,
        marginBottom: 10,
        fontFamily: "PRegular"
    },
    detailsView: {
        backgroundColor: "#2e2e2e",
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    details: {
        color: "white",
        fontSize: 16,
        textAlign: "justify",
        fontFamily: "PRegular"
    }
});

export default DetailsIncome;
