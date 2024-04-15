import { Outlet, Navigate } from "react-router-dom";
import AnimatedCursor from "@/components/shared/AnimatedCursor";
import Logo from "@/components/shared/Logo";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex h-screen">
          <aside className="hidden p-4 pt-8 xl:flex xl:flex-col justify-between bg-primary-light w-1/5 items-center">
            <Logo size={124} theme={"dark"} />
            {/* spline here */}
            <a className="font-light text-white text-xs">Company, Inc</a>
          </aside>
          <section className="flex flex-1 flex-col items-center justify-center relative">
            <Outlet />
            <img
              className="xl:hidden absolute bottom-4"
              src="/assets/logo-full-light-bg.svg"
              width={140}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
