import React from "react";
import {
  Drawer,
  
  DrawerContent,
  
  
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useProductStore } from "@/context/productStore";
function ProductDetails({ children }) {
  const { title, description, price, product_image , inventory , quantity , incrementQuantity , decrementQuantity} = useProductStore();
  
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <div className=" flex w-full flex-wrap gap-6 h-[85vh] justify-around py-16 ">
          <section className=" max-w-96  flex  justify-center items-center ">
            <img className=" " src={product_image} alt={title} />
          </section>
          <section className=" w-52  mr-8">
            <h1 className=" text-2xl font-extrabold  ">{title}</h1>
            <h2 className=" text-green-600 font-bold">{inventory} in stock </h2>
            <h2 className="text-xl font-extrabold text-right ">{price} $</h2>
            <h2 className="text-lg font-bold mb-2">Description </h2>
            <li>{description}</li>
          </section>
          <section className=" flex  flex-col gap-2">
            <h1 className=" text-2xl font-bold text-center   ">Quantity </h1>
            <div className=" flex justify-between  items-center gap-16 mt-4">
              <Button  onClick={decrementQuantity} disabled={quantity==1} className="  bg-primary-dark rounded-full text-3xl  text-center">
                -
              </Button>
              {quantity}
              <Button onClick={incrementQuantity}  className="bg-primary-dark rounded-full text-3xl  text-center">
                +
              </Button>
            </div>
            <Button className=" bg-black block w-full mt-8">add to cart </Button>
            <Button className=" block w-full "  variant={"outline"} >add to compare</Button>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ProductDetails;
