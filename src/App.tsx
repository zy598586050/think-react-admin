import Reatc, { Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Loading from './components/loading'
import router, { IRoute } from './router'
import 'antd/dist/antd.css'
import Auth from './components/auth'

// 路由递归
function childrenRoute({ children }: any) {
  if (!children) {
    return null
  }
  return children.map((item: IRoute) => (
    <Route
      key={Math.random()}
      path={item.path}
      element={
        <Suspense fallback={
          <Loading />
        }>
          {
            item?.isAuth === false ? <item.component/> : <Auth children={<item.component/>}/>
          }
        </Suspense>
      }
    >
      {childrenRoute(item)}
    </Route>
  ))
}

function App() {
  return <Router>
    <Routes>
      {
        router.map((route: IRoute) => (
          <Route
            key={Math.random()}
            path={route.path}
            element={
              <Suspense fallback={
                <Loading />
              }>
                {
                  route?.isAuth === false ? <route.component/> : <Auth children={<route.component/>}/>
                }
              </Suspense>
            }
          >
            {childrenRoute(route)}
          </Route>
        ))
      }
      <Route path='*' element={<Navigate to="/404"/>}></Route>
    </Routes>
  </Router>
}

export default App
