import React, { useEffect, useRef, useState  } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import useCompareApi from "@/lib/api/useCompareApi";
import { useRefetchDataStore } from "@/context/productStore";
function AddToCompareDialog({ children, productId }) {
    const {toggleRefetchData ,refetchData }=useRefetchDataStore()
  const { createCompareList, addProductToCompareList, getCompareLists } =
    useCompareApi();
  const [CompareLists, setCompareLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  useEffect(() => {
    (async () => {
      const data = await getCompareLists();
      setCompareLists(data);
      

    })();
  }, [refetchData]);
  const addProduct=async(id)=>{
    await addProductToCompareList(id, productId);
    toggleRefetchData()
    closeDialog()

  }
  const createNewList = async () => {
    const { id } = await createCompareList(newListTitle);
    await addProductToCompareList(id, productId);
    toggleRefetchData()
    closeDialog()

  };

  
  const closeRef=useRef()
  const closeDialog=()=>{
    closeRef.current.click()
  }
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>choose a list :</DialogTitle>
        <div className=" flex flex-col gap-4 p-4">
          <Select name="compare list" onValueChange={(e) => addProduct(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="list" />
            </SelectTrigger>

            <SelectContent>
              {CompareLists.map(({id, title}) => (
                
                  <SelectItem value={id}>{title}</SelectItem>
                
              ))}
            </SelectContent>
          </Select>
          <div className="flex  text-gray-500 items-center justify-center w-full gap-4">
            <Separator className="w-1/3" />
            OR
            <Separator className="w-1/3" />
          </div>

          <Input
            placeholder="list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <DialogFooter>
            <Button className="bg-black" onClick={createNewList}>
              create a new list
            </Button>
          </DialogFooter>

          {/* <div className=' flex w-full  justify-center '>
            <Button className=" bg-primary-light"> add product</Button>
          </div> */}
        </div>
        <DialogClose ref={closeRef} ></DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCompareDialog;
