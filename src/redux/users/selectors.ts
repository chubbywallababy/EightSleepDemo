import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  usersState => usersState.data,
);

export const selectUsersStatus = createSelector(
  selectUsersState,
  usersState => usersState.status,
);

export const selectUsersError = createSelector(
  selectUsersState,
  usersState => usersState.error,
);
