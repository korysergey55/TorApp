import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import LabalsList from './LabelsList'

import styles from './styles.module.scss'
import { Select, Input } from 'antd'
const { Option } = Select

const DashboardLabels = observer(() => {
  const { CreateCompanyStore } = useStore()
  const [language, setLanguage] = useState<string>('english')
  const [key, setKey] = useState<string>('')

  const onChangeLanguage = (value: string) => {
    setLanguage(value)
    CreateCompanyStore.setLanguage(value)
  }

  const onChangeKey = (e: any) => {
    setKey(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wripper}>
        <h2 className={styles.title}>Default Mobile language</h2>
        <Select
          className={styles.select}
          showSearch
          placeholder="Select language"
          optionFilterProp="children"
          onChange={onChangeLanguage}
          defaultValue={'english'}
        >
          <Option value="english">English</Option>
          <Option value="russian">Russian</Option>
          <Option value="hebrew">Hebrew</Option>
        </Select>
      </div>
      <div className={styles.wripper}>
        <h2 className={styles.title}>Crate new label</h2>
        <Input
          className={styles.inputKey}
          placeholder="Please insert a key"
          value={key}
          onChange={onChangeKey}
        />
      </div>
      <LabalsList />
    </div>
  )
})

export default DashboardLabels
