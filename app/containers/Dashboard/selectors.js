/*
 *
 * Dashboard selectors
 *
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardDomain = state => state.dashboard || initialState;

const makeSelectUserStats = () =>
  createSelector(selectDashboardDomain, substate => substate.userStats);

const makeSelectDeviceChart = () =>
  createSelector(selectDashboardDomain, substate => substate.deviceChart);

const makeSelectDeviceType = () =>
  createSelector(selectDashboardDomain, substate => substate.deviceType);

const makeSelectIsLoading = () =>
  createSelector(selectDashboardDomain, substate => substate.isLoading);

// Thêm selector cho thống kê phạm nhân
const makeSelectPrisonerStats = () =>
  createSelector(selectDashboardDomain, substate => substate.prisonerStats);

// Thêm selector cho release data
const makeSelectReleaseData = () =>
  createSelector(selectDashboardDomain, substate => substate.releaseData);

// Thêm selector cho tổng số phạm nhân
const makeSelectTotalPrisoners = () =>
  createSelector(selectDashboardDomain, substate => substate.totalPrisoners);

export {
  selectDashboardDomain,
  makeSelectUserStats,
  makeSelectDeviceChart,
  makeSelectDeviceType,
  makeSelectIsLoading,
  makeSelectPrisonerStats,
  makeSelectReleaseData,
  makeSelectTotalPrisoners,
};
