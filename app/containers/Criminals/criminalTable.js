import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Birth date',
    dataIndex: 'birthdate',
    key: 'birthdate',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Detail</a>
        <a>Modified</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    birthdate: '2022-12-12',
    address: 'Trần phú, Hải Châu, TP. Đà Nẵng',
    tags: ['Đang thi hành án'],
  },
  {
    key: '2',
    name: 'Nguyễn Văn B',
    birthdate: '2022-12-12',
    address: 'Trần phú, Hải Châu, TP. Đà Nẵng',
    tags: ['Đang thi hành án'],
  },
  {
    key: '3',
    name: 'Nguyễn Văn C',
    birthdate: '2022-12-12',
    address: 'Trần phú, Hải Châu, TP. Đà Nẵng',
    tags: ['Đang thi hành án'],
  },
];
const CriminalTable = () => <Table columns={columns} dataSource={data} />;
export default CriminalTable;
