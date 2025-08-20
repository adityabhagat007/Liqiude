import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import PrivateRoutes from "./routes/routeAuthentication";
import Page404 from "./pages/page404";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
          {/* 404 Route */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
