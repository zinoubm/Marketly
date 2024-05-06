import { Outlet, useLocation} from "react-router-dom";
import AnimatedCursor from "@/components/shared/AnimatedCursor";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import Spline from '@splinetool/react-spline';
const AuthLayout = () => {
  const location = useLocation()
  console.log(location.pathname);
  
  return (
    <>
      
        <div className="flex h-screen">
          <aside className="hidden p-4 pt-8 xl:flex xl:flex-col justify-between bg-primary-light w-1/5 items-center">
            <Logo size={124} theme={"dark"} />

            <Spline className=" ml-24 absolute overflow-hidden h-52" scene="https://prod.spline.design/hW7qYCOLJFNWRMKV/scene.splinecode" />
            <a className="font-light text-white text-xs">Company, Inc</a>
          </aside>
          <section className="flex flex-1 flex-col items-center pt-4 justify-center relative">
            <Outlet />

            <img
              className={`xl:hidden ${location.pathname ==="/sign-in" ? "absolute bottom-4" :""} `}
              src="/assets/logo-full-light-bg.svg"
              width={140}
              />
          </section>
        </div>
    </>
  );
};

export default AuthLayout;
