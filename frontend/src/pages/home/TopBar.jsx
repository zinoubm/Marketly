import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { IconInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCookie from "@/lib/api/useCookie";
import { useAuthStore } from "@/context/authStore";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { deleteToken } = useCookie();
  const navigate = useNavigate();

  const logout = () => {
    deleteToken();
    navigate("/sign-in");
  };
  const { first_name, last_name } = useAuthStore();
  return (
    <nav className="flex justify-between items-center p-4 px-8 w-full">
      <Logo className={"ml-8"} size={100} />
      <form className="flex gap-4 ">
        <IconInput
          icon={() => <IoIosSearch size={20} />}
          type="search"
          name="q"
          placeholder="search product "
          className=" w-96 py-4"
        />
        <Button type="submit" className="bg-primary-light text-md">
          Search
        </Button>
      </form>
      <div className="flex gap-4">
        <button className="flex items-center gap-1">
          <LuShoppingCart />
          cart
        </button>
        <button className="flex items-center gap-1">
          <FaChartLine />
          compare
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <IoPersonCircleSharp size={28} className="m-1" />
            {first_name} {last_name}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>dashboard</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TopBar;
