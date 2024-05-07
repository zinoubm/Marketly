import React from "react";
import ProductsTable from "./productsComponents/ProductsTable";
import AddProduct from "./productsComponents/AddProducts"
const Products = () => {

  return (
    <div className=" flex-1 flex h-full lg:flex-row px-2 flex-col-reverse justify-around lg:pb-0 pb-4   lg:items-stretch items-center     gap-4  ">
      <ProductsTable />
      <AddProduct/>
    </div>
  );
};

export default Products;



