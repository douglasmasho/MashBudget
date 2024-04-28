const TabNavigator = createBottomTabNavigator({
    Screen1: {
      screen: Screen1,
      navigationOptions: {
        tabBarLabel: 'Screen 1',
      },
    },
    Screen2: {
      screen: Screen2,
      navigationOptions: {
        tabBarLabel: 'Screen 2',
      },
    },
  });
  
  const AppContainer = createAppContainer(TabNavigator);
  
  export default AppContainer;
  