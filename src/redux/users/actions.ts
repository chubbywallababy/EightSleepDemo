import {createAction} from '@reduxjs/toolkit';
import {User} from '../../types';

const USER_PREFIX = 'user/';

export const usersActions = {
  fetchUsers: createAction(USER_PREFIX + 'fetch'),
  setUsers: createAction<User[]>(USER_PREFIX + 'set'),
  setError: createAction<string>(USER_PREFIX + 'error'),
};
