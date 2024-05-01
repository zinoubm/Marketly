import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/context/userStore";
import useAuth from "@/lib/api/useAuth";
function AddImage() {
  const { updateUserInfo } = useAuth();
  const { image, updateImage } = useUserInfo();
  const [isLoading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    setLoading(true)
    const file = e.target.files[0];

    const data =await updateUserInfo({profile_image:file})
    updateImage(data.image)
    setLoading(false)
  };
  return (
    <section className="flex flex-col gap-4 items-center pt-20">
      {isLoading ? (
        <ImageLoader />
      ) : image ? (
        <div className=" size-52 ">

        <img src={image} className=" w-52  rounded-full" />
        </div>
      ) : (
        <IoPersonCircleSharp size={230} className="m-1" />
      )}
      <div className=" text-center">
        <Button className=" bg-black">
          <label htmlFor="imageInput">
            <input
              className="hidden"
              id="imageInput"
              accept="image/png, image/jpeg"
              onChange={uploadImage}
              type="file"
            />
            update picture
          </label>
        </Button>
      </div>
    </section>
  );
}
const ImageLoader = () => {
  return (
    <div className="  size-52 flex items-center justify-center  bg-gray-100 rounded-full">
      <BiLoaderAlt className=" w-52 h-10 animate-spin opacity-70" />
    </div>
  );
};
export default AddImage;
