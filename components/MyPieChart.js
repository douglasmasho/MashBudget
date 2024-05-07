import { Button } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-svg-charts";
const data = [
    {
      key: 1,
      value: 10,
      svg: { fill: "red" },
    },
    {
      key: 2,
      value: 30,
      svg: { fill: "green" },
    },
    {
      key: 3,
      value: 20,
      svg: { fill: "blue" },
    },
  ];
const MyPieChart = () => {
  const [currData, setCurrData] = useState(data);

  const update = ()=>{
    setCurrData(newdata);

  }

  const newdata = [
    {
      key: 1,
      value: 50,
      svg: { fill: "red" },
    },
    {
      key: 2,
      value: 30,
      svg: { fill: "green" },
    },
    {
      key: 3,
      value: 20,
      svg: { fill: "blue" },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {currData ? (
        <>
          <PieChart
            style={{ height: 200 }}
            data={currData}
            innerRadius={30}
            outerRadius={60}
            animate
            
          />
        </>
      ) : null}

      <Button onPress={update}>Update</Button>
    </View>
  );
};

export default MyPieChart;
