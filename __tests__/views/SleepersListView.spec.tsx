import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {SleepersListView} from '../../src/views/SleepersListView';
import {mockStore} from '../__mocks__/mockStore';
import {TouchableOpacity} from 'react-native';

jest.mock('../../src/components/SleepLinearGradient', () => ({
  SleepLinearGradient: ({children}: {children: React.ReactNode}) => (
    <>{children}</>
  ),
}));

jest.mock('../../src/components/GlowingBorder', () => ({
  GlowingBorder: ({children}: {children: React.ReactNode}) => <>{children}</>,
}));

jest.mock('../../src/components/AnimatedNumber', () => ({
  AnimatedNumber: () => <></>,
  numberStyles: {text: {}},
}));

describe('boilerplate for SleepersListView', () => {
  it('should render the view', async () => {
    const {root, toJSON} = render(
      <Provider store={mockStore}>
        <SleepersListView />
      </Provider>,
    );

    const view = root.findAllByType(TouchableOpacity);
    expect(view).toHaveLength(3);

    expect(toJSON()).toMatchSnapshot();
  });
});
