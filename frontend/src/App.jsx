import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "./pages/home/HomePage";

import { PaymentFailed , PaymentSucceded } from "./pages/payment";
import AuthLayout from "./pages/auth/AuthLayout";
import SigninForm from "./pages/auth/forms/SigninForm";
import SignupForm from "./pages/auth/forms/SignupForm";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";

import "./globals.css";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Account from "./pages/dashboard/Account";
import SearchPage from "./pages/search/SearchPage";

const App = () => {
  return (
    <main>
      <Toaster richColors position="top-center" />
      <Routes>
        {/* public routes */}
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* private routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/payment-succeded" element={<PaymentSucceded/>}/>
        <Route path="/payment-failed" element={<PaymentFailed/>}/>
      </Routes>
    </main>
  );
};

export default App;
