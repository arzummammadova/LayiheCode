import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
// import Basket from './pages/Basket';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Addpage from './pages/admin/Addpage';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import AdminUser from './pages/admin/AdminUser';
import ForgotPassword from './pages/auth/forgotpassword/ForgotPassword';
import Resetpassword from './pages/auth/resetpassword/Resetpassword';
import UserSettings from './pages/settings/UserSettings';
import AllBooks from './pages/all books/AllBooks';
import Details from './pages/details/Details';
import Categories from './pages/categories/Categories';
import Author from './pages/categories/Author';
import AddToRead from './pages/addtoread/AddToRead';
import Readed from './pages/readed/Readed';
import Favorite from './pages/favorite/Favorite';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import RecomendationPage from './pages/recomendation/RecomendationPage';

const App = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin); 

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        // { path: '/basket', element: <Basket /> },
        { path: '/details/:id', element: <Details /> },
        { path: "/category/:categoryName", element: <Categories /> },
        { path: "/author/:authorname", element: <Author /> },
        { path: "/addtoread", element: <AddToRead /> },
        { path: "/readed", element: <Readed /> },
        { path: "/favorite", element: <Favorite /> },
        { path: "/all", element: <AllBooks /> },
        { path: '/settings', element: <UserSettings /> },
        {path:'recomendation',element:<RecomendationPage/>},

        {
          path: '/add',
          element: (
            <ProtectedRoute isAdmin={isAdmin}>
              <Addpage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/user',
          element: (
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminUser />
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/reset-password/:token", element: <Resetpassword /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
