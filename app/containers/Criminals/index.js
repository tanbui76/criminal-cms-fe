/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Breadcrumb, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import SearchInput from 'components/SearchInput';
import messages from 'containers/Criminals/messages';
import { POST, PUT } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CriminalTable from './criminalTable';
import {
  clearFormAction,
  clearFormFieldAction,
  deleteItemByIdAction,
  getCriminalByIdAction,
  queryCriminalsAction,
  setFormMethodAction,
  setIdAction,
  setSearchKeywordAction,
} from './action';
import CreateCriminalModal from './createCriminalModal';
import reducer from './reducer';
import saga from './saga';
import {
  makeIdSelector,
  makeIsLoadingSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from './selectors';
import CriminalFilterForm from './hooks/criminalSearchForm';
import './css/style.less';

const key = 'criminals';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  pageSize: makePageSizeSelector(),
  isLoading: makeIsLoadingSelector(),
  id: makeIdSelector(),
});

function Criminals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const [createCriminal, setCreateCriminal] = useState(false);

  const { pageNumber, pageSize, isLoading, id } = useSelector(stateSelector);
  const loadCriminals = () => dispatch(queryCriminalsAction());
  const onKeywordChange = (keywords) =>
    dispatch(setSearchKeywordAction(keywords)) && loadCriminals();
  const onchangeFormMethod = (formMethod) =>
    dispatch(setFormMethodAction(formMethod));

  const onSetId = (entityId) => dispatch(setIdAction(entityId));

  const onCreate = () => {
    onchangeFormMethod(POST);
    setCreateCriminal(true);
  };

  const onView = (criminalId) => {
    navigate(`/view-criminal/${criminalId}`);
  };

  useEffect(() => {
    loadCriminals();
  }, [pageNumber, pageSize]);

  const onEdit = (record) => {
    onSetId(record.id);
    onchangeFormMethod(PUT);
    setCreateCriminal(true);
  };

  const onDelete = (record) => {
    onSetId(null);
    dispatch(deleteItemByIdAction(record.id));
  };

  const handleSearch = (filterCriteria) => {
    dispatch(setSearchKeywordAction(filterCriteria));
    loadCriminals();
  };

  useEffect(() => {
    if (id) {
      dispatch(getCriminalByIdAction());
    }
  }, [id]);

  return (
    <div className="truthy-wrapper">
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <div className="truthy-breadcrumb title-cucumber">
        <h2>
          <FormattedMessage {...messages.helmetTitle} />
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/" className="links">
              <FormattedMessage {...messages.dashboardTitle} />
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="current active">
            <FormattedMessage {...messages.cucumberTitle} />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="truthy-content-header">
        <div className="d-flex">
          <div className="add-wrap">
            <Button type="primary" onClick={onCreate}>
              <PlusOutlined /> <FormattedMessage {...messages.addCriminal} />
            </Button>
          </div>
        </div>
      </div>

      <div className="truthy-table ">
        <CriminalFilterForm onSearch={handleSearch} />
        <br />
        <CriminalTable onEdit={onEdit} onDelete={onDelete} onView={onView} />
      </div>
      <CreateCriminalModal
        visible={createCriminal}
        onCancel={() => {
          setCreateCriminal(false);
          onSetId(null);
          dispatch(clearFormFieldAction());
          dispatch(clearFormAction());
        }}
      />
    </div>
  );
}

export default Criminals;
