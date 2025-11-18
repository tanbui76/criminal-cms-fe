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
import { render } from 'less';
import './css/style.less';

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
      title: (
        <strong>
          <FormattedMessage {...messages.nameColumn} />
        </strong>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      className: 'fixed-background-column',
      render: (name, record) => {
        let color = 'inherit';
        if (record.executionStatus === 'expired') {
          color = 'gold';
        } else if (record.executionStatus === 'expiring_soon') {
          color = 'red';
        } else if (record.executionStatus === 'active') {
          color = 'green';
        }
        return <span style={{ fontWeight: 'bold', color }}>{name}</span>;
      },
    },
    {
      title: (
        <strong>
          <FormattedMessage {...messages.genderColumn} />
        </strong>
      ),
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender) => {
        let printGender = '';
        if (gender) {
          printGender = 'Nam';
        } else {
          printGender = 'Nữ';
        }
        return <span>{printGender}</span>;
      },
    },
    {
      title: (
        <strong>
          <FormattedMessage {...messages.birthdateColumn} />
        </strong>
      ),
      dataIndex: 'birthdate',
      key: 'birthdate',
      width: 80,
    },
    {
      title: (
        <strong>
          <FormattedMessage {...messages.nationColumn} />
        </strong>
      ),

      dataIndex: 'ethnicity',
      key: 'ethnicity',
      width: 80,
    },
    {
      title: (
        <strong>
          <FormattedMessage {...messages.birthplaceColumn} />
        </strong>
      ),
      dataIndex: 'birthplace',
      key: 'birthplace',
      width: 150,
    },

    {
      title: (
        <strong>
          <FormattedMessage {...messages.addressColumn} />
        </strong>
      ),
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
      title: (
        <strong>
          <FormattedMessage {...messages.descriptionColumn} />
        </strong>
      ),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description) => (
        <Tooltip title={description} placement="topLeft">
          <div
            style={
              {
                // overflow: 'hidden',
                // textOverflow: 'ellipsis',
                // whiteSpace: 'nowrap',
              }
            }
          >
            {description}
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <strong>
          <FormattedMessage {...messages.challengeTime} />
        </strong>
      ),
      dataIndex: 'challengeTime',
      key: 'challengeTime',
      width: 65,
    },

    {
      title: (
        <strong>
          <FormattedMessage {...messages.caseNo} />
        </strong>
      ),
      dataIndex: 'caseNo',
      key: 'caseNo',
      width: 200,
    },

    {
      title: (
        <strong>
          <FormattedMessage {...messages.judgeNo} />
        </strong>
      ),
      dataIndex: 'judgeNo',
      key: 'judgeNo',
      width: 200,
    },

    {
      title: (
        <strong>
          <FormattedMessage {...messages.profileTypesColumn} />
        </strong>
      ),
      dataIndex: 'profileTypeIds',
      key: 'profileTypeIds',
      width: 80,
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
      title: (
        <strong>
          <FormattedMessage {...messages.startExecuteDateColumn} />
        </strong>
      ),
      dataIndex: 'startExecuteDate',
      key: 'startExecuteDate',
      width: 80,
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },
    {
      title: (
        <strong>
          <FormattedMessage {...messages.endExecuteDateColumn} />
        </strong>
      ),
      dataIndex: 'endExecuteDate',
      key: 'endExecuteDate',
      width: 80,
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },

    {
      title: <strong>Lý do kết thúc</strong>,
      dataIndex: 'endResult',
      key: 'endResult',
      width: 200,
    },

    {
      title: (
        <strong>
          <FormattedMessage {...messages.actionColumn} />
        </strong>
      ),
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
      scroll={{ x: 3000, y: 300 }}
    />
  );
}

CriminalTable.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default CriminalTable;
