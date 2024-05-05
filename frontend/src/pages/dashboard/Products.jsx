import React from "react";
import ProductsTable from "./productsComponents/ProductsTable";
import AddProduct from "./productsComponents/AddProducts"
const Products = () => {

  return (
    <div className=" flex-1 flex lg:flex-row flex-col-reverse justify-around lg:pb-0 pb-4   lg:items-stretch items-center   lg:gap-16  gap-4 lg:px-32 sm:px-10">
      <ProductsTable />
      <AddProduct/>
    </div>
  );
};

export default Products;



