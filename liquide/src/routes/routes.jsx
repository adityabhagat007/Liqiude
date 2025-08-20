import Layout from '../layouts/Layout';
import Login from '../pages/login';
import Dashboard from '../pages/Dashboard';
import BasketDetails from '../pages/BasketDetails';
import HomePage from '../pages/homePage';
import SubscribePage from '../pages/SubscribePage';
import MandatePage from '../pages/mandatePage'; 
import { lazy } from 'react';

const Homepage = lazy(() => import('../pages/homePage'));
const Loginpage = lazy(() => import('../pages/login'));
const Dashboardpage = lazy(() => import('../pages/Dashboard'));
const BasketDetailspage = lazy(() => import('../pages/BasketDetails'));
const Subscribepage = lazy(() => import('../pages/SubscribePage'));
const Mandatepage = lazy(() => import('../pages/mandatePage'));

// Public route configuration
export const publicRoutes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
];

// Private route configuration
export const privateRoutes = [
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboardpage />
      </Layout>
    ),
  },
  {
    path: "/basket/:id",
    element: (
      <Layout>
        <BasketDetailspage />
      </Layout>
    ),
  },
  {
    path: "/subscribe/:basketId",
    element: (
      <Layout>
        <Subscribepage />   
      </Layout>
    ),
  },
  {
    path: "/mandate",
    element: (
      <Layout>
        <Mandatepage />
      </Layout>
    ),
  },
];



