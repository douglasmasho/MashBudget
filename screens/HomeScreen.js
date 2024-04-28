import React, {useState} from 'react';
import { SafeAreaView , StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
const { Navigator, Screen } = createMaterialTopTabNavigator();

const UsersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>USERS</Text>
    </Layout>
  );
  
  const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>ORDERS</Text>
    </Layout>
  );


  const TopTabBar = ({ navigation, state }) => (
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title='USERS'/>
      <Tab title='ORDERS'/>
    </TabBar>
  );
  
  const TabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='Users' component={UsersScreen}/>
      <Screen name='Orders' component={OrdersScreen}/>
    </Navigator>
  );

const HomeScreen = (props) => {
    return (
       <SafeAreaView style={styles.container}>
        <View style={styles.middle}>
            <Text>Your Net Income</Text>
        </View>
         <TabNavigator/>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1a1a1a"

    },
    topContainer: {
      flex: 1,
    },
    middle: {
        paddingHorizontal: 5,
        paddingVertical:10,
        backgroundColor: "#1f1f1f"
    }
  });
  


export default HomeScreen;
