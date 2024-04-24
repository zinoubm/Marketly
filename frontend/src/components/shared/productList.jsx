import React from "react";
// import { Card } from '../products'
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./productCard"
function ProductList({ categorie, products, theme }) {
  return (
    // <div className={`w-full rounded-lg p-2  ${theme}`}>
    //     <h1 className='  text-secondary text-2xl font-bold ml-8'>{categorie}</h1>
    //     <div className='flex   overflow-x-scroll    gap-2'>

    //     {products.map((prod , i)=><Card name={prod} price='' rating={0} key={`${prod}${i}`}/>)}
    //     </div>
    // </div>
    
    <Carousel className={cn(" p-4 lg:px-8 lg:m-4 m-1  w-full rounded-lg  " , theme)}>
       <h1 className="text-3xl ml-4 text-white font-bold mb-4">
         {categorie}
        </h1>
      <CarouselContent  className="gap-6">
        {PRODUCT_LIST.map((prod , i)=>(
            <ProductCard name={prod} key={i}/>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious  className=" "/>
      <CarouselNext /> */}
    </Carousel>
    
  );
}
const PRODUCT_LIST = [
    "pc",
    "tv",
    "mouse",
    "pc",
    "tv",
    "mouse",
    "pc",
    "tv",
    "mouse",
    "pc",
    "tv",
    "mouse",
    "pc",
    "tv",
    "mouse",
  ];
  

export default ProductList;
