import React, { useEffect, useState } from "react";
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
import useProductApi from "@/lib/api/useProductApi";
function ProductList({ category, theme }) {
  const [data, setData] = useState([]);
  const { searchForProduct, getCategories } = useProductApi();
  useEffect(() => {
    (async () => {
      let cat = await getCategories();

      cat = cat.find((c) => c.title == category);

      const products = await searchForProduct({ category: cat.id });
      //! fixing the image
      products.forEach((element) => {
        // if (!element.product_image.includes("media/images"))
        if (element.product_image.indexOf("https", 5) != -1)
          element.product_image = element.product_image.replace(
            "https://res.cloudinary.com/diqljjjbp/image/upload/v1/media/",
            ""
          );
      });

      setData(products);
    })();
  }, []);
  return (
    <Carousel className={cn("mt-6 p-4 lg:px-12 w-full rounded-2xl", theme)}>
      <h1 className="text-3xl ml-4 text-white font-bold mb-4">{category}</h1>
      <CarouselContent className="gap-6 px-8">
        {data.map((prod) => (
          <ProductDetails key={prod.id}>
            <ProductCard {...prod} />
          </ProductDetails>
        ))}
      </CarouselContent>
      <CarouselPrevious className="  translate-x-14" />
      <CarouselNext className="  -translate-x-14" />
    </Carousel>
  );
}

export default ProductList;
