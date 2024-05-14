import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import usersReducer from './users/slice';
import sleepReducer from './sleep/slice';
import createSagaMiddleware from 'redux-saga';
import {fetchUsers} from './users/sagas';
import {takeEvery} from 'redux-saga/effects';
import {usersActions} from './users/actions';
import {sleepActions} from './sleep/actions';
import {fetchSleepData} from './sleep/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    users: usersReducer,
    sleep: sleepReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});

function* rootSaga() {
  yield takeEvery(usersActions.fetchUsers, fetchUsers);
  yield takeEvery(sleepActions.fetchUserSleep, fetchSleepData);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
