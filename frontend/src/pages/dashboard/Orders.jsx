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

const Orders = () => {
  const { getBuyerOrders, getSellerOrders } = useOrderApi();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getSellerOrders()
      setOrderList(data);
      
    })();
  }, []);
  return (
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
      <TableCell >{time}</TableCell>
      <TableCell className="text-right ">{quantity}</TableCell>
    </TableRow>
  );
};

export default Orders;
