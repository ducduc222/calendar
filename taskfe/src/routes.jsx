import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
/*
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';

import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
*/
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import Dashboard from './pages/dashboard/dashboard';
import Schedule from './pages/schedule/schedule';
import Task from './pages/task/task';
import Project from './pages/project/project';
import Admin from './pages/projectdetail/Admin/ProjectDetail';
import Implementer from './pages/projectdetail/Implementer/ProjectDetail';
import Assignee from './pages/projectdetail/Assignee/ProjectDetail';
import Approver from './pages/projectdetail/Approver/ProjectDetail';
import Supporter from './pages/projectdetail/Supporter/ProjectDetail';
import ProfilePage from './pages/profile/profile';
import Settings from './pages/settings_p/notificaitons';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'task', element: <Task /> },
        { path: 'project', element: <Project /> },
        { path: 'projectdetailid=0', element: <Admin /> },
        { path: 'projectdetailid=1', element: <Implementer /> },
        { path: 'projectdetailid=2', element: <Assignee /> },
        { path: 'projectdetailid=3', element: <Approver /> },
        { path: 'projectdetailid=4', element: <Supporter /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'setting', element: <Settings /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage/>
    },
    {
      path: "forgot-password",
      element: <ForgotPassword/>
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
