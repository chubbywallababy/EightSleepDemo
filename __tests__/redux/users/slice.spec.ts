import {sleepActions} from '../../../src/redux/sleep/actions';
import sleepReducer, {
  initialSleepState as initialState,
} from '../../../src/redux/sleep/slice';

describe('Sleep Reducer', () => {
  it('should handle fetch user sleep action', () => {
    const action = sleepActions.fetchUserSleep('userId');
    const newState = sleepReducer(initialState, action);

    expect(newState.userId).toEqual({status: 'loading'});
  });

  it('should handle receive user sleep action', () => {
    const action = sleepActions.receiveUserSleep({
      id: 'userId',
      data: {sleepData: 'some data'} as any,
    });
    const newState = sleepReducer(initialState, action);

    expect(newState.userId).toEqual({
      status: 'idle',
      data: {sleepData: 'some data'},
    });
  });

  it('should handle receive sleep error action', () => {
    const action = sleepActions.recieveSleepError({
      error: 'Some error message',
      id: 'userId',
    });
    const newState = sleepReducer(initialState, action);

    expect(newState.userId).toEqual({
      status: 'idle',
      error: 'Some error message',
    });
  });
});
