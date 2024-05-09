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
import ProductCard from "./productCard";
import ProductDetails from "./productDetails";
function ProductList({ categorie, products, theme }) {
  return (

    <Carousel
      className={cn(" p-4 lg:px-12 lg:m-4   w-full rounded-lg  ", theme)}
    >
      <h1 className="text-3xl ml-4 text-white font-bold mb-4">{categorie}</h1>
      <CarouselContent className="gap-6 px-8">
        {PRODUCT_LIST.map((prod, i) => (
          <ProductDetails>
            <ProductCard name={prod} key={i} />
          </ProductDetails>
        ))}
      </CarouselContent>
      <CarouselPrevious  className="  translate-x-14"/>
      <CarouselNext className="  -translate-x-14" />
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
