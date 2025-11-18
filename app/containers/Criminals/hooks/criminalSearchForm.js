import React, { useEffect } from 'react';
import { Form, Select, DatePicker, Button, Row, Col, Card, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeProfileTypesSelector } from '../selectors';
import { useIntl } from 'react-intl';
import { queryProfileTypesAction } from '../action';
import { SearchOutlined } from '@ant-design/icons';
import '../css/style.less';

const { RangePicker } = DatePicker;

function CriminalFilterForm({ onSearch }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const intl = useIntl();

  const stateSelector = createStructuredSelector({
    profileTypes: makeProfileTypesSelector(),
  });

  const { profileTypes } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(queryProfileTypesAction());
  }, [dispatch]);

  const profileTypesArray = profileTypes?.results || [];
  const profileTypeOptions = profileTypesArray.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  const handleFinish = (values) => {
    const filters = {
      ...values,
      fromDate:
        values.dateRange && values.dateRange[0]
          ? values.dateRange[0].format('YYYY-MM-DD')
          : undefined,
      toDate:
        values.dateRange && values.dateRange[1]
          ? values.dateRange[1].format('YYYY-MM-DD')
          : undefined,
    };
    console.log('ranger', filters.dateRange);
    delete filters.dateRange;
    onSearch(filters);
  };

  return (
    <Card
      style={{
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 8,
      }}
      title="Bộ lọc tìm kiếm"
      bordered={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ padding: '8px 16px' }}
      >
        <Row gutter={[16, 8]}>
          {/* Dòng 1 */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="name" label="Họ Tên">
              <Input
                className="input-search-form"
                placeholder="Nhập họ và tên"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="description" label="Tội danh">
              <Input
                className="input-search-form"
                placeholder="Nhập tội danh"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={6}>
            <Form.Item name="profileTypeIds" label="Loại Đối Tượng">
              <Select
                className="input-search-fm"
                mode="multiple"
                allowClear
                placeholder="Chọn loại đối tượng"
                options={profileTypeOptions}
                loading={!profileTypesArray || profileTypesArray.length === 0}
              />
            </Form.Item>
          </Col>

          {/* Dòng 2 */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="address" label="Nơi Ở">
              <Input className="input-search-form" placeholder="Nhập nơi ở" />
            </Form.Item>
          </Col>

          {/* <Col xs={24} sm={12} md={6}>
            <Form.Item name="fromDate" label="Ngày bắt đầu">
              <DatePicker
                className="input-search-fm"
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                placeholder="Nhập ngày bắt đầu"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="toDate" label="Ngày kết thúc">
              <DatePicker
                className="input-search-fm"
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                placeholder="Nhập ngày kết thúc"
              />
            </Form.Item>
          </Col> */}

          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Khoảng thời gian kết thúc" name="dateRange">
              <RangePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>

          {/* Nút hành động */}
          <Col
            xs={24}
            sm={24}
            md={8}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              Tìm kiếm
            </Button>
            <Button
              type="primary"
              htmlType="button"
              style={{
                background: 'white',
                color: 'black',
                border: '1px green solid',
              }}
              onClick={() => {
                form.resetFields();
                form.submit();
              }}
            >
              Đặt lại
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default CriminalFilterForm;
