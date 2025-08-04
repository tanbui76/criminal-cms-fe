/*
 *
 * Dashboard reducer
 *
 */

import produce from 'immer';
import {
  SET_USER_STATS,
  SET_DEVICE_TYPE,
  SET_DEVICE_CHART,
  ASYNC_START,
  ASYNC_END,
  SET_PRISONER_STATS,
  SET_RELEASE_DATA,
  SET_TOTAL_PRISONERS,
  BROWSER,
} from 'containers/Dashboard/constants';

export const initialState = {
  userStats: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  deviceType: BROWSER,
  deviceChart: [],
  isLoading: false,
  prisonerStats: [], // Thêm state cho thống kê phạm nhân
  releaseData: [], // Thêm state cho release data
  totalPrisoners: 0, // Thêm state cho tổng số phạm nhân
};

/* eslint-disable default-case, no-param-reassign */
const DashboardReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_USER_STATS:
      draft.userStats = action.stats;
      break;
    case SET_DEVICE_TYPE:
      draft.deviceType = action.deviceType;
      break;
    case SET_DEVICE_CHART:
      draft.deviceChart = action.deviceChart;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case SET_PRISONER_STATS:
      draft.prisonerStats = action.prisonerStats;
      break;
    case SET_RELEASE_DATA:
      draft.releaseData = action.releaseData;
      break;
    case SET_TOTAL_PRISONERS:
      draft.totalPrisoners = action.total;
      break;
  }
}, initialState);

export default DashboardReducer;
