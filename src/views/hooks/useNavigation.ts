import React from 'react';
import {NavigationContext} from '@react-navigation/native';

export const useNavigation = () => {
  return React.useContext(NavigationContext);
};
