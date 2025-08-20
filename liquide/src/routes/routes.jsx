import PublicLayout from '../layouts/publicLayout';
import Login from '../pages/Login';

// Public route configuration
export const publicRoutes = [
  {
    path: "/",
    element: (
      <PublicLayout>
        <div>Dashboard Page (Public)</div>
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
    element: <div>Dashboard Page (Private)</div>,
  },
  {
    path: "/profile",
    element: <div>Profile Page (Private)</div>,
  },
  {
    path: "/settings",
    element: <div>Settings Page (Private)</div>,
  }
];



