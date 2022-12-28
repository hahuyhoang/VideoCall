/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CallScreen from '../screens/CallScreen';
import CallingScreen from '../screens/CallingScreen';
import ContactScreen from '../screens/ContactScreen';
import IncommingCalling from '../screens/IncommingCallScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Contacts" component={ContactScreen} />

        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="CallingScreen" component={CallingScreen} />
          <Stack.Screen name="CallScreen" component={CallScreen} />
          <Stack.Screen name="IncommingCalling" component={IncommingCalling} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
