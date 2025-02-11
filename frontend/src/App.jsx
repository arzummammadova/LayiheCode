import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Basket from './pages/Basket';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Addpage from './pages/Addpage';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import AdminUser from './pages/admin/AdminUser';
import ForgotPassword from './pages/auth/forgotpassword/ForgotPassword';
import Resetpassword from './pages/auth/resetpassword/Resetpassword';
import UserSettings from './pages/settings/UserSettings';
import AllBooks from './pages/all books/AllBooks';
import Details from './pages/details/Details';
import Categories from './pages/categories/Categories';
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
      ,{
        path:'/settings',
        element:<UserSettings/>
      }
     ,
     {
      path:"/all",
      element:<AllBooks/>
     }
     ,
     {
      path: "/details/:id",
      element: <Details />
    }
    ,{
      path: "/category/:categoryName",
      element: <Categories />,
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
  ,
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <Resetpassword />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
}

export default App
