import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {mockStore} from '../__mocks__/mockStore';
import {users} from '../__mocks__/users';
import {SuggestionView} from '../../src/views/SuggestionView';
import {TouchableOpacity} from 'react-native';

describe('boilerplate for SuggestionView', () => {
  it('should render the view', async () => {
    // Render the app
    const {root} = render(
      <Provider store={mockStore}>
        <SuggestionView
          route={{params: {data: users[1]}, key: '', name: 'Suggestion'}}
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

    const view = root.findAllByType(TouchableOpacity);
    expect(view).toHaveLength(2);
  });
});
