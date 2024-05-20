import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import TopBar from "../home/TopBar";
import { useSearchParams } from "react-router-dom";
import useProductApi from "@/lib/api/useProductApi";
import Card from "@/components/shared/productCard";
import ProductDetails from "@/components/shared/productDetails";
function SearchPage() {
  const { searchForProduct } = useProductApi();
  const [URLSearchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const searchObject = {};
      for (const [key, value] of URLSearchParams.entries()) {
        searchObject[key] = value;
      }
      const data = await searchForProduct(searchObject);
      
      //! fixing the image 
      data.forEach(element => {
        // if(!element.product_image.includes("media/images"))
        if(element.product_image.indexOf("https" , 5) !=-1 )

        element.product_image =element.product_image.replace("https://res.cloudinary.com/diqljjjbp/image/upload/v1/media/", "");

      });

      setProducts(data);
    })();
  }, []);
  return (
    <div>
      <TopBar />
      <Filters />
      <div className=" flex gap-4 px-2 sm:justify-normal justify-around flex-wrap ">
        {products.length
          ? products.map((prod) => (
              <ProductDetails key={prod.id}>
                <Card {...prod}  />
              </ProductDetails>
            ))
          : <div className=" flex justify-center items-center flex-grow mt-8 text-3xl font-black text-gray-600 ">there is no product here ! </div>}
      </div>
    </div>
  );
}

export default SearchPage;
