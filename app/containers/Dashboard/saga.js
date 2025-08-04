import {
  asyncEndAction,
  asyncStartAction,
  setDeviceChartAction,
  setUserStatsAction,
  setPrisonerStatsAction,
  setReleaseDataAction,
  setTotalPrisonersAction,
} from 'containers/Dashboard/actions';
import {
  BROWSER,
  QUERY_DEVICE_STATS,
  QUERY_USER_STATS,
  QUERY_PRISONER_STATS,
} from 'containers/Dashboard/constants';
import { makeSelectDeviceType } from 'containers/Dashboard/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import { GET } from 'utils/constants';
import request from 'utils/request';

export function* handleQueryUserStats() {
  yield put(asyncStartAction());
  const requestUrl = '/dashboard/users';
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    yield put(setUserStatsAction(response));
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryDeviceStats() {
  yield put(asyncStartAction());
  const deviceType = yield select(makeSelectDeviceType());
  const requestUrl = `/dashboard/${deviceType === BROWSER ? 'browser' : 'os'}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    yield put(setDeviceChartAction(response));
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryPrisonerStats() {
  yield put(asyncStartAction());
  const requestUrl = '/dashboard/criminals';
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    const chartData = response.byProfileType.map(item => ({
      type: item.profileTypeName,
      value: item.count
    }));
    yield put(setPrisonerStatsAction(chartData));
    yield put(setReleaseDataAction(response.willBeReleasedThisMonth || []));
    yield put(setTotalPrisonersAction(response.total || 0));
    return yield put(asyncEndAction());
  } catch (error) {
    yield put(setPrisonerStatsAction([]));
    yield put(setReleaseDataAction([]));
    yield put(setTotalPrisonersAction(0));
    return yield put(asyncEndAction());
  }
}

export default function* DashboardSaga() {
  yield takeLatest(QUERY_USER_STATS, handleQueryUserStats);
  yield takeLatest(QUERY_DEVICE_STATS, handleQueryDeviceStats);
  yield takeLatest(QUERY_PRISONER_STATS, handleQueryPrisonerStats);
}
