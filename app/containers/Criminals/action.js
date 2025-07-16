import {
  ASYNC_START,
  ASYNC_END,
  SET_FORM_METHOD,
  ASSIGN_CRIMINALS,
  QUERY_CRIMINALS,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SET_SEARCH_KEYWORD,
  SUBMIT_FORM,
  CLEAR_FORM_FIELD,
  ADD_VALIDATION_ERROR,
  CLEAR_FORM,
  SET_FORM_VALUES,
  SET_ID,
  GET_CRIMINAL_BY_ID,
  SET_INITIAL_VALUES,
  DELETE_ITEM_BY_ID,
} from './constants';

export function asyncStartAction() {
  return {
    type: ASYNC_START,
  };
}

export function asyncEndAction() {
  return {
    type: ASYNC_END,
  };
}

export function setFormMethodAction(method) {
  return {
    type: SET_FORM_METHOD,
    method,
  };
}

export function assignCriminalsAction(criminals) {
  return {
    type: ASSIGN_CRIMINALS,
    criminals,
  };
}

export function queryCriminalsAction() {
  return {
    type: QUERY_CRIMINALS,
  };
}

export function setPageNumberAction(pageNumber) {
  return {
    type: SET_PAGE_NUMBER,
    pageNumber,
  };
}

export function setPageSizeAction(pageSize) {
  return {
    type: SET_PAGE_SIZE,
    pageSize,
  };
}

export function setSearchKeywordAction(keywords) {
  return {
    type: SET_SEARCH_KEYWORD,
    keywords,
  };
}

export function submitFormAction() {
  return {
    type: SUBMIT_FORM,
  };
}

export function clearFormFieldAction() {
  return {
    type: CLEAR_FORM_FIELD,
  };
}

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function clearFormAction() {
  return {
    type: CLEAR_FORM,
  };
}

export function setFormValues(formValues) {
  return {
    type: SET_FORM_VALUES,
    formValues,
  };
}

export function setIdAction(id) {
  return {
    type: SET_ID,
    id,
  };
}

export function getCriminalByIdAction() {
  return {
    type: GET_CRIMINAL_BY_ID,
  };
}

export function setInitialValuesAction(initialValues) {
  return {
    type: SET_INITIAL_VALUES,
    initialValues,
  };
}

export function deleteItemByIdAction(id) {
  return {
    type: DELETE_ITEM_BY_ID,
    id,
  };
}
