import React, {useState, useRef} from 'react';
import { SafeAreaView , StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text, Button } from '@ui-kitten/components';
import Income from './Income';
import Expense from './Expense';
import BottomPopup from '../components/BottomPopup';
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
      onSelect={index => navigation.navigate(state.routeNames[index])} style={styles.tabBg}>
      <Tab title='Incomes' style={styles.tabColor}/>
      <Tab title='Expenses'/>
    </TabBar>
  );
  
  const TabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='Income' component={Income}/>
      <Screen name='Expenses' component={Expense}/>
    </Navigator>
  );



const HomeScreen = (props) => {
  const popupRef = useRef(null);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState("");


  const openPopUp = (details)=>{
    setDetails(details);
    setShow(true)
    console.log("pressed")
  }

  const closePopup = ()=>{
    setShow(false)
  }
    return (
       <SafeAreaView style={styles.container}>
        <View style={styles.middle}>
           <Text>Your Net Income</Text>
            <Text style={styles.headerAmount}>N$ 12, 000</Text>
            {/* <Button onPress={openPopUp}>Open Popup</Button> */}
        </View>
         <TabNavigator/>
         <BottomPopup show={show} close={closePopup} onTouchOutside={closePopup} details={details}/>
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
        paddingHorizontal: 20,
        paddingVertical:30,
        backgroundColor: "#1f1f1f"
    },
    headerAmount: {
      fontSize: 30,
      fontWeight: 600
    },
    tabBg: {
      backgroundColor: "#1a1a1a"

    },
    tabColor: {
      color: "white"
    }

  });
  


export default HomeScreen;
