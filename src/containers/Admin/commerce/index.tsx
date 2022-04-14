import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { IMonthsList } from 'models/index'
import { IFormData } from 'models/index'
import dayjs from 'dayjs'

import styles from './styles.module.scss'
import { Input, Tooltip, Table, Checkbox, DatePicker, Space } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import moment from 'moment'

const { RangePicker } = DatePicker
const { Search } = Input
const dateFormat = 'YYYY/MM/DD'

const Commerce = observer(() => {
  const { CreateCompanyStore } = useStore()
  const [filter, setFilter] = useState<string>('')
  const [dateFrom, setDateFrom] = useState<any>(null)
  const [dateTo, setDateTo] = useState<any>(null)
  const columns = [
    {
      title: ' BusinessName',
      dataIndex: 'businessName',
      key: 'businessName',
      className: styles.title,
      sorter: (a: any, b: any) => a.businessName.length - b.businessName.length,
    },
    {
      title: 'CustomerName',
      dataIndex: 'customerName',
      key: 'customerName',
      className: styles.title,
      sorter: (a: any, b: any) => a.customerName.length - b.customerName.length,
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      className: styles.title,
    },
    {
      title: 'LastPayment',
      dataIndex: 'lastPayment',
      key: 'lastPayment',
      className: styles.title,
      sorter: (a: any, b: any) => a.lastPayment.length - b.lastPayment.length,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      className: styles.title,
    },
    {
      title: 'Estimated income',
      dataIndex: 'monthlyPrice',
      key: 'monthlyPrice',
      className: styles.title,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   className: styles.title,
    // },
    // {
    //   title: `Total ${CreateCompanyStore.total} $`,
    //   dataIndex: CreateCompanyStore.total,
    //   key: CreateCompanyStore.total,
    //   className: styles.title,
    // },
  ]

  const onChangeFilter = (e: any) => {
    setFilter(e.target.value)
  }

  const onSearchFilter = () => {
    CreateCompanyStore.filterCommerceList(filter)
  }

  const totalEstimate = () => {
    let total = 0
    CreateCompanyStore.filteredCommerceList.map((item: any) => {
      total += item.monthlyPrice
    })
    return total
  }

  // const onChangeStatus = (e: CheckboxChangeEvent, list: IFormData, month: IMonthsList) => {
  //   const { checked } = e.target
  //   if (checked) {
  //     CreateCompanyStore.setTotalIncrement(list.monthlyPrice, month.month)
  //   } else {
  //     CreateCompanyStore.setTotalDecriment(list.monthlyPrice, month.month)
  //   }
  // }

  const onChangeDatePicker = (name: string, value: any) => {
    if (name === 'from') {
      setDateFrom(value._d.getDate())
    }
    if (name === 'to') {
      setDateTo(value._d.getDate())
    }
    console.log('onChangeDatePicker', value._d.getDate(), value._d.getMonth())
    console.log(dateFrom, dateTo)
  }

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
      <Space className={styles.space}>
        <DatePicker
          // defaultValue={moment('2021/01/01', dateFormat)}
          format={dateFormat}
          onChange={value => onChangeDatePicker('from', value)}
        />
        <DatePicker format={dateFormat} onChange={value => onChangeDatePicker('to', value)} />
      </Space>

      <div className={styles.wripper}>
        {CreateCompanyStore.monthsList.map((month: IMonthsList, index: number) => (
          <div key={index}>
            <div className={styles.tableWripper} key={index}>
              <div className={styles.titleWripper}>
                <h2 className={styles.tableTitle}>{month.month}</h2>
                <h2 className={styles.tableTitle}>Total {totalEstimate()} $</h2>
              </div>
              <Table
                columns={columns}
                dataSource={CreateCompanyStore.filteredCommerceList.map((list: any) => ({
                  key: list.id,
                  businessName: list.name,
                  customerName: list.name,
                  phoneNumber: list.phone,
                  lastPayment: dayjs(list.createdAt).format('dd, D MMMM, HH:mm'),
                  monthlyPrice: list.monthlyPrice,
                  notes: (
                    <Tooltip
                      title={
                        <div>
                          {list.firstName} - NOTES
                          <br />
                          {list.notes}
                        </div>
                      }
                    >
                      <p className={styles.notes}>{list.notes}</p>
                    </Tooltip>
                  ),
                  // status: (
                  //   <Checkbox onChange={e => onChangeStatus(e, list, month)}>Status</Checkbox>
                  // ),
                }))}
                pagination={{ defaultPageSize: 20 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Commerce
