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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCookie from "@/lib/api/useCookie";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
import { useUserInfo } from "@/context/userStore";
import { clearStateStorage } from "@/context/clearStateStorage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
  const { deleteToken } = useCookie();
  const navigate = useNavigate();

  const logout = () => {
    deleteToken();
    clearStateStorage();
    navigate("/sign-in");
  };
  const { first_name, last_name } = useAuthStore();
  const { image } = useUserInfo();
  return (
    <nav className="flex sm:justify-between justify-around items-center p-4 md:px-8 px-0  w-full">
      <Logo className={"ml-8"} size={100} />
      <form className="flex gap-4   ">
        <IconInput
          icon={() => <IoIosSearch size={20} />}
          type="search"
          name="q"
          placeholder="search product "
          className=" lg:w-96   py-4"
        />
        <Button
          type="submit"
          className="bg-primary-light text-md    font-normal px-6"
        >
          Search
        </Button>
      </form>
      <div className="flex gap-4">
        <button className="md:flex hover:bg-gray-100 p-2 rounded-lg hidden items-center gap-1">
          <LuShoppingCart />
          cart
        </button>
        <button className="md:flex hover:bg-gray-100 p-2 rounded-lg hidden items-center gap-1">
          <FaChartLine />
          compare
        </button>
        {first_name ? (
          <DropdownMenu >
            <DropdownMenuTrigger className="flex items-center">
              {image ? (
                // <img src={image} className="h-10 rounded-full mr-2"  alt="profile Image" />
                <Avatar className="size-8 mx-1">
                  <AvatarImage  src={image}  className="object-cover" />
                <AvatarFallback className="text-primary-semi-dark text-xs font-light bg-primary-light">
                  
                <IoPersonCircleSharp size={35} className="m-1" />
                </AvatarFallback>

              </Avatar>
  
              ) : (
                <IoPersonCircleSharp size={35} className="m-1" />
              )}
              <h1 className="hidden sm:flex">
                {first_name} {last_name}
              </h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" flex items-start flex-col ">
              <DropdownMenuLabel className="sm:hidden flex ">
                {first_name} {last_name}
              </DropdownMenuLabel>
              <hr className="sm:hidden flex" />
              <DropdownMenuItem>
                <Link to={"dashboard"} className="flex gap-2">
                  <MdOutlineDashboardCustomize size={20} />
                  dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden flex  gap-2">
                <LuShoppingCart size={20} />
                cart
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden flex gap-2">
                <FaChartLine size={15} /> compare
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex gap-2">
                <BiLogOut size={20} />
                logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to={"/sign-in"}
            className="md:flex hover:bg-gray-100 p-2 rounded-lg hidden items-center gap-1"
          >
            <MdPersonOutline size={24} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
