import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import TopBar from "../home/TopBar";
import { useSearchParams } from "react-router-dom";
import useProductApi from "@/lib/api/useProductApi";
import Card from "@/components/shared/productCard";
function SearchPage() {
  const { searchForProduct } = useProductApi();
  const [URLSearchParams, setSearchParams] = useSearchParams();
  const [products , setProducts]=useState([])
  useEffect(() => {
    (async () => {
      const searchObject ={}
      for(const [key , value]of URLSearchParams.entries()){
        searchObject[key]=value
      }
      const data = await searchForProduct(searchObject);
      console.log(data);
      setProducts(data)      
    })();
  }, []);
  return (
    <div>
      <TopBar />
      <Filters />
      <div className=" flex gap-4 px-2 flex-wrap ">

      {products.length ?products.map(prod=>(<Card {...prod} key={prod.id}/>)) : "there is no product here"}
      </div>
    </div>
  );
}

export default SearchPage;