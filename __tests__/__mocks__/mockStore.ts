import {configureStore} from '@reduxjs/toolkit';
import usersReducer, {UserState} from '../../src/redux/users/slice';
import sleepReducer, {SleepState} from '../../src/redux/sleep/slice';
import {users, user1Data, user2Data, user3Data} from './users';

const userState: UserState = {
  status: 'idle',
  error: null,
  data: {
    users,
    acceptedSuggestion: {},
  },
};

const sleepState: SleepState = {
  [users[0].id]: {
    status: 'idle',
    data: user1Data,
  },
  [users[1].id]: {
    status: 'idle',
    data: user2Data,
  },
  [users[2].id]: {
    status: 'idle',
    data: user3Data,
  },
};

export const mockStore = configureStore({
  preloadedState: {
    users: userState,
    sleep: sleepState,
  },
  reducer: {
    users: usersReducer,
    sleep: sleepReducer,
  },
});
