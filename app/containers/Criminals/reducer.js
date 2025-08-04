// @ts-nocheck
/*
 *
 * Users reducer
 *
 */
import produce from 'immer';
import {
  ASSIGN_CRIMINALS,
  SET_FORM_METHOD,
  ASYNC_START,
  ASYNC_END,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SET_SEARCH_KEYWORD,
  CLEAR_FORM_FIELD,
  CLEAR_FORM,
  SET_FORM_VALUES,
  ADD_VALIDATION_ERROR,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_PROFILE_TYPES,
} from './constants';

const EmptyField = {
  username: '',
  email: '',
  roleId: '',
  name: '',
  status: '',
};

export const initialState = {
  initialValues: EmptyField,
  formValues: {},
  keywords: '',
  username: '',
  email: '',
  roleId: '',
  name: '',
  password: '',
  status: '',
  confirmPassword: '',
  pageNumber: 1,
  clearFormField: false,
  pageSize: 10,
  limit: 10,
  roles: [],
  profileTypes: [],
  criminals: {
    results: [],
    pageSize: 10,
    currentPage: 0,
    totalItems: 0,
    next: 0,
    previous: 0,
  },
  errors: [],
  isLoading: false,
  formMethod: null,
  id: null,
};

/* eslint-disable default-case, no-param-reassign */
const CriminalsReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_CRIMINALS:
      draft.criminals = action.criminals;
      draft.isLoading = false;
      break;
    case SET_FORM_METHOD:
      draft.formMethod = action.method;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case SET_PAGE_NUMBER:
      draft.pageNumber = action.pageNumber;
      break;
    case SET_PAGE_SIZE:
      draft.pageSize = action.pageSize;
      break;
    case SET_SEARCH_KEYWORD:
      draft.keywords = action.keywords;
      break;
    case CLEAR_FORM_FIELD:
      draft.clearFormField = true;
      break;
    case CLEAR_FORM:
      draft.username = '';
      draft.email = '';
      draft.name = '';
      draft.roleId = '';
      draft.password = '';
      draft.confirmPassword = '';
      draft.keywords = '';
      draft.errors = [];
      draft.formValues = {};
      draft.initialValues = EmptyField;
      draft.clearFormField = false;
      draft.isLoading = false;
      draft.formMethod = null;
      draft.id = null;
      break;
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      break;
    case SET_ID:
      draft.id = action.id;
      break;
    case SET_INITIAL_VALUES:
      draft.initialValues = action.initialValues;
      break;
    case SET_PROFILE_TYPES:
      draft.profileTypes = action.profileTypes;
      break;
  }
}, initialState);

export default CriminalsReducer;
