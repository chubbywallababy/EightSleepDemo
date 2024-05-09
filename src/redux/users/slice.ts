import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {userActions} from './actions';
import {User} from '../../types/User';

// Define async thunk for fetching users
export const fetchUsers = createAsyncThunk<User[], void>(
  userActions.FETCH,
  async () => {
    const response = await fetch(
      'https://s3.amazonaws.com/eight-public/challenge/users.json',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.users;
  },
);

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
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default userSlice.reducer;
