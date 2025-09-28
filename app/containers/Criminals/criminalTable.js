import React, { useCallback, useMemo } from 'react';
import { Modal, Space, Table, Tag, Tooltip } from 'antd';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common/messages';
import dayjs from 'dayjs';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import ToolTipButtonWrapper from 'components/ToolTipButtonWrapper';
import PropTypes from 'prop-types';
import messages from './messages';
import { setPageNumberAction, setPageSizeAction } from './action';
import { makeCriminalsSelector, makeIsLoadingSelector } from './selectors';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  criminals: makeCriminalsSelector(),
});

function CriminalTable({ onEdit, onDelete, onView }) {
  const dispatch = useDispatch();

  const { isLoading, criminals } = useSelector(stateSelector);

  const showPaginationTotal = useCallback(
    (total, range) => (
      <FormattedMessage
        {...commonMessages.pagination}
        values={{ start: range[0], end: range[1], total }}
      />
    ),
    [],
  );

  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      dispatch(setPageSizeAction(pageSize));
    },
    onChange: (page) => {
      dispatch(setPageNumberAction(page));
    },
    pageSizeOptions: [5, 10, 20, 30, 50, 100],
    total: criminals.totalItems,
    showTotal: showPaginationTotal,
  };

  const dataModify = useMemo(() => {
    if (!criminals?.results) return [];

    return criminals.results.map((criminal) => ({
      ...criminal,
    }));
  }, [criminals?.results]);

  const columns = [
    {
      title: <FormattedMessage {...messages.nameColumn} />,
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      render: (name, record) => {
        let color = 'inherit';
        if (record.executionStatus === 'expired') {
          color = 'red';
        } else if (record.executionStatus === 'expiring_soon') {
          color = 'gold';
        } else if (record.executionStatus === 'active') {
          color = 'green';
        }
        return <span style={{ fontWeight: 'bold', color }}>{name}</span>;
      },
    },
    {
      title: <FormattedMessage {...messages.descriptionColumn} />,
      dataIndex: 'description',
      key: 'description',
      width: 150,
      render: (description) => (
        <Tooltip title={description} placement="topLeft">
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {description}
          </div>
        </Tooltip>
      ),
    },
    {
      title: <FormattedMessage {...messages.birthplaceColumn} />,
      dataIndex: 'birthplace',
      key: 'birthplace',
      width: 80,
    },
    {
      title: <FormattedMessage {...messages.profileTypesColumn} />,
      dataIndex: 'profileTypeIds',
      key: 'profileTypeIds',
      width: 180,
      render: (profileTypeIds) => {
        if (!profileTypeIds || !Array.isArray(profileTypeIds)) {
          return <span style={{ color: '#999' }}>Chưa có</span>;
        }

        return (
          <div>
            {profileTypeIds.slice(0, 2).map((type) => (
              <Tooltip key={type.id} title={type.name} placement="top">
                <Tag
                  color="blue"
                  style={{ marginBottom: 4, marginRight: 4, maxWidth: 60 }}
                >
                  <div
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {type.name}
                  </div>
                </Tag>
              </Tooltip>
            ))}
            {profileTypeIds.length > 2 && (
              <Tag color="orange">+{profileTypeIds.length - 2} loại khác</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: <FormattedMessage {...messages.birthdateColumn} />,
      dataIndex: 'birthdate',
      key: 'birthdate',
      width: 80,
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },
    {
      title: <FormattedMessage {...messages.addressColumn} />,
      dataIndex: 'address',
      key: 'address',
      width: 160,
      render: (address) => (
        <Tooltip title={address} placement="topLeft">
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {address}
          </div>
        </Tooltip>
      ),
    },
    {
      title: <FormattedMessage {...messages.startExecuteDateColumn} />,
      dataIndex: 'startExecuteDate',
      key: 'startExecuteDate',
      width: 80,
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },
    {
      title: <FormattedMessage {...messages.endExecuteDateColumn} />,
      dataIndex: 'endExecuteDate',
      key: 'endExecuteDate',
      width: 80,
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },
    {
      title: <FormattedMessage {...messages.actionColumn} />,
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <ToolTipButtonWrapper
            title={commonMessages.editLabel}
            clickEvent={() => onEdit(record)}
          >
            <EditOutlined />
          </ToolTipButtonWrapper>
          <ToolTipButtonWrapper
            title={commonMessages.viewLabel}
            clickEvent={() => onView(record.id)}
          >
            <FundViewOutlined />
          </ToolTipButtonWrapper>
          <ToolTipButtonWrapper
            danger
            color="#f44336"
            title={commonMessages.removeLabel}
            clickEvent={() => {
              Modal.confirm({
                okText: 'Đồng ý',
                okType: 'danger',
                cancelText: 'Hủy bỏ',
                icon: <ExclamationCircleOutlined />,
                title: 'Bạn có chắc chắn muốn xóa',
                onOk: (close) => {
                  close();
                  onDelete(record);
                },
              });
            }}
          >
            <DeleteOutlined />
          </ToolTipButtonWrapper>
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={paginationOptions}
      loading={isLoading}
      columns={columns}
      dataSource={dataModify}
      rowKey="id"
      scroll={{ x: 1400, y: 300 }}
    />
  );
}

CriminalTable.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default CriminalTable;
