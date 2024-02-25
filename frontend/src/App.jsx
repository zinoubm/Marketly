import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/home/AboutPage";

import AuthLayout from "./pages/auth/AuthLayout";
import SigninForm from "./pages/auth/forms/SigninForm";
import SignupForm from "./pages/auth/forms/SignupForm";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Products from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";

import "./globals.css";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

const App = () => {
  return (
    <main>
      <Toaster richColors position="top-center" />
      <Routes>
        {/* public routes */}
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route element={<AuthLayout />}>
          {/* <Route path="/google" element={<GoogleLoginForm />} /> */}
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* private routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
