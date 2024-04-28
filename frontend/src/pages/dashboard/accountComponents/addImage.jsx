import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/context/userStore";
function AddImage() {
  const { image } = useUserInfo();
  return (
    <section className="flex flex-col gap-4 items-center pt-20">
      {image ? (
        <img src={image} className=" w-52  rounded-full" />
      ) : (
        <IoPersonCircleSharp size={230} className="m-1" />
      )}
      <div className=" text-center">
        <Button className=" bg-black">update picture</Button>
      </div>
    </section>
  );
}

export default AddImage;
