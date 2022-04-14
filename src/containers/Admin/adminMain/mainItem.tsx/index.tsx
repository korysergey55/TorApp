import React from 'react'
import { IAdminTabsJSON } from '../../../../models'
import styles from './styles.module.scss'
import { Card } from 'antd'
const { Meta } = Card

interface IProps {
  item: IAdminTabsJSON
}

const MainItem: React.FC<IProps> = ({ item }) => {
  const onChange = (item: IAdminTabsJSON) => {
    console.log(item.name)
  }

  return (
    <li className={styles.item} onClick={() => onChange(item)}>
      <Card hoverable style={{ width: 240 }} cover={<img alt="logo" src={item.logo} />}>
        <Meta title={item.businessName} description={item.name} />
      </Card>
    </li>
  )
}

export default MainItem
