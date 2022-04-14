import React from 'react'
import { observer } from 'mobx-react'
import UploadComponent from './uploadComponent/index'

import styles from './styles.module.scss'

const UserAvatar = observer(() => {
  return (
    <div className={styles.logoContainer}>
      <UploadComponent />
    </div>
  )
})

export default UserAvatar
