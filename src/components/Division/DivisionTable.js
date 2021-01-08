import React from 'react'
import { Table, Spin, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './DivisionTable.scss';
import { useDivision } from '../../Context/division-context';



function DivisionTable() {
  const { loading, divisions, nameFilter, supDivisionFilter, levelFilter } = useDivision();

  const columns = [
    {
      title: 'División',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: nameFilter,
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.name.indexOf(value) === 0;
      },
    },
    {
      title: 'División superior',
      dataIndex: 'superior_division',
      sorter: (a, b) => a.superior_division.localeCompare(b.superior_division),
      filters: supDivisionFilter,
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.superior_division.indexOf(value) === 0;
      },
    },    
    {
      title: 'Colaboradores',
      dataIndex: 'employees',
      sorter: (a, b) => a.employees - b.employees
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      sorter: (a, b) => a.level - b.level,
      filters: levelFilter,
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.level === value;
      },
    },
    {
      title: 'Subdivisiones',
      dataIndex: 'subdivisions',
      sorter: (a, b) => a.subdivisions - b.subdivisions,
      render: (_, record) => {
        return (
          <span>
            <Typography.Link onClick={() => console.log(record)}>
              {record.subdivisions}
            </Typography.Link>            
            <Button type="primary" shape="circle" size="small" icon={<PlusOutlined />} />
          </span>
        )
      }
    },
    {
      title: 'Embajadores',
      dataIndex: 'ambassador'
    },
    
  ];
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin tip="Cargando..." />
      </div>
    );
  }
  return (
    <Table  
    columns={columns}
    pagination={{ 
      position: ['none', 'bottomRight'],
      pageSize: 20,
      showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} divisiones`
    }}
    dataSource={divisions}
    />    
  );
}

export default DivisionTable;