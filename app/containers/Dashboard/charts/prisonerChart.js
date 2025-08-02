import { Card, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import messages from 'containers/Dashboard/messages';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Text } = Typography;

const PrisonerChart = ({ loading, data }) => {
  const intl = useIntl();

  const chartData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        label: intl.formatMessage(messages.prisonerCount),
        data: data.map(item => item.value),
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${intl.formatMessage(messages.countLabel)}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
        },
      },
    },
  };

  return (
    <Card
      loading={loading}
      className=""
      bordered={false}
      title={intl.formatMessage(messages.prisonerChart)}
      style={{
        height: '100%',
      }}
    >
      <div>
        <Text>{intl.formatMessage(messages.prisonerChart)}</Text>
        <div style={{ height: '300px', position: 'relative' }}>
          {data && data.length > 0 ? (
            <Bar data={chartData} options={options} />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {loading ? intl.formatMessage(messages.loadingData) : intl.formatMessage(messages.noData)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

PrisonerChart.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
};

PrisonerChart.defaultProps = {
  loading: false,
  data: [],
};

export default PrisonerChart; 