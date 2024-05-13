import {createSlice} from '@reduxjs/toolkit';
import {sleepActions} from './actions';
import {SleepData} from '../../types';

/**
 * This redux state is an object where the key represents
 * the user id and the object is that users sleep data
 */
interface SleepState {
  [userId: string]: UserSleepState;
}
interface UserSleepState {
  status: 'idle' | 'loading' | 'failed';
  error?: string;
  data?: SleepData;
}

export const initialSleepState: SleepState = {};

const sleepSlice = createSlice({
  name: 'sleep',
  reducerPath: 'sleep',
  initialState: initialSleepState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sleepActions.fetchUserSleep, (state, action) => {
        if (action.payload) {
          state[action.payload] = {
            status: 'loading',
          };
        }
      })
      .addCase(sleepActions.receiveUserSleep, (state, action) => {
        state[action.payload.id] = {
          status: 'idle',
          data: action.payload.data,
        };
      })
      .addCase(sleepActions.recieveSleepError, (state, action) => {
        state[action.payload.id] = {
          status: 'idle',
          error: action.payload.error,
        };
      });
  },
});

export default sleepSlice.reducer;
