import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React, { useEffect, useState } from "react";
import { useRefetchDataStore } from "@/context/productStore";
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

const BuyerOrdersDrawer = ({ children , className }) => {
  const [orderList, setOrderList] = useState([]);

  const { getBuyerOrders  } = useOrderApi();
  useEffect(() => {
    (async () => {
      const data = await getBuyerOrders();
      
      
      setOrderList(data);
    })();
  }, []);

  return (
    <Drawer>
      <DrawerTrigger className={className}>{children}</DrawerTrigger>
      <DrawerContent>
      <div className="flex w-full flex-wrap md:gap-6 gap-2 h-[85vh] overflow-auto md:justify-start   justify-around px-4   py-2 pt-8 ">

        <Table>
          <TableCaption>List of your orders </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>date</TableHead>
              <TableHead>time</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((props, index) => (
              <OrderRow {...props} key={index} />
            ))}
          </TableBody>
        </Table>
      </div>
      </DrawerContent>
    </Drawer>
  );
};

const OrderRow = ({ id, date, status, product, quantity }) => {
    
  const T = new Date(date);
  const day = T.toLocaleDateString();
  const time = T.toLocaleTimeString();
  return (
    <TableRow key={id}>
      <TableCell className="font-medium  w-52">{product}</TableCell>
      <TableCell>{status}</TableCell>

      <TableCell>{day}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell className="text-right ">{quantity}</TableCell>
    </TableRow>
  );
};

export default BuyerOrdersDrawer;
