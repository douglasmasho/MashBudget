import React from 'react';
import { View, Text } from 'react-native';

const ChartScreen = (props) => {
    console.log(props.route.params.name)
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}



export default ChartScreen;
