import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { IFormData } from 'models/index'
import dayjs from 'dayjs'

import styles from './styles.module.scss'
import { Input, Switch, Tooltip, Table } from 'antd'
const { Search } = Input

const CompanyList = observer(() => {
  const { CreateCompanyStore } = useStore()
  const [filter, setFilter] = useState<string>('')
  const dataTable: any = []
  const column: any = [
    {
      title: ' BusinessName',
      dataIndex: 'businessName',
      key: 'businessName',
      className: styles.title,
      sorter: (a: any, b: any) => a.businessName.length - b.businessName.length,
      // responsive: ['lg'],
    },
    {
      title: 'CustomerName',
      dataIndex: 'customerName',
      key: 'customerName',
      className: styles.title,
      sorter: (a: any, b: any) => a.customerName.length - b.customerName.length,
      // responsive: ['lg'],
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      className: styles.title,
      // responsive: ['lg'],
    },
    {
      title: 'CreationDate',
      dataIndex: 'creationDate',
      key: 'creationDate',
      className: styles.title,
      sorter: (a: any, b: any) => a.creationDate.length - b.creationDate.length,
      // responsive: ['lg'],
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      className: styles.title,
      // responsive: ['lg'],
    },
    {
      title: 'Deactivate',
      dataIndex: 'deactivate',
      key: 'deactivate',
      className: styles.title,
      // responsive: ['lg'],
    },
  ]

  const onSearchFilter = () => {
    CreateCompanyStore.setFilterCompanyList(filter)
  }

  const onChangeFilter = (e: any) => {
    setFilter(e.target.value)
  }

  const onChangeDeactivate = (checked: any) => {
    console.log(`switch to ${checked}`)
  }

  CreateCompanyStore.filteredCompanyList.map((list: any) =>
    dataTable.push({
      key: list.id,
      businessName: list.name,
      customerName: list.name,
      phoneNumber: list.phone,
      creationDate: dayjs(list.createdAt).format('dd, D MMMM, HH:mm'),
      notes: (
        <Tooltip
          title={
            <div>
              {list.name} - NOTES
              <br />
              {list.notes}
            </div>
          }
        >
          <p className={styles.notes}>{list.notes}</p>
        </Tooltip>
      ),
      deactivate: <Switch defaultChecked onChange={onChangeDeactivate} />,
    })
  )

  return (
    <div className={styles.container}>
      <Search
        className={styles.filter}
        placeholder="Search..."
        enterButton="Search"
        size="large"
        name="filter"
        value={filter}
        onSearch={onSearchFilter}
        onChange={onChangeFilter}
      />
      <Table
        className={styles.table}
        columns={column}
        dataSource={dataTable}
        pagination={{ defaultPageSize: 20 }}
      />
    </div>
  )
})

export default CompanyList
