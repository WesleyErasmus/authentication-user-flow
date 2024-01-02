import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import your components for each route
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Home from "./App";
import ResetPassword from './pages/Auth/ResetPassword'

/* Constants defining the route paths to ensure centralized management.
By using these constants throughout the application, updates or modifications
need to be made only in the routes.tsx component, providing a single source
of truth for route paths. This prevents the need for updating paths in multiple
locations across the app whenever a route changes. */
export const homePage = "/";
export const signUpPage = "/signup";
export const loginPage = "/login";
export const resetPassword = "/passwordReset";

const routes = (
  <BrowserRouter>
    <Routes>
      {/* App Home Page */}
      <Route path={homePage} element={<Home />} />
      {/* Sign Up Page */}
      <Route path={signUpPage} element={<SignUp />} />
      {/* Login Page */}
      <Route path={loginPage} element={<Login />} />
      {/* Login Page */}
      <Route path={resetPassword} element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);

export default routes;
