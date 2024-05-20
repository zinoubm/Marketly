import React, { useState, useEffect, useContext } from "react";
import { isMobile } from "react-device-detect";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross1Icon } from "@radix-ui/react-icons";
import Logo from "@/components/shared/Logo";
import AccountManagement from "@/components/shared/AccountManagement";
import useCookie from "@/lib/api/useCookie";
import { useNavigate } from "react-router-dom";
import useNotificationApi from "@/lib/api/useNotificationApi";
import NotificationDrawer from "@/components/shared/NotificationDrawer";
import { useAuthStore } from "@/context/authStore";

const SideBarLink = ({ to, label }) => {
  const pathName = useLocation();

  const isActive = pathName.pathname === to;
  return (
    <li>
      <NavLink
        className={`p-3 rounded-md text-black font-normal my-4 px-12  ${
          isActive && " bg-primary-dark text-white "
        } hover:bg-primary-dark transition-colors duration-5 ease-out hover:text-white`}
        to={to}
      >
        {label}
      </NavLink>
    </li>
  );
};

const DashboardLayout = () => {
  const { getToken } = useCookie();
  const navigate = useNavigate();
  const { getNotification , seenNotification} = useNotificationApi();
  const [notificationList , setNotificationList]=useState([])
  const {id}=useAuthStore()

  useEffect(() => {
    if (!getToken()) navigate("/sign-in");
    
    (async ()=>{

      let data =await getNotification()
       data =data.filter((note)=>note.user ==id)

      setNotificationList(data)
    })()
  }, [getToken()]);
  const [isToggle, setisToggle] = useState(!isMobile);

  return (
    <div className="flex">
      {isToggle && (
        <>
          <div className="xl:hidden fixed inset-y-0 z-50 bg-black opacity-60 h-screen w-screen"></div>
          <div className="transition-all fixed  xl:static flex flex-col items-center w-4/5 p-4 xl:w-1/5 inset-y-0  z-50 bg-white h-screen">
            <span className="flex items-center gap-16">
              <Logo size={124} />
              <Button
                className="p-3 bg-primary-dark hover:bg-primary-light hover:text-primary-dark xl:hidden"
                onClick={() => setisToggle(false)}
              >
                <Cross1Icon width="20" height="20" />
              </Button>
            </span>
            <ul className="flex flex-col items-center gap-6 mt-12">
              {/* <SideBarLink to="/dashboard" label="Dashboard" /> */}
              <SideBarLink to="/products" label="Products" />
              <SideBarLink to="/orders" label="Orders" />
              <SideBarLink to="/account" label="Account" />
            </ul>

            <AccountManagement />
          </div>
        </>
      )}

      <main className=" flex-grow max-h-[calc(100vh-60px)] w-10 flex-col flex">
        <div className="flex items-center justify-between p-2 ">
          <div className="flex items-center space-x-2">
            <Toggle
              onClick={() => {
                setisToggle(!isToggle);
              }}
            >
              <HamburgerMenuIcon width="24" height="24" />
            </Toggle>
            <Logo className="xl:hidden " size={162} />
          </div>
          <NotificationDrawer data={notificationList}/>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
