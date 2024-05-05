import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useApi from "@/lib/api/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {BiLoaderAlt} from "react-icons/bi"
function ProductsTable() {
  const { getProducts, getCategories } = useApi();
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      const categories = await getCategories();
      console.log(categories[0]);
      //! this code should be done in the server , and it might cause errors when there is too many products
      data.forEach((element) => {
        element.category = categories[element.category - 1].title;

        element.status = element.is_approved ? "approved" : "pending";
      });
      setProductList(data);
      console.log(data);
    })();
  }, []);

  return (
    <Table>
      <TableCaption>List of your products </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[100px]">title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>category</TableHead>
          <TableHead className="text-right">price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productList.map(
          ({
            id,
            title,
            status,
            inventory,
            price,
            category,
            product_image,
          }) => (
            <TableRow key={id}>
              <TableCell>
                <Avatar >
                  <AvatarImage src={product_image} className=" size-16 object-cover  " />
                  <AvatarFallback>
                    <div className=" bg-gray-300 size-16 flex items-center justify-center rounded-full">

                  <BiLoaderAlt  className=" rounded-full  size-8  animate-spin opacity-70" />
                    </div>
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>{inventory}</TableCell>

              <TableCell>{category}</TableCell>
              <TableCell className="text-right">${price}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

export default ProductsTable;
