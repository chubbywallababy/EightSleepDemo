import {createAction} from '@reduxjs/toolkit';
import {SleepData} from '../../types';

export const sleepActions = {
  fetchUserSleep: createAction<string>('sleep/fetch'),
  receiveUserSleep: createAction<ReceiveUserSleepAction>('sleep/receive'),
  recieveSleepError: createAction<ReceiveUserErrorAction>('sleep/error'),
};

interface ReceiveUserSleepAction {
  data: SleepData;
  id: string;
}

interface ReceiveUserErrorAction {
  error: string;
  id: string;
}
