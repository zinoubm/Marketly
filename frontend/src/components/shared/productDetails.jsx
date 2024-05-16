import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useProductStore } from "@/context/productStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCartAPi from "@/lib/api/useCartApi";
import { useRefetchDataStore } from "@/context/productStore";
function ProductDetails({ children }) {
  const {id,
    title,
    description,
    price,
    product_image,
    inventory,
    quantity,
    incrementQuantity,
    decrementQuantity,
  } = useProductStore();
  const {toggleRefetchData}=useRefetchDataStore()
  const {addProductToCart}=useCartAPi()
  const addProduct=async ()=>{
    // console.log(id, quantity);
  await addProductToCart(id , quantity)
  toggleRefetchData()
  }
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <div className=" flex w-full flex-wrap gap-6 h-[85vh] overflow-auto justify-around sm:py-16 py-2 ">
          <section className="  ">
            <img
              className=" max-w-96   max-h-96  "
              src={product_image}
              alt={title}
            />
          </section>
          <section className=" w-72   mr-8">
            <h1 className=" text-2xl font-extrabold  ">
              {title}
            </h1>
            <h2 className=" text-green-600 font-bold">{inventory} in stock </h2>
            <h2 className="text-xl font-extrabold text-right ">{price} $</h2>
            <h2 className="text-lg font-bold mb-2">Description :</h2>
            
              <ScrollArea className="h-[200px]  border  rounded-md p-4">
                {description}
              </ScrollArea>
          </section>
          <section className=" flex  flex-col gap-2">
            <h1 className=" text-2xl font-bold text-center   ">Quantity </h1>
            <div className=" flex justify-between  items-center gap-16 mt-4">
              <Button
                onClick={decrementQuantity}
                disabled={quantity == 1}
                className="  bg-primary-dark rounded-full text-3xl  text-center"
              >
                -
              </Button>
              {quantity}
              <Button
                onClick={incrementQuantity}
                className="bg-primary-dark rounded-full text-3xl  text-center"
              >
                +
              </Button>
            </div>
            <Button onClick={addProduct} className=" bg-black block w-full mt-8">
              add to cart 
            </Button>
            <Button className=" block w-full " variant={"outline"}>
              add to compare
            </Button>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ProductDetails;
