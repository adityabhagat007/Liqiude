import PublicLayout from '../layouts/publicLayout';
import Login from '../pages/login';
import Dashboard from '../pages/Dashboard';

// Public route configuration
export const publicRoutes = [
  {
    path: "/",
    element: (
      <PublicLayout>
        <div>Home Page (Public)</div>
      </PublicLayout>
    ),
  },
  {
    path: "/baskets",
    element: (
      <PublicLayout>
        <div>Baskets Page (Public)</div>
      </PublicLayout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: (
      <PublicLayout>
        <div>Register Page (Public)</div>
      </PublicLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <PublicLayout>
        <div>About Page (Public)</div>
      </PublicLayout>
    ),
  }
];

// Private route configuration
export const privateRoutes = [
  {
    path: "/dashboard",
    element: (
      <PublicLayout>
        <Dashboard />
      </PublicLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <PublicLayout>
        <div>Profile Page (Private)</div>
      </PublicLayout>
    ),
  },
  {
    path: "/settings",
    element: (
      <PublicLayout>
        <div>Settings Page (Private)</div>
      </PublicLayout>
    ),
  }
];



