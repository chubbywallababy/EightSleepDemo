import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {mockStore} from '../__mocks__/mockStore';
import {SleeperDetailView} from '../../src/views/Details/SleeperDetailView';
import {users} from '../__mocks__/users';
import {SleepView} from '../../src/components/common';

jest.mock('../../src/components/CircularProgress', () => ({
  CircularProgress: ({children}: {children: React.ReactNode}) => (
    <>{children}</>
  ),
}));

jest.mock('../../src/components/SleepLinearGradient', () => ({
  SleepLinearGradient: ({children}: {children: React.ReactNode}) => (
    <>{children}</>
  ),
}));

jest.mock('../../src/components/SleepDataLineGraph', () => ({
  SleepDataLineGraph: () => <></>,
}));

jest.mock('../../src/components/ProgressBar', () => ({
  ProgressBar: () => <></>,
  DottedLine: () => <></>,
}));

jest.mock('../../src/components/AnimatedNumber', () => ({
  AnimatedNumber: () => <></>,
  numberStyles: {text: {}},
}));

describe('boilerplate for SleepersListView', () => {
  it('should render the app', async () => {
    // Render the app
    const {root, toJSON} = render(
      <Provider store={mockStore}>
        <SleeperDetailView
          route={{params: {data: users[0]}, key: '', name: 'Details'}}
          navigation={
            {
              navigate: jest.fn(),
              dispatch: jest.fn(),
              reset: jest.fn(),
              goBack: jest.fn(),
              isFocused: jest.fn(),
              canGoBack: jest.fn(),
              getId: jest.fn(),
              getState: jest.fn(),
              getParent: jest.fn(),
              setOptions: jest.fn(),
              setParams: jest.fn(),
              addListener: jest.fn(),
              removeListener: jest.fn(),
            } as any
          }
        />
      </Provider>,
    );

    const view = root.findAllByType(SleepView);
    expect(view).toHaveLength(4);

    expect(toJSON()).toMatchSnapshot();
  });
});
