import React, { useEffect, Suspense } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import routes from './routeConfig'
import store from '@/store'
const Routes = () => {
  const history = useHistory()
  return (
    <Switch>
      {routes
        .filter(item => (store.userInfo ? item.path : !item.useAuth))
        .map((item, index) =>
          item.component ? (
            <Route
              exact
              key={index}
              path={item.path}
              render={() => (
                <item.component title={item.title} route={item.children} history={history} />
              )}
            />
          ) : (
            <Redirect to='/' key={index} />
          )
        )}
    </Switch>
  )
}
const IndexRouter = () => {
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    switch (true) {
      case location.pathname.includes('personal') && !store.userInfo:
        history.push('/')
        break
      default:
        window.scrollTo(0, 0)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  return (
    <React.Fragment>
      <Suspense fallback={'...'}>
        <Routes store={store} />
      </Suspense>
    </React.Fragment>
  )
}

export default inject('store')(observer(IndexRouter))
