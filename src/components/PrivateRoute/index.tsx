import React from 'react'
import { useStore } from 'stores'
import { Route, Redirect } from 'react-router-dom'
import { appPaths } from 'utils/paths'

const accessToken = true

interface IProps {
  path: string
  exact: boolean
  component: any
}
const PrivateRoute: React.FC<IProps> = ({ path, exact, component }) => {
  // const { authAPI } = useStore()
  return !accessToken ? (
    <Redirect to={appPaths.home} />
  ) : (
    <Route path={path} exact={exact} component={component} />
  )
}

export default PrivateRoute
