import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/Login'
import NewOrderScreen from '../screens/NewOrder'
import OrdersListScreen from '../screens/OrdersList'

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'PizzaExpress' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="NewOrderScreen" component={NewOrderScreen} options={{ title: 'Order Now' }}/>
        <Stack.Screen name="OrdersListScreen" component={OrdersListScreen} options={{ title: 'Orders' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};