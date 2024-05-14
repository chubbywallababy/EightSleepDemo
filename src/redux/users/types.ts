export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Define type for API status
export enum ApiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
}
