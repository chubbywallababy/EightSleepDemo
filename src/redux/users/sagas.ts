import {call, put} from 'redux-saga/effects';
import {SleepService} from '../../services/SleepService';
import {User} from '../../types';
import {usersActions} from './actions';
import {sleepActions} from '../sleep/actions';

export function* fetchUsers() {
  try {
    const data: User[] = yield call(SleepService.getUsers);
    yield put(usersActions.setUsers(data)); // Dispatch with typed data
    for (const i in data) {
      const id = data[i].id;
      yield put(sleepActions.fetchUserSleep(id));
    }
  } catch (error) {
    /**
     * We would have to coordinate with the BE on error structure.
     */
    yield put(usersActions.setError('Unknown error'));
  }
}
