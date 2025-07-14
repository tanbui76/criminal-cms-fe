/* eslint-disable prettier/prettier */
import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/UserAccount/saga';
import reducer from 'containers/UserAccount/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import { Breadcrumb, Button, Tabs } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import SearchInput from 'components/SearchInput';
import messages from 'containers/Criminals/messages';
import CriminalTable from './criminalTable';

const { TabPane } = Tabs;
const key = 'userAccount';

function Criminals() {
  const intl = useIntl();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  return (
    <div className="truthy-wrapper">
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <div className="truthy-breadcrumb">
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
            <FormattedMessage {...messages.helmetTitle} />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="truthy-content-header">
        <div className="d-flex">
          <div className="add-wrap">
            <Button type="primary">
              <PlusOutlined /> <FormattedMessage {...messages.addCriminal} />
            </Button>
          </div>
          <div className="d-flex ml-auto search-wrap">
            <SearchInput />
          </div>
        </div>
      </div>

      <div className="truthy-table ">
        <CriminalTable />
      </div>
    </div>
  );
}

export default Criminals;
