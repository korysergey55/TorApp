import React, { Suspense, lazy } from 'react'
import store from 'stores'
import history from 'utils/history'
import { Router, Switch, Route, Redirect } from 'react-router'
import { Provider } from 'mobx-react'
import PrivateRoute from 'components/PrivateRoute'
import { appPaths } from 'utils/paths'
import Loader from 'components/Loader'
import NotFoundComponent from 'components/NotFound'
import AdminPage from 'containers/Admin'

const HomePage = lazy(() => import('containers/Public/HomePage/index'))

const App = () => {
  return (
    <Provider {...store}>
      <Router history={history}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact={false} path={appPaths.admin} component={AdminPage} />
            <Route exact path={appPaths.home} component={HomePage} />
            <Route exact path={appPaths.notFound} component={NotFoundComponent} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
