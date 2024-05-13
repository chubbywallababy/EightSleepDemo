import {createSlice} from '@reduxjs/toolkit';
import {usersActions} from './actions';
import {User} from '../../types/User';

interface UserState {
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  data: {
    users: User[];
    /**
     * If undefined, they have not made a selection.
     * If false, they have denied the suggestion.
     * If true, they have accepted the suggestion.
     */
    acceptedSuggestion: {[key: string]: boolean};
  };
}

const initialState: UserState = {
  status: 'idle',
  error: null,
  data: {
    users: [],
    acceptedSuggestion: {},
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Ideally the accepted state would also save to the BE so it's not shown again on rerender.
     *
     * In a real-world scenario there could be a lot more complexity around this data.
     * I imagine a separate slice for suggestions and sleep preferences would be better.
     * */
    acceptSuggestion(state, {payload}) {
      state.data.acceptedSuggestion[payload] = true;
    },
    denySuggestion(state, {payload}) {
      state.data.acceptedSuggestion[payload] = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(usersActions.setUsers, (state, action) => {
        state.status = 'idle';
        state.data.users = action.payload;
        state.error = null;
      })
      .addCase(usersActions.setError, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {acceptSuggestion, denySuggestion} = userSlice.actions;

export default userSlice.reducer;
