import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  usersState => usersState.data.users,
);

export const selectHasUserMadeSelection = (id: string) =>
  createSelector(
    selectUsersState,
    usersState => typeof usersState.data.acceptedSuggestion[id] === 'boolean',
  );

export const didUserAcceptSelection = (id: string) =>
  createSelector(
    selectUsersState,
    usersState => usersState.data.acceptedSuggestion[id],
  );

export const selectUsersStatus = createSelector(
  selectUsersState,
  usersState => usersState.status,
);

export const selectUsersError = createSelector(
  selectUsersState,
  usersState => usersState.error,
);
