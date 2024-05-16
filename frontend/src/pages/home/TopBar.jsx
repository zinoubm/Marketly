import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { IconInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { MdPersonOutline } from "react-icons/md";
import CartDrawer from "@/components/shared/CartDrawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useCookie from "@/lib/api/useCookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
import { useUserInfo } from "@/context/userStore";
import { clearStateStorage } from "@/context/clearStateStorage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const TopBar = () => {
  const { deleteToken } = useCookie();
  const navigate = useNavigate();
  const [URLparams, setSearchParams] = useSearchParams();
  const { first_name, last_name, reset } = useAuthStore();

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    for (const [key, value] of URLparams.entries()) {
      if (key == "search") setSearchValue(value);
    }
  }, []);

  const logout = () => {
    clearStateStorage();
    reset();
    deleteToken();
    navigate("/sign-in");
  };
  const { image } = useUserInfo();
  return (
    <nav className="flex sm:justify-between justify-around items-center p-4 md:px-8 px-1  w-full">
      <Logo className={"sm:ml-8"} size={100} />
      <form className="flex md:gap-4  gap-1   " action="/search">
        <IconInput
          icon={() => <IoIosSearch size={20} />}
          type="search"
          name="search"
          placeholder="search product "
          className=" lg:w-96 sm:w-52 w-40 py-4"
          value={searchValue}
          onChange={(e) => setSearchValue(e.value)}
        />
        <Button
          type="submit"
          className="bg-primary-light text-md     font-normal  hidden sm:block sm:px-6"
        >
          Search
        </Button>
      </form>
      <div className="flex md:gap-4 ">
        
        <CartDrawer>
          <button className="md:flex hover:bg-gray-100 p-2 rounded-lg hidden items-center gap-1">
            <LuShoppingCart />
            cart
          </button>
        </CartDrawer>
        <button className="md:flex hover:bg-gray-100 p-2 rounded-lg hidden items-center gap-1">
          <FaChartLine />
          compare
        </button>
        {first_name ? (
          <Popover>
            <PopoverTrigger className="flex items-center">
              {image ? (
                // <img src={image} className="h-10 rounded-full mr-2"  alt="profile Image" />
                <Avatar className="size-8 mx-1">
                  <AvatarImage src={image} className="object-cover" />
                  <AvatarFallback className="  font-light ">
                    <IoPersonCircleSharp size={35} className="m-1" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <IoPersonCircleSharp size={35} className="m-1" />
              )}
              <h1 className="hidden sm:flex ">
                {first_name} {last_name}
              </h1>
            </PopoverTrigger>
            <PopoverContent className="flex items-start  p-1 flex-col  w-36 ">
              <div className="sm:hidden flex  ">
                {first_name} {last_name}
              </div>
              <Separator className="sm:hidden" />
              <div className="mt-1 w-full hover:bg-blue-200 rounded-lg p-1">
                <Link to={"/dashboard"} className="flex w-full gap-2">
                  <MdOutlineDashboardCustomize size={20} />
                  dashboard
                </Link>
              </div>
              <div className="md:hidden flex w-full hover:bg-blue-200 rounded-lg p-1">
                <CartDrawer className="w-full flex gap-2">
                  <LuShoppingCart size={20} />
                  cart
                </CartDrawer>
              </div>
              <div className="md:hidden flex items-center w-full gap-2 hover:bg-blue-200 rounded-lg p-1">
                <FaChartLine size={15} /> compare
              </div>
              <div
                onClick={logout}
                className="flex w-full gap-2 hover:bg-blue-200 rounded-lg p-1"
              >
                <BiLogOut size={20} />
                logout
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            to={"/sign-in"}
            className="flex md:min-w-8 py-2 p-1 hover:bg-gray-100 sm:p-2 ml-2 rounded-lg text-md  sm:text-lg   items-center justify-center sm:gap-1"
          >
            Sign In
            <MdPersonOutline size={24} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
