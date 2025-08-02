/**
 *
 * HomePage
 *
 */

import React, { Suspense, useEffect } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Dashboard/saga';
import reducer from 'containers/Dashboard/reducer';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, UsergroupAddOutlined, TeamOutlined } from '@ant-design/icons';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectUserStats,
  makeSelectIsLoading,
  makeSelectPrisonerStats,
  makeSelectReleaseData,
  makeSelectTotalPrisoners,
} from 'containers/Dashboard/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  queryUserStatsAction,
  queryPrisonerStatsAction,
} from 'containers/Dashboard/actions';
import PrisonerChart from 'containers/Dashboard/charts/prisonerChart';
import ReleaseTable from 'containers/Dashboard/charts/releaseTable';
import messages from 'containers/Dashboard/messages';
import { useIntl } from 'react-intl';

const key = 'dashboard';

const stateSelector = createStructuredSelector({
  userStats: makeSelectUserStats(),
  isLoading: makeSelectIsLoading(),
  prisonerStats: makeSelectPrisonerStats(),
  releaseData: makeSelectReleaseData(),
  totalPrisoners: makeSelectTotalPrisoners(),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const intl = useIntl();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { userStats, isLoading, prisonerStats, releaseData, totalPrisoners } =
    useSelector(stateSelector);
  const loadUserStats = () => dispatch(queryUserStatsAction());
  const loadPrisonerStats = () => dispatch(queryPrisonerStatsAction());

  useEffect(() => {
    loadUserStats();
    loadPrisonerStats();
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UsergroupAddOutlined />}
              title={intl.formatMessage(messages.totalUser, {
                count: userStats.total,
              })}
              value={userStats.total}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
              title={intl.formatMessage(messages.activeUser, {
                count: userStats.active,
              })}
              value={userStats.active}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: 'red' }}
              prefix={<UserOutlined />}
              title={intl.formatMessage(messages.inActiveUser, {
                count: userStats.inactive,
              })}
              value={userStats.inactive}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
              title={intl.formatMessage(messages.totalPrisoners)}
              value={totalPrisoners}
            />
          </Card>
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <PrisonerChart data={prisonerStats} loading={isLoading} />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ReleaseTable data={releaseData} loading={isLoading} />
          </Suspense>
        </Col>
      </Row>
    </>
  );
}
