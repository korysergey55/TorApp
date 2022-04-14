import React from 'react'
import { useHistory } from 'react-router'
import { appPaths } from 'utils/paths'
import styles from './styles.module.scss'

import { PageHeader, Button, Descriptions } from 'antd'

const Header = () => {
  const history = useHistory()
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title={
          <a className={styles.link} onClick={() => history.push(appPaths.home)}>
            <span className={styles.underline}>U</span>p
          </a>
        }
        extra={[
          <Button key="0" onClick={() => history.push(appPaths.admin)}>
            Admin
          </Button>,
          <Button key="1">ENG</Button>,
          <h3 key="2">Wersion 4.6</h3>,
        ]}
      ></PageHeader>
    </div>
  )
}

export default Header
