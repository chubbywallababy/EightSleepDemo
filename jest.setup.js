/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';
import {mockStore} from './__tests__/__mocks__/mockStore';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Import the component to test
jest.mock('react-redux', () => ({
  Provider: ({children}) => children,
  // Allow views to access mock state
  useSelector: jest.fn(selectorFn => selectorFn(mockStore.getState())),
  useDispatch: jest.fn(() => jest.fn()),
}));

// Mocking the createNativeStackNavigator function
jest.mock('@react-navigation/native-stack', () => ({
  __esModule: true,
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: jest.fn(),
    Screen: jest.fn(),
    Group: jest.fn(),
    Header: jest.fn(),
    NavigationContainer: jest.fn(),
  })),
}));

// Mocking the AnimatedCircularProgress component
jest.mock('react-native-circular-progress', () => ({
  AnimatedCircularProgress: jest.fn(({children}) => children(50)), // Mocking the component's behavior, passing fill as 50
}));

// Mocking the LineChart component
jest.mock('react-native-gifted-charts', () => ({
  LineChart: jest.fn(({data}) => {
    return JSON.stringify(data);
  }),
  PieChart: jest.fn(({data}) => {
    return JSON.stringify(data);
  }),
}));

jest.mock('react-native-toast-message', () => null);
