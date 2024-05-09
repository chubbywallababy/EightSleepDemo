// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {RootState} from '../store';
// import {SleepService} from '../../services/SleepService';
// import {SleepData} from '../../types';

// interface SleeperState {
//   data: SleepData[];
//   status: 'idle' | 'loading' | 'failed';
// }

// const initialState: SleeperState = {
//   data: [],
//   status: 'idle',
// };

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const fetchAsync = createAsyncThunk('sleep/fetch', async () => {
//   const data: SleepData[] = await SleepService.getData();
//   return data.reverse();
// });

// export const sleepSlice = createSlice({
//   name: 'sleep',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchAsync.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.data = action.payload as any;
//       });
//   },
// });

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectData = (state: RootState) => state.sleep.data;
// export const selectStatus = (state: RootState) => state.sleep.status;

// export default sleepSlice.reducer;
