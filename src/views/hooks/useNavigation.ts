import React from 'react';
import {NavigationContext} from '@react-navigation/native';

/**
 * A convenience function to access navigation context
 *
 * @returns {NavigationProp}
 */
export const useNavigation = () => {
  return React.useContext(NavigationContext);
};
