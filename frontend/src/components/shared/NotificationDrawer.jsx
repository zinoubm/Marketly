import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import useNotificationApi from "@/lib/api/useNotificationApi";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
function NotificationDrawer({ data }) {
  const { seenNotification} = useNotificationApi();
  const [noteCounter  , setNoteCounter ]=useState(data.length)  
  
  useEffect(()=>{
  
    
    let counter=0
    data.forEach(({is_seen})=>{
        if(!is_seen)
        counter++
})
  
    setNoteCounter(counter)
  } , [])
  const handleClick=async (id)=>{
    await seenNotification(id)
    
    
  }
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className=" relative mr-2">
            {noteCounter ?

                <span className=" absolute z-30 bg-primary-light   -right-3  text-white  size-6  flex   font-medium  justify-center items-center rounded-full p-2 ">
              {noteCounter}
            </span>:""
            }
            <IoMdNotificationsOutline size={35} />
          </div>
        </DrawerTrigger>
        <DrawerContent>
            
            <ScrollArea className="h-[70vh] border-b-2 border-gray-400 rounded-b-xl">

          {data.map(({ id, title, date , details  ,  is_seen}) => {
              const day = new Date(date).toLocaleDateString();
              const time = new Date(date).toLocaleTimeString();

            return (
                <div key={id}>
              <div onClick={()=>handleClick(id)} className={cn("flex   hover:bg-blue-100  relative items-center justify-between w-full p-1 rounded" , is_seen?"":"bg-gray-50")}>
                {!is_seen &&<span className=" absolute  size-2  bg-primary-light rounded-full right-0 top-0"> </span>}
                <div>

                <h1>{title}</h1>
                <p>{details}</p>
                </div>
                <div className="  text-sm text-gray-700 flex flex-col">
                  <span>{time}</span>
                  <span>{day}</span>
                </div>
              </div>
                <Separator/>
                </div>
            );
        })}
        
        </ScrollArea>
          
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default NotificationDrawer;
