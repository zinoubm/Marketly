import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdOutlineUpdate } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRefetchDataStore } from "@/context/productStore";
import { BsThreeDots } from "react-icons/bs";
// import ProductDetails from "@/components/shared/productDetails";
import UpdateProduct from "./UpdateProduct";
import useApi from "@/lib/api/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BiLoaderAlt } from "react-icons/bi";
function ProductsTable() {
  const { getProducts, getCategories } = useApi();
  const [productList, setProductList] = useState([]);
  const { refetchData } = useRefetchDataStore();
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      const categories = await getCategories();

      //! this code should be done in the server , and it might cause errors when there is too many products
      data.forEach((element) => {
        element.category = categories[element.category - 1].title;

        element.status = element.is_approved ? "approved" : "pending";
      });
      setProductList(data);
    })();
  }, [refetchData]);
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
          <TableHead>price</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productList.map((props, index) => (
          <ProductRow {...props} key={index} />
        ))}
      </TableBody>
    </Table>
  );
}

const ProductRow = ({
  id,
  title,
  status,
  inventory,
  price,
  category,
  product_image,description
}) => {
  const { deleteProduct } = useApi();
  const { toggleRefetchData } = useRefetchDataStore();
  const removeProduct = async (id) => {
    await deleteProduct(id);
    toggleRefetchData();
  };

  return (
    <TableRow key={id}>
      <TableCell>
        {product_image ? (
          <Avatar>
            <AvatarImage
              src={product_image}
              className=" size-16 object-cover  "
            />
            <AvatarFallback>
              <div className=" bg-gray-300 size-16 flex items-center justify-center rounded-full">
                <BiLoaderAlt className=" rounded-full  size-8  animate-spin opacity-70" />
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className=" size-16 bg-gray-200 rounded-full"></div>
        )}
      </TableCell>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{inventory}</TableCell>

      <TableCell>{category}</TableCell>
      <TableCell>${price}</TableCell>
      <TableCell className="text-right ">
        <Popover>
          <PopoverTrigger>
            <div className="p-2 rounded-lg hover:bg-gray-300">
              <BsThreeDots className="  text-xl  " />
            </div>
          </PopoverTrigger>
          <PopoverContent className=" w-26 p-2  translate-x-6 ">
            <button
              className=" flex  justify-around gap-1 w-full text-primary-light"
              onClick={() => removeProduct(id)}
            >
              delete <MdDelete size={20} />
            </button>
            <Separator />
            <UpdateProduct
              id={id}
              title={title}
              
              inventory={inventory}
              price={price}
              category={category}
              product_image={category}
              description={description}
            >
              <button className=" flex   justify-around gap-1 w-full  text-primary-dark">
                update <MdOutlineUpdate size={20} />
              </button>
            </UpdateProduct>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTable;
