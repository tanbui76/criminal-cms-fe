import { call, put, select, takeLatest } from 'redux-saga/effects';
import { DELETE_ITEM_BY_ID, GET_CRIMINAL_BY_ID, QUERY_CRIMINALS, SUBMIT_FORM } from './constants';
import { DELETE, GET, PUT } from 'utils/constants';
import request from 'utils/request';
import {
  assignCriminalsAction,
  asyncEndAction,
  asyncStartAction,
  clearFormFieldAction,
  queryCriminalsAction,
  setInitialValuesAction,
} from './action';
import { buildQueryString } from 'common/helpers';
import {
  makeFormMethodSelector,
  makeFormValuesSelector,
  makeIdSelector,
  makeKeywordsSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from './selectors';
import ApiEndpoint from 'utils/api';
import commonMessage from 'common/messages';
import { showAlert, showFormattedAlert } from 'common/saga';
import moment from 'moment';

export function* handleQueryCriminalsList() {
  yield put(asyncStartAction());
  const pageNumber = yield select(makePageNumberSelector());
  const keywords = yield select(makeKeywordsSelector());
  const limit = yield select(makePageSizeSelector());
  const queryString = buildQueryString(keywords, pageNumber, limit);
  const requestUrl = `/criminals?${queryString}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(assignCriminalsAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleSubmitForm() {
  const formValues = yield select(makeFormValuesSelector());
  const formMethod = yield select(makeFormMethodSelector());
  const id = yield select(makeIdSelector());
  const requestUrl = `/criminals${formMethod === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(
    requestUrl,
    formMethod,
    formValues,
  );
  try {
    yield call(request, payload);
    yield put(queryCriminalsAction());
    yield put(clearFormFieldAction());
    yield put(asyncStartAction());
    const message =
      formMethod === PUT
        ? commonMessage.updateSuccess
        : commonMessage.addSuccess;
    return yield showFormattedAlert('success', message);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showAlert('error', 'INTERNAL SERVER ERROR');
  }
}

export function* handleGetCriminalById() {
  yield put(asyncStartAction());
  const id = yield select(makeIdSelector());
  const requestUrl = `/criminals/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);

    yield put(
      setInitialValuesAction({
        ...response,
        birthdate: response.birthdate ? moment(response.birthdate, 'YYYY/MM/DD') : undefined,
        startExecuteDate: response.startExecuteDate ? moment(response.startExecuteDate, 'YYYY/MM/DD') : undefined,
        endExecuteDate: response.endExecuteDate ? moment(response.endExecuteDate, 'YYYY/MM/DD') : undefined,
        doneExecuteDate: response.doneExecuteDate ? moment(response.doneExecuteDate, 'YYYY/MM/DD') : undefined
      }),
    );
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleDeleteItemById(data) {
  yield put(asyncStartAction());
  const requestUrl = `/criminals/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryCriminalsAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', commonMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.deleteError);
  }
}

export default function* PermissionSaga() {
  yield takeLatest(QUERY_CRIMINALS, handleQueryCriminalsList);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(GET_CRIMINAL_BY_ID, handleGetCriminalById);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
