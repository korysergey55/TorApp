import React, { useEffect } from 'react'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router'
import { adminRoutes } from 'utils/adminRoutes'
import Header from 'components/Header'
import SideBar from './SideBar'

import styles from './styles.module.scss'

const AdminPage = () => {
  const history = useHistory()
  const match = useRouteMatch()

  useEffect(() => {
    history.push(match.path + '/main')
  }, [])

  return (
    <div className={styles.adminPage}>
      <Header />
      <div className={styles.container}>
        <SideBar />
        <div className={styles.routesContainer}>
          <Switch>
            {adminRoutes.map(route => (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={route.path}
              />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
