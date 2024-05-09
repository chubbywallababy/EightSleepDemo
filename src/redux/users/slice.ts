import {createSlice} from '@reduxjs/toolkit';
import {usersActions} from './actions';
import {User} from '../../types/User';

// Define initial state for user slice
interface UserState {
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  data: User[];
}

const initialState: UserState = {
  status: 'idle',
  error: null,
  data: [],
};

// Define user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersActions.setUsers, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(usersActions.setError, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
