import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { userTabsJSON } from '../../../sources/data/usersTabsJSON'
import MainItem from './mainItem.tsx'
import styles from './styles.module.scss'

const AdminMain = observer(() => {
  const { CreateCompanyStore } = useStore()

  useEffect(() => {
    CreateCompanyStore.getAllUsersAPI()
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {userTabsJSON.map(item => (
          <MainItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
})

export default AdminMain
