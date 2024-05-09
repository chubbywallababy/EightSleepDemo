import {User} from '../../types/User';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Define type for API status
export enum ApiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
}

// Define type for Redux state slice
export interface UserState {
  status: ApiStatus;
  error: string | null;
  data: User[];
}
