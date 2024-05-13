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
import {SleeperDetailView} from './src/views/Details/SleeperDetailView';
import {User} from './src/types';
import {StatusBar} from 'react-native';
import {NavigationHeader} from './src/components/NavigationHeader';
import {NavigationBack} from './src/components/NavigationBack';
import {SuggestionView} from './src/views/SuggestionView';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: User};
  Suggestion: {data: User};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          // Make the navigation header black
          card: '#000',
        },
      }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={SleepersListView}
          options={{
            header: NavigationHeader,
          }}
        />
        <Stack.Screen
          name="Details"
          component={SleeperDetailView}
          options={{
            headerLeft: NavigationBack,
          }}
        />
        <Stack.Screen
          name="Suggestion"
          component={SuggestionView}
          options={{
            headerLeft: NavigationBack,
            title: "Autopilot"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
