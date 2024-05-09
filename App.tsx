/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SleepersListView} from './src/views/SleepersListView';
import {SleeperDetailView} from './src/views/SleeperDetailView';
import {User} from './src/types';
import {StatusBar} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: User};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar
        backgroundColor="#61dafb"
        barStyle='light-content'
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={SleepersListView}
        />
        <Stack.Screen
          name="Details"
          component={SleeperDetailView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
