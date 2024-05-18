import React from "react";
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
import { useAuthStore } from "@/context/authStore";
import { useUserInfo } from "@/context/userStore";
import { AvatarImage } from "@radix-ui/react-avatar";
const AccountManagement = () => {
  const { first_name, last_name, reset } = useAuthStore();
  const { image } = useUserInfo();
  const { deleteToken } = useCookie();
  const navigate = useNavigate();

  const logout = () => {
    clearStateStorage();
    reset();
    deleteToken();
    navigate("/");
  };

  return (
    <div className="mt-auto w-full">
      <Separator className="my-1" />

      <Popover>
        <PopoverTrigger className="w-full items-center justify-center bg-primary-dark text-white text-sm hover:bg-primary-semi-dark flex p-2 rounded-sm">
          <span>
            <Avatar className="size-8 flex items-center justify-center mx-2">
              <AvatarImage src={image} className=" object-cover" />
              <AvatarFallback className="text-primary-semi-dark text-xs font-light bg-primary-light"></AvatarFallback>
            </Avatar>
          </span>
          {first_name} {last_name}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2    ">
          <Button
            className="bg-primary-dark hover:bg-primary-semi-dark"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
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
