import { Card, Radio, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { BROWSER, OS } from 'containers/Dashboard/constants';
import { useIntl } from 'react-intl';
import messages from 'containers/Dashboard/messages';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const { Text } = Typography;

const DeviceChart = ({ deviceType, loading, data, handleChange }) => {
  const intl = useIntl();

  const chartData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card
      loading={loading}
      className=""
      bordered={false}
      title={intl.formatMessage(messages.deviceChart)}
      style={{
        height: '100%',
      }}
      extra={
        <div className="">
          <div className="">
            <Radio.Group value={deviceType} onChange={handleChange}>
              <Radio.Button value={BROWSER}>Browser</Radio.Button>
              <Radio.Button value={OS}>Os</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
    >
      <div>
        <Text>{intl.formatMessage(messages.deviceChart)}</Text>
        <div style={{ height: '300px', position: 'relative' }}>
          {data && data.length > 0 ? (
            <Pie data={chartData} options={options} />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu'}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

DeviceChart.propTypes = {
  deviceType: PropTypes.string,
  // intl: PropTypes.object,
  loading: PropTypes.bool,
  handleChange: PropTypes.func,
  data: PropTypes.array,
};

export default DeviceChart;
