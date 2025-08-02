import { Card, Typography, Table, Tag } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import messages from 'containers/Dashboard/messages';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const ReleaseTable = ({ loading, data }) => {
  const intl = useIntl();

  // Tạo columns cho table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <Tag color="blue">#{id}</Tag>,
    },
    {
      title: intl.formatMessage(messages.prisonerName),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span style={{ fontWeight: 'bold' }}>{name}</span>
        </div>
      ),
    },
    {
      title: intl.formatMessage(messages.descriptionColumn),
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <div style={{ 
          maxWidth: 300,
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          lineHeight: '1.4'
        }}>
          <Text>{description}</Text>
        </div>
      ),
    },
    {
      title: intl.formatMessage(messages.releaseDate),
      dataIndex: 'endExecuteDate',
      key: 'endExecuteDate',
      width: 150,
      render: (date) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarOutlined style={{ marginRight: 8, color: '#52c41a' }} />
          <Tag color="green">{date}</Tag>
        </div>
      ),
    },
  ];

  return (
    <Card
      loading={loading}
      className=""
      bordered={false}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <Title level={4} style={{ margin: 0 }}>
            {intl.formatMessage(messages.releaseThisMonth)}
          </Title>
        </div>
      }
      style={{
        height: '100%',
      }}
    >
      <div>
        {data && data.length > 0 ? (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
            rowKey="id"
            style={{ marginTop: 16 }}
            scroll={{ y: 200 }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CalendarOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
            <div style={{ color: '#8c8c8c' }}>
              {loading ? intl.formatMessage(messages.loadingData) : intl.formatMessage(messages.noReleaseThisMonth)}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

ReleaseTable.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
};

ReleaseTable.defaultProps = {
  loading: false,
  data: [],
};

export default ReleaseTable; 