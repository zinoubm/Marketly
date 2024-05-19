import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MdOutlineStar } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import useReviewsApi from "@/lib/api/useReviewsApi";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
function ReviewsDrawer({ children, reviews , product}) {
  
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="h-[70vh] border-b-2 border-gray-400 rounded-b-xl">
          {reviews.length ? (
            reviews.map(({ date, details, rating }, index) => (
              <section>
                <div
                  className="flex  items-center justify-between w-full"
                  key={index}
                >
                  <IoPersonCircleSharp size={45} />

                  <div className=" flex  flex-1 flex-col pl-2">
                    {details}
                    <div className="flex">
                      <Stars rating={rating} />
                    </div>
                  </div>

                  <span className="  text-sm  text-gray-600">{date}</span>
                </div>
                <Separator />
              </section>
            ))
          ) : (
            <div className="  absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2  text-gray-600 font-bold text-lg">
              this product does not have any reviews yet{" "}
            </div>
          )}
        </ScrollArea>
        <AddReviewDialog product={product}>
          <Button className="  m-4">add review</Button>
        </AddReviewDialog>
      </DrawerContent>
    </Drawer>
  );
}
const Stars = ({ rating }) => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    if (arr.length < rating) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }

  return arr.map((value, index) => (
    <MdOutlineStar
      key={index}
      size={20}
      color={value ? "#FFA620" : "#D7D7D7"}
    />
  ));
};

const AddReviewDialog = ({ children , product }) => {
    const {addReview}=useReviewsApi()
    const [details , setDetails]=useState("")
    const [rating,setRating ]=useState(0)
    const handleClick=async()=>{
       const data= await addReview({rating , details ,product})
    }
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className=" flex flex-col p-4 gap-4">
          <Input  placeholder="review" value={details} onChange={(e)=>setDetails(e.target.value)}/>
          <Select name="rating" onValueChange={(e)=>setRating(e)} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleClick}>submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewsDrawer;
