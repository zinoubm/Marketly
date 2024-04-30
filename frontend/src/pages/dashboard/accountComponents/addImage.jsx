import React , {Suspense} from "react";

import { IoPersonCircleSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/context/userStore";
import useAuth from "@/lib/api/useAuth";
function AddImage() {
  const {updateUserInfo}=useAuth()
  const { image } = useUserInfo();
  const handleClick=async()=>{

  }
  return (
    <section className="flex flex-col gap-4 items-center pt-20">
      {image ? (
        <Suspense fallback={<ImageLoader/>} >

        <img src={image} className=" w-52  rounded-full" />
        </Suspense>
      ) : (
        <IoPersonCircleSharp size={230} className="m-1" />
      )}
      <div className=" text-center">
        <Button className=" bg-black">update picture</Button>
      </div>
    </section>
  );
}
const ImageLoader=()=>{
  return <div className=" animate-pulse bg-gray-200  w-52 rounded-full"> </div>
}
export default AddImage;
