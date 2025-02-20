import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { checkAuth } from './store/authSlice';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
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
import { checkAuth } from './redux/features/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAdmin, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading">Loading...</div>; 
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/details/:id', element: <Details /> },
        { path: '/category/:categoryName', element: <Categories /> },
        { path: '/author/:authorname', element: <Author /> },
        { path: '/addtoread', element: <AddToRead /> },
        { path: '/readed', element: <Readed /> },
        { path: '/favorite', element: <Favorite /> },
        { path: '/all', element: <AllBooks /> },
        { path: '/settings', element: <UserSettings /> },
        { path: '/recomendation', element: <RecomendationPage /> },
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
    { path: '/forgotpassword', element: <ForgotPassword /> },
    { path: '/reset-password/:token', element: <Resetpassword /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
