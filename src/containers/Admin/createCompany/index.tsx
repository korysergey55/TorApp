import React from 'react'
import { observer } from 'mobx-react'
import AdminForm from './adminForm/index'
import UserAvatar from './userAvatar'
import ColorPiker from './colorPiker'
import AlbomList from './albomList'
import DashboardLabels from './dashboardLabels'

import styles from './styles.module.scss'
import { Button } from 'antd'

const CreateCompany = observer(() => {
  const createCompany = () => {
    console.log('createCompanySubmit')
  }

  return (
    <div className={styles.container}>
      <div className={styles.createCompany}>
        <h2 className={styles.title}>New company - Profile</h2>
        <div className={styles.formWripper}>
          <AdminForm />
          <UserAvatar />
        </div>
        <h2 className={styles.title}>Primary Colors</h2>
        <div className={styles.colorpiker}>
          <div className={styles.wripper}>
            <p className={styles.subtitle}>Please chose a button color</p>
            <ColorPiker name="btnColor" />
          </div>
          <div className={styles.wripper}>
            <p className={styles.subtitle}>Mobile Aplication primary color</p>
            <ColorPiker name="mobileColor" />
          </div>
          <div className={styles.wripper}>
            <p className={styles.subtitle}>Web Aplication primary color</p>
            <ColorPiker name="webColor" />
          </div>
        </div>
        <h2 className={styles.title}>Media Album</h2>
        <AlbomList />
        <h2 className={styles.title}>Dashboard labels</h2>
        <DashboardLabels />
        <Button
          type="primary"
          htmlType="submit"
          form="admin-form"
          className={styles.cereateCompanyBtn}
          onClick={createCompany}
        >
          Create company
        </Button>
      </div>
    </div>
  )
})
export default CreateCompany
