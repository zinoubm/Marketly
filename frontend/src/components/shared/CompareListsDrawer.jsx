import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

import React, { useEffect, useState ,useRef} from "react";
import { useRefetchDataStore } from "@/context/productStore";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ProductCard from "./productCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import useCompareApi from "@/lib/api/useCompareApi";
import { Input } from "../ui/input";
function CompareListsDrawer({ children, className }) {
  const [compareLists, setCompareLists] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { getCompareLists , createCompareList } = useCompareApi();
  const { refetchData , toggleRefetchData } = useRefetchDataStore();
  useEffect(() => {
    (async () => {
      const data = await getCompareLists();
      if (data) {
        setCompareLists(data);
        setUserLoggedIn(true);
      }
    })();
  }, [refetchData]);
  const [newListTitle, setNewListTitle] = useState("");
  const closeRef=useRef()
  const closeDialog=()=>{
    closeRef.current.click()
  }

  const createNewList = async () => {
    await createCompareList(newListTitle)
    toggleRefetchData()
    closeDialog()
  };
  return (
    <Drawer>
      <DrawerTrigger className={className}>{children}</DrawerTrigger>
      <DrawerContent>
        <h1 className="font-semibold ml-1 text-xl">Compare</h1>
        <div className="flex w-full  flex-wrap md:gap-6 gap-2 h-[80vh] overflow-y-auto overflow-x-hidden     justify-center px-4   py-2 pt-8 ">
          {userLoggedIn ? (
            <>
              <Dialog>
                <DialogTrigger>
                  <Button className=" absolute  right-1 top-1 z-20 bg-primary-light text-white font-semibold">
                    Create New List
                  </Button>
                </DialogTrigger>
                <DialogContent >
                    <div className="flex flex-col gap-4 p-4">

                  <Input
                    placeholder="list title"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    />
                    </div>
                  <DialogFooter>
                    <Button className="bg-black" onClick={createNewList}>
                      create a new list
                    </Button>
                  </DialogFooter>
                </DialogContent>
        <DialogClose ref={closeRef} ></DialogClose>

              </Dialog>
              {compareLists.length ? (
                compareLists.map((list) => (
                  <CompareList {...list} key={list.id} />
                ))
              ) : (
                <div className="flex w-full h-full justify-center items-center text-3xl text-gray-700 font-black">
                  your Compare List is empty !
                </div>
              )}
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex w-full h-full justify-center items-center text-4xl  font-black cursor-pointer text-primary-light "
            >
              you must login to see your compare List!
            </Link>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
const CompareList = ({ title, compare_items }) => {
  

  return (
    <Carousel className={cn(" p-4 lg:px-12   w-full rounded-lg  bg-black ")}>
      <h1 className="text-3xl ml-4 text-white font-bold mb-4">{title}</h1>
      {compare_items.length ? (
        <>
          <CarouselContent className="gap-6 px-8 ">
            {compare_items.map(({ product_details }) => {
              if (product_details.product_image.indexOf("https", 5) != -1)
                product_details.product_image =
                  product_details.product_image.replace(
                    "https://res.cloudinary.com/diqljjjbp/image/upload/v1/media/",
                    ""
                  );

              return (
                <div className=" flex " key={product_details.id}>
                  <ProductCard {...product_details} />
                </div>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="  translate-x-14" />
          <CarouselNext className="  -translate-x-14" />
        </>
      ) : (
        <div className="  h-48 flex items-center justify-center text-white font-bold text-3xl">
          {" "}
          this List is empty !
        </div>
      )}
    </Carousel>
  );
};
export default CompareListsDrawer;
