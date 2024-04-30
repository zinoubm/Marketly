import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from "@/lib/api/useCookie";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { clearStateStorage } from "@/context/clearStateStorage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {useAuthStore} from "@/context/authStore"
const AccountManagement = () => {
  const {first_name , last_name , reset} = useAuthStore()
  
  const { deleteToken } = useCookie();
  const navigate = useNavigate();

  const logout = () => {
    clearStateStorage()
    reset()
    deleteToken();
    navigate("/");
  };

  // const plan = "free";
  // const status = true;
  return (
    <div className="mt-auto w-full">
      {/* <Button
        className={`w-full font-light ${
          status ? "bg-primary-light" : "bg-red-500"
        }  text-primary-semi-dark hover:bg-primary-light-hover`}
      >
        <span className="font-bold text-sm mr-8">
          {plan.toUpperCase() + " " + "Plan"}
        </span>
        upgrade &#8594;
      </Button> */}
      <Separator className="my-1" />

      <Popover>
        <PopoverTrigger className="w-full items-center justify-center bg-primary-dark text-white text-sm hover:bg-primary-semi-dark flex p-2 rounded-sm">
          <span>
            <Avatar className="w-6 h-6 mx-2">
              <AvatarFallback className="text-primary-semi-dark text-xs font-light bg-primary-light">
                {/* {first_name} */}
              </AvatarFallback>
            </Avatar>
          </span>

          {first_name} {last_name}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          <Button
            className="bg-primary-dark hover:bg-primary-semi-dark"
            onClick={logout}
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountManagement;
