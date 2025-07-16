import React, { useCallback, useMemo } from 'react';
import { Modal, Space, Table } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeCriminalsSelector, makeIsLoadingSelector } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { setPageNumberAction, setPageSizeAction } from './action';
import commonMessages from 'common/messages';
import dayjs from 'dayjs';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import ToolTipButtonWrapper from 'components/ToolTipButtonWrapper';
import PropTypes from 'prop-types';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  criminals: makeCriminalsSelector(),
});
const CriminalTable = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const { isLoading, criminals } = useSelector(stateSelector);

  const showPaginationTotal = useCallback(
  (total, range) => (
    <FormattedMessage
      {...commonMessages.pagination}
      values={{ start: range[0], end: range[1], total }}
    />
  ),
  []
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
    showTotal: showPaginationTotal
  };

  const dataModify = useMemo(() => {
    if (!criminals?.results) return [];

    return criminals.results.map((criminal) => {
      const start = criminal.startExecuteDate
        ? dayjs(criminal.startExecuteDate)
        : null;
      const end = criminal.doneExecuteDate
        ? dayjs(criminal.doneExecuteDate)
        : null;

      const challengePeriod = start && end ? end.diff(start, 'month') : null;

      const today = dayjs();
      const remainingDay =
        end && end.diff(today, 'day') > 0 ? end.diff(today, 'day') : 0;

      return {
        ...criminal,
        challengePeriod,
        remainingDay,
      };
    });
  }, [criminals?.results]);

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quê Quán',
      dataIndex: 'birthplace',
      key: 'birthplace',
    },
    {
      title: 'Thời gian thử thách (số tháng)',
      dataIndex: 'challengePeriod',
      key: 'challengePeriod',
    },
    {
      title: 'Số ngày còn lại',
      dataIndex: 'remainingDay',
      key: 'remainingDay',
      render: (value) => (
        <span style={{ color: value === 0 ? 'red' : 'inherit' }}>{value}</span>
      ),
    },
    {
      title: 'Chấp hành án từ ngày',
      dataIndex: 'startExecuteDate',
      key: 'startExecuteDate',
    },
    {
      title: 'Ngày xét giảm án',
      dataIndex: 'endExecuteDate',
      key: 'endExecuteDate',
    },
    {
      title: 'Ngày chấp hành xong',
      dataIndex: 'doneExecuteDate',
      key: 'doneExecuteDate',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ToolTipButtonWrapper
            title={commonMessages.editLabel}
            clickEvent={() => onEdit(record)}
          >
            <EditOutlined />
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
    />
  );
};
CriminalTable.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default CriminalTable;
