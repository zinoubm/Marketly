import React, { useEffect, useState } from "react";
import useOrderApi from "@/lib/api/useOrderApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FcPaid } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {Separator}from "@/components/ui/separator"
import { useRefetchDataStore } from "@/context/productStore";
const Orders = () => {
  const { updateOrderStatus, getSellerOrders } = useOrderApi();
  const [orderList, setOrderList] = useState([]);
  const {refetchData}=useRefetchDataStore()
  useEffect(() => {
    (async () => {
      const data = await getSellerOrders();

      // updateOrderStatus(22 , "Completed")
      setOrderList(data);
    })();
  }, [refetchData]);
  return (
    <Table>
      <TableCaption>List of your orders </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>date</TableHead>
          <TableHead>time</TableHead>
          <TableHead >Quantity</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderList.map((props, index) => (
          <OrderRow {...props} key={index} />
        ))}
      </TableBody>
    </Table>
  );
};
const OrderRow = ({ id, date, status, product, quantity }) => {
  const T = new Date(date);
  const day = T.toLocaleDateString();
  const time = T.toLocaleTimeString();
  const { updateOrderStatus } = useOrderApi();
  const {toggleRefetchData} = useRefetchDataStore()
  const updateOrder=async (stat)=>{
    await updateOrderStatus(id, stat)
    toggleRefetchData()

  }
  return (
    <TableRow key={id}>
      <TableCell className="font-medium  w-52">{product}</TableCell>
      <TableCell>{status}</TableCell>

      <TableCell>{day}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell className="text-right ">
        <Popover>
        {(status !="Completed" && status!="Cancelled" ) &&(<>

          <PopoverTrigger>
            <div className="p-2 rounded-lg hover:bg-gray-300">
              <BsThreeDots className="  text-xl  " />
            </div>
          </PopoverTrigger>
          <PopoverContent className=" w-26 p-2 ">
          {
            status =="Pending" &&(

              <button onClick={()=>updateOrder( "Shipping")} className=" flex  justify-around gap-1 w-full  text-green-600">
              <FcPaid size={20}/>
              Shipping
            </button>
            )
          } 
            <Separator />

            <button onClick={()=>updateOrder( "Completed")} className=" flex mt-2  justify-around gap-1 w-full  ">
              <FcOk size={20}/>
              Completed
            </button>
            <Separator />

            <button onClick={()=>updateOrder("Cancelled")} className=" flex mt-2 gap-1 w-full  text-primary-light ">
              <ImCancelCircle size={20}/>
              Cancel
            </button>

          </PopoverContent>
        </>
          )}
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default Orders;
