import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the Criminals state domain
 */

const selectCriminalsDomain = (state) => state.criminals || initialState;

/**
 * Other specific selectors
 */
const makeErrorSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.errors);

const makeClearFormFieldSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.clearFormField);

const makePageNumberSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.pageNumber);

const makePageSizeSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.pageSize);

const makeKeywordsSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.keywords);

const makeIsLoadingSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.isLoading);

const makeCriminalsSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.criminals);

const makeFormValuesSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.formValues);

const makeFormMethodSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.formMethod);

const makeIdSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.id);

const makeInitialValuesSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.initialValues);

const makeProfileTypesSelector = () =>
  createSelector(selectCriminalsDomain, (substate) => substate.profileTypes);

export {
  makeClearFormFieldSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makePageSizeSelector,
  makeKeywordsSelector,
  makeIsLoadingSelector,
  makeCriminalsSelector,
  makeFormValuesSelector,
  makeFormMethodSelector,
  makeIdSelector,
  makeInitialValuesSelector,
  makeProfileTypesSelector,
};
