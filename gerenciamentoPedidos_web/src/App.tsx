import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserLoginPage } from './pages/user-login'
import { OnTablePage } from './pages/on-table'
import ErrorPage from './pages/error-page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLoginPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/table/:clientTable",
    element: <OnTablePage/>,
    errorElement: <ErrorPage/>
  }
])

export function App() {
  
  return (
  <RouterProvider router={router}/>
)}



