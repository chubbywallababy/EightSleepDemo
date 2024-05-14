import {put} from 'redux-saga/effects';
import {SleepData} from '../../types';
import {sleepActions} from './actions';
import {SleepService} from '../../services/SleepService';

/**
 * Fetches the sleep data for a specific user by id
 *
 * @param param0
 */
export function* fetchSleepData({payload: id}: {payload: string}) {
  try {
    const sleepData: SleepData = yield SleepService.getSleepData(id);
    yield put(sleepActions.receiveUserSleep({data: sleepData, id}));
  } catch (error) {
    /**
     * We would have to coordinate with the BE on error structure.
     */
    yield put(sleepActions.recieveSleepError({error: 'Unknown error', id}));
  }
}
