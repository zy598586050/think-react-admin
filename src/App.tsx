import Reatc, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from './components/loading'
import router, { IRoute } from './router'
import 'antd/dist/antd.css'
import NotFound from './views/home/404'
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
            item?.redirect === false ? <item.component/> : <Auth children={<item.component/>}/>
          }
        </Suspense>
      }
    >
      {childrenRoute(item)}
    </Route>
  ))
}

function App() {
  return <BrowserRouter>
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
                  route?.redirect === false ? <route.component/> : <Auth children={<route.component/>}/>
                }
              </Suspense>
            }
          >
            {childrenRoute(route)}
          </Route>
        ))
      }
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App
