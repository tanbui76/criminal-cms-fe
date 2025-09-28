import { call, put, select, takeLatest } from 'redux-saga/effects';
import { DELETE, GET, POST, PUT } from 'utils/constants';
import request from 'utils/request';
import { buildQueryString } from 'common/helpers';
import ApiEndpoint from 'utils/api';
import commonMessage from 'common/messages';
import { showAlert, showFormattedAlert } from 'common/saga';
import moment from 'moment';
import {
  makeFormMethodSelector,
  makeFormValuesSelector,
  makeIdSelector,
  makeKeywordsSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from './selectors';
import {
  assignCriminalsAction,
  asyncEndAction,
  asyncStartAction,
  clearFormFieldAction,
  queryCriminalsAction,
  setInitialValuesAction,
  setProfileTypesAction,
  enterValidationErrorAction,
  getCriminalByIdAction,
} from './action';
import {
  DELETE_ITEM_BY_ID,
  GET_CRIMINAL_BY_ID,
  QUERY_CRIMINALS,
  SUBMIT_FORM,
  QUERY_PROFILE_TYPES,
  POST_SENTENCE_REDUCTION,
} from './constants';

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

export function* handleQueryProfileTypes() {
  yield put(asyncStartAction());
  const requestUrl = `/profile-types`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(setProfileTypesAction(response));
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

    // Fetch updated list after successful create/edit
    yield put(queryCriminalsAction());

    // Clear form and close modal
    yield put(clearFormFieldAction());

    const message =
      formMethod === PUT
        ? commonMessage.updateSuccess
        : commonMessage.addSuccess;
    return yield showFormattedAlert('success', message);
  } catch (error) {
    yield put(asyncEndAction());

    // Handle validation errors
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      // Handle unique constraint error
      if (errorData.unique) {
        yield put(
          enterValidationErrorAction([
            {
              name: 'name',
              errors: [errorData.unique],
            },
          ]),
        );
        return yield showAlert('error', errorData.unique);
      }

      // Handle other validation errors
      if (errorData.errors) {
        const validationErrors = Object.keys(errorData.errors).map((field) => ({
          name: field,
          errors: [errorData.errors[field]],
        }));
        yield put(enterValidationErrorAction(validationErrors));
        return yield showAlert('error', 'Vui lòng kiểm tra lại thông tin');
      }
    }

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
        birthdate: response.birthdate
          ? moment(response.birthdate, 'YYYY/MM/DD')
          : undefined,
        startExecuteDate: response.startExecuteDate
          ? moment(response.startExecuteDate, 'YYYY/MM/DD')
          : undefined,
        endExecuteDate: response.endExecuteDate
          ? moment(response.endExecuteDate, 'YYYY/MM/DD')
          : undefined,
        doneExecuteDate: response.doneExecuteDate
          ? moment(response.doneExecuteDate, 'YYYY/MM/DD')
          : undefined,
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

function* postSentenceReductionSaga(action) {
  yield put(asyncStartAction());
  const { id, sentenceReductionDays } = action.payload;
  const requestUrl = `/criminals/${id}/executive-clemencies`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, POST, {
    sentenceReductionDays,
  });
  try {
    yield call(request, payload);
    yield put(asyncEndAction());
    yield put(getCriminalByIdAction());
    return yield showFormattedAlert('success', commonMessage.updateSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showAlert('error', error.data?.message || 'Lỗi hệ thống');
  }
}

export default function* PermissionSaga() {
  yield takeLatest(QUERY_CRIMINALS, handleQueryCriminalsList);
  yield takeLatest(QUERY_PROFILE_TYPES, handleQueryProfileTypes);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(GET_CRIMINAL_BY_ID, handleGetCriminalById);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
  yield takeLatest(POST_SENTENCE_REDUCTION, postSentenceReductionSaga);
}
