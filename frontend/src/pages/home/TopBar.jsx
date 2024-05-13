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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <nav className="flex sm:justify-between justify-around items-center p-4 md:px-8 px-0  w-full">
      <Logo className={"ml-8"} size={100} />
      <form className="flex gap-4   " action="/search">
        <IconInput
          icon={() => <IoIosSearch size={20} />}
          type="search"
          name="search"
          placeholder="search product "
          className=" lg:w-96   py-4"
          value={searchValue}
          onChange={(e) => setSearchValue(e.value)}
        />
        <Button
          type="submit"
          className="bg-primary-light text-md    font-normal px-6"
        >
          Search
        </Button>
      </form>
      <div className="flex gap-4">
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
                <Separator className="sm:hidden"/>
                <div className="mt-1 w-full hover:bg-blue-200 rounded-lg p-1">

                <Link to={"/dashboard"} className="flex w-full gap-2">
                  <MdOutlineDashboardCustomize size={20} />
                  dashboard
                </Link>
                </div>
                <div  className="md:hidden flex w-full hover:bg-blue-200 rounded-lg p-1">
                <CartDrawer className="w-full flex gap-2">
                  <LuShoppingCart size={20} />
                  cart
                </CartDrawer>
                </div>
                <div className="md:hidden flex items-center w-full gap-2 hover:bg-blue-200 rounded-lg p-1">
                <FaChartLine size={15} /> compare
                </div>
                <div onClick={logout} className="flex w-full gap-2 hover:bg-blue-200 rounded-lg p-1">
                <BiLogOut size={20} />
                logout
                </div>
              </PopoverContent>
          </Popover>
        ) : (
          <Link
            to={"/sign-in"}
            className="md:flex hover:bg-gray-100 p-2 rounded-lg  items-center gap-1"
          >
            <MdPersonOutline size={24} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
