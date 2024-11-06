import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserLoginPage } from './pages/user-login'
import { OnTablePage } from './pages/on-table'
import ErrorPage from './pages/error-page'
import { OnMenu } from './pages/menu'
import { ProductDetailsPage } from './pages/ProductDetails'


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
  },
  {
    path: "/cardapio",
    element: <OnMenu/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/cardapio/:productName",
    element:<ProductDetailsPage/>,
    errorElement: <ErrorPage/>
  }

])

export function App() {
  
  return (
  <RouterProvider router={router}/>
)}



