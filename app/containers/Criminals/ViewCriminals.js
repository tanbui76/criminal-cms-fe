import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Breadcrumb,
  Spin,
  Button,
  Modal,
  Form,
  InputNumber,
  Card,
  Row,
  Col,
  Descriptions,
  Avatar,
  Space,
  Tag,
  Divider,
  Typography,
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { NavLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import messages from 'containers/Criminals/messages';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
  getCriminalByIdAction,
  postSentenceReductionAction,
  setIdAction,
} from './action';
import { makeIsLoadingSelector, makeInitialValuesSelector } from './selectors';

const { Title, Text } = Typography;
const key = 'criminals';

function ViewCriminals() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const isLoading = useSelector(makeIsLoadingSelector());
  const criminal = useSelector(makeInitialValuesSelector());

  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(setIdAction(id));
    dispatch(getCriminalByIdAction());
  }, [dispatch, id]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(
          postSentenceReductionAction({
            id,
            sentenceReductionDays: values.reductionDays,
          }),
        );
        setOpenModal(false);
        form.resetFields();
      })
      .catch(() => {
        // Handle validation errors
      });
  };

  const getExecutionStatus = () => {
    if (!criminal?.endExecuteDate) return null;

    const today = new Date();
    const endDate = new Date(criminal.endExecuteDate);
    const daysLeft = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysLeft < 0) {
      return {
        status: 'Đã hoàn thành',
        color: 'success',
        icon: <CheckCircleOutlined />,
      };
    }
    if (daysLeft <= 30) {
      return {
        status: 'Sắp kết thúc',
        color: 'warning',
        icon: <ClockCircleOutlined />,
      };
    }
    return {
      status: 'Đang thi hành',
      color: 'processing',
      icon: <ClockCircleOutlined />,
    };
  };

  const executionStatus = getExecutionStatus();

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
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          <UserOutlined style={{ marginRight: 8 }} />
          <FormattedMessage {...messages.helmetTitle} />
        </Title>
        <Breadcrumb style={{ marginTop: 16 }}>
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

      <Spin spinning={isLoading}>
        {criminal ? (
          <div style={{ marginTop: 24 }}>
            {/* Header Card với Avatar và thông tin cơ bản */}
            <Card
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 12,
                marginBottom: 24,
                border: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              }}
              bodyStyle={{ padding: 32 }}
            >
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: '#fff',
                      color: '#667eea',
                      fontSize: 48,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Title level={2} style={{ color: '#fff', margin: 0 }}>
                    {criminal.name}
                  </Title>
                  <Text
                    style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}
                  >
                    ID: {criminal.id}
                  </Text>
                  {executionStatus && (
                    <div style={{ marginTop: 12 }}>
                      <Tag
                        color={executionStatus.color}
                        icon={executionStatus.icon}
                        style={{ fontSize: 14, padding: '4px 12px' }}
                      >
                        {executionStatus.status}
                      </Tag>
                    </div>
                  )}
                </Col>
                <Col xs={24} sm={6} style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<EditOutlined />}
                    onClick={() => setOpenModal(true)}
                    style={{
                      backgroundColor: '#fff',
                      borderColor: '#fff',
                      color: '#667eea',
                      height: 48,
                      borderRadius: 8,
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    Quyết định giảm án
                  </Button>
                </Col>
              </Row>
            </Card>

            {/* Thông tin chi tiết */}
            <Card
              title={
                <Space>
                  <FileTextOutlined style={{ color: '#1890ff' }} />
                  <span>Thông tin chi tiết</span>
                </Space>
              }
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
              }}
              headStyle={{
                backgroundColor: '#fafafa',
                borderBottom: '2px solid #1890ff',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <Descriptions
                column={{ xs: 1, sm: 1, md: 2, lg: 2 }}
                labelStyle={{
                  fontWeight: 600,
                  color: '#595959',
                  minWidth: 180,
                }}
                contentStyle={{ color: '#262626' }}
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined style={{ color: '#52c41a' }} />
                      Ngày sinh
                    </Space>
                  }
                >
                  {criminal.birthdate?.format?.('DD/MM/YYYY') ||
                    'Không xác định'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <EnvironmentOutlined style={{ color: '#1890ff' }} />
                      Quê quán
                    </Space>
                  }
                >
                  {criminal.birthplace || 'Không xác định'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <HomeOutlined style={{ color: '#722ed1' }} />
                      Địa chỉ thường trú
                    </Space>
                  }
                  span={2}
                >
                  {criminal.address || 'Không xác định'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <FileTextOutlined style={{ color: '#fa541c' }} />
                      Hành vi phạm tội
                    </Space>
                  }
                  span={2}
                >
                  <Text style={{ fontSize: 16 }}>
                    {criminal.description || 'Không có mô tả'}
                  </Text>
                </Descriptions.Item>
              </Descriptions>

              <Divider
                orientation="left"
                style={{ color: '#1890ff', fontWeight: 600 }}
              >
                Thời gian thi hành án
              </Divider>

              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Card
                    size="small"
                    style={{
                      backgroundColor: '#f6ffed',
                      border: '1px solid #b7eb8f',
                      borderRadius: 8,
                    }}
                  >
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">Ngày bắt đầu</Text>
                      <Text strong style={{ fontSize: 16, color: '#52c41a' }}>
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {criminal.startExecuteDate?.format?.('DD/MM/YYYY') ||
                          'Chưa xác định'}
                      </Text>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    size="small"
                    style={{
                      backgroundColor: '#fff2e8',
                      border: '1px solid #ffbb96',
                      borderRadius: 8,
                    }}
                  >
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">Ngày kết thúc</Text>
                      <Text strong style={{ fontSize: 16, color: '#fa541c' }}>
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {criminal.endExecuteDate?.format?.('DD/MM/YYYY') ||
                          'Chưa xác định'}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        ) : (
          <Card style={{ textAlign: 'center', padding: 48 }}>
            <UserOutlined
              style={{ fontSize: 64, color: '#d9d9d9', marginBottom: 16 }}
            />
            <Title level={4} type="secondary">
              Không tìm thấy thông tin tội phạm
            </Title>
          </Card>
        )}
      </Spin>

      <Modal
        title={
          <Space>
            <EditOutlined style={{ color: '#1890ff' }} />
            <span>Quyết định giảm án</span>
          </Space>
        }
        visible={openModal}
        onOk={handleOk}
        onCancel={() => setOpenModal(false)}
        okText="Lưu quyết định"
        cancelText="Hủy bỏ"
        width={500}
        style={{ top: 100 }}
        okButtonProps={{
          style: {
            borderRadius: 6,
            height: 40,
            fontWeight: 600,
          },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: 6,
            height: 40,
          },
        }}
      >
        <Form form={form} layout="vertical" name="reductionForm">
          <Form.Item
            label={
              <Space>
                <ClockCircleOutlined style={{ color: '#1890ff' }} />
                <span>Số ngày được giảm án</span>
              </Space>
            }
            name="reductionDays"
            rules={[
              { required: true, message: 'Vui lòng nhập số ngày được giảm' },
              { type: 'number', min: 1, message: 'Số ngày phải lớn hơn 0' },
              {
                type: 'number',
                max: 3650,
                message: 'Số ngày không được vượt quá 3650 ngày (10 năm)',
              },
            ]}
            extra="Quy ước: 1 tháng = 30 ngày, 1 năm = 365 ngày"
          >
            <InputNumber
              style={{ width: '100%', height: 40, borderRadius: 6 }}
              placeholder="Nhập số ngày..."
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewCriminals;
