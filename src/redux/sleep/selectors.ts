import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {getSleepKpiData} from '../../utils/SleepDataUtils';

export const selectSleepState = (state: RootState) => state.sleep;

export const selectUsersData = (id: string) =>
  createSelector(selectSleepState, sleepState => sleepState[id]?.data);

export const selectUsersStatus = (id: string) =>
  createSelector(selectSleepState, sleepState => sleepState[id]?.status);

export const selectUsersError = (id: string) =>
  createSelector(selectSleepState, sleepState => sleepState[id]?.error);

export const selectUsersKpis = (id: string) =>
  createSelector(selectUsersData(id), userSleepState =>
    getSleepKpiData(userSleepState?.intervals),
  );
