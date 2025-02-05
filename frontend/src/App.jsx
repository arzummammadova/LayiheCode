import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Basket from './pages/Basket';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Addpage from './pages/Addpage';
import Details from './pages/Details';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import AdminUser from './pages/admin/AdminUser';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: "/",
        element: <Home />,
      },
      {
        path: '/basket',
        element: <Basket />,
      },
      {
        path:'/add',
        element:<Addpage/>
      }
      ,
      {
        path:'/details/:id',
        element:<Details/>
      }
      ,
      {
        path:"/user",
        element:<AdminUser/>
      }
     
    ],
  },
  {
    path: '*',
    element: <NotFoundPage/>,
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  }
]);
const App = () => {
  return <RouterProvider router={router} />;
}

export default App
