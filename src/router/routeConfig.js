import { lazy } from 'react'
/*
    基本上延伸Route组件
    多了useAuth来决定访问是否需要登录状态
*/

/* IRouteInterFace = {
    path: String; // Route組件的 path
    component: Function; // Route组件的 component
    name?: String;
    useAuth?: Boolean; // 訪問是否需要登陆状态
    exact?: Boolean; // Route组件的 exact
} */

const RouteConfig = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/pages/home')),
  },
  {
    path: '/liveList/:id',
    exact: true,
    component: lazy(() => import('@/pages/premiere')),
  },
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('@/pages/premiere')),
  },
  {
    path: '/',
    redirect: '/',
  },
]

export default RouteConfig
