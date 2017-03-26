// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'
import LoginRoute from './Login'
import SettingRoute from './Setting'
import MsgCenterRoute from './MsgCenter'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LoginRoute(store),
  childRoutes: [
    SettingRoute(store),
    MsgCenterRoute(store),
    RouteRoute(store),
    PageNotFound(),
    Redirect
  ]
})

export default createRoutes
