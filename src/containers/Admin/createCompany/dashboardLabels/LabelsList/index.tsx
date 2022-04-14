import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'

import styles from './style.module.scss'
import { Input, Table } from 'antd'
const { Search } = Input

const LabalsList = observer(() => {
  const { CreateCompanyStore } = useStore()
  const [filter, setFilter] = useState<string>('')
  const data: any = []
  const columns: any = []

  const onSearchFilter = () => {
    CreateCompanyStore.setFilterLabels(filter)
  }

  const onChangeFilter = (e: any) => {
    setFilter(e.target.value)
  }

  CreateCompanyStore.labelLanguages.map((lang: string) =>
    columns.push({
      title: lang,
      dataIndex: lang,
      key: lang,
    })
  )

  CreateCompanyStore.filteredLabals.map((item: any) =>
    data.push({
      key: item.id,
      userkey: item.name,
      english: item.name,
      russian: item.name,
      hebrew: item.name,
    })
  )

  return (
    <div className={styles.container}>
      <Search
        className={styles.filter}
        placeholder="Search for label"
        enterButton="Search"
        size="large"
        name="filter"
        value={filter}
        onSearch={onSearchFilter}
        onChange={onChangeFilter}
      />
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 30 }} />
    </div>
  )
})

export default LabalsList
