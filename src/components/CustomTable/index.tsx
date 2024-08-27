import React, { useRef, useState } from 'react';
import { SearchOutlined, EyeOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Progress } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import DetailsDrawer from '../DetailsDrawer';
import './style.scss'; // Import the styles
import { CandidateProfile } from '../../contracts/CandidateProfile/interfaces'; // Import the CandidateProfile interface

interface CustomTableProps {
  data: CandidateProfile[];
}

type DataIndex = keyof CandidateProfile;

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | ''>('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<CandidateProfile | null>(null);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<CandidateProfile> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => close()}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const showDrawer = (record: CandidateProfile) => {
    setDrawerData(record);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setDrawerData(null);
  };

  const handleContactClick = (type: 'phone' | 'email', value: string) => {
    if (type === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${value}`;
    }
  };

  const iconStyle = {
    fontSize: '18px',
    color: '#1677ff',
    cursor: 'pointer',
  };

  const columns: TableColumnsType<CandidateProfile> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Aggregated Score',
      dataIndex: 'aggregatedScore',
      key: 'aggregatedScore',
      width: '10%',
      render: (score: number) => (
        <Progress
          type="circle"
          percent={(score / 5) * 100}
          strokeColor={{
            '0%': '#ff4d4f',
            '100%': '#52c41a',
          }}
          format={() => score.toFixed(2)}
          width={40}
          strokeWidth={10} // Thicker stroke
        />
      ),
      sorter: (a, b) => a.aggregatedScore - b.aggregatedScore,
    },
    {
      title: 'Current Position',
      dataIndex: 'currentPosition',
      key: 'currentPosition',
      width: '15%',
      sorter: (a, b) => a.currentPosition.localeCompare(b.currentPosition),
    },
    {
      title: 'Current Company',
      dataIndex: 'currentCompany',
      key: 'currentCompany',
      width: '10%',
      sorter: (a, b) => a.currentCompany.localeCompare(b.currentCompany),
    },
    {
      title: 'Total Experience',
      dataIndex: 'totalExperience',
      key: 'totalExperience',
      width: '10%',
      sorter: (a, b) => a.totalExperience - b.totalExperience,
    },
    {
      title: 'Contact',
      key: 'contact',
      width: '8%',
      render: (_, record) => (
        <Space>
          <Tooltip title={record.phone}>
            <PhoneOutlined onClick={() => handleContactClick('phone', record.phone)} style={iconStyle} />
          </Tooltip>
          <Tooltip title={record.email}>
            <MailOutlined onClick={() => handleContactClick('email', record.email)} style={iconStyle} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Details',
      key: 'details',
      width: '7%',
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => showDrawer(record)} />
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      {drawerData && (
        <DetailsDrawer
          visible={drawerVisible}
          onClose={closeDrawer}
          data={drawerData}
        />
      )}
    </>
  );
};

export default CustomTable;
