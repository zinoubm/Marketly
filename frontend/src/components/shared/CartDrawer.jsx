import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useCartAPi from "@/lib/api/useCartApi";
import { useRefetchDataStore } from "@/context/productStore";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
function CartDrawer({ children, className }) {
  const { getCartProducts, orderAllCartProducts } = useCartAPi();
  const [cartProducts, setCartProducts] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const { refetchData } = useRefetchDataStore();
  useEffect(() => {
    (async () => {
      const data = await getCartProducts();
      if (data) {
        setCartProducts(data);
        setUserLoggedIn(true);
      }
    })();
  }, [refetchData]);
  const makeOrder = async () => {
    setLoadingOrder(true);
    const data = await orderAllCartProducts();
    window.location.href = data.checkout_session_url;
    setLoadingOrder(false);
  };
  return (
    <Drawer>
      <DrawerTrigger className={className}>{children}</DrawerTrigger>
      <DrawerContent>
        <h1 className="font-semibold ml-1 text-xl">Cart</h1>

        <div className="flex w-full flex-wrap md:gap-6 gap-2 h-[80vh] overflow-auto md:justify-start   justify-around px-4   py-2 pt-8 ">
          {userLoggedIn ? (
            cartProducts.length ? (
              cartProducts.map((prod) => (
                <InCartProduct {...prod} key={prod.id} />
              ))
            ) : (
              <div className="flex w-full h-full justify-center items-center text-3xl text-gray-700 font-black">
                your cart is empty !
              </div>
            )
          ) : (
            <Link
              to={"/sign-in"}
              className="flex w-full h-full justify-center items-center text-4xl  font-black cursor-pointer text-primary-light "
            >
              you must login to see your cart !
            </Link>
          )}
        </div>

        <Button
          disabled={loadingOrder}
          onClick={makeOrder}
          className={cn(
            " absolute top-0 right-0 m-2 bg-primary-light shadow-lg   "
          )}
        >
          {loadingOrder ? "loading ..." : "Order"}
        </Button>
      </DrawerContent>
    </Drawer>
  );
}

const InCartProduct = ({
  date,
  quantity,
  id,
  product: { product_image, title, price },
}) => {
  const titleWords = title.split(" ");
  let titleThreeWords = titleWords.slice(0, 3).join(" ");
  if (titleWords.length > 4) {
    titleThreeWords = titleThreeWords.concat(" ...");
  }
  const { toggleRefetchData } = useRefetchDataStore();
  const { deleteCartProduct } = useCartAPi();
  const deleteProduct = async (id) => {
    await deleteCartProduct(id);
    toggleRefetchData();
  };
  const T = new Date(date);
  const day = T.toLocaleDateString();
  const time = T.toLocaleTimeString();
  return (
    <div className="bg-white flex flex-col shadow-xl  border-2 relative    h-64  w-40 p-2 rounded-xl">
      <div
        className=" absolute right-1 top-1 font-bold hover:bg-blue-100 size-4 flex justify-center items-center  rounded-sm p-2"
        onClick={() => deleteProduct(id)}
      >
        x
      </div>
      <div className=" flex-1 flex flex-col justify-center">
        <img className=" max-h-28" src={product_image} alt={title} />
      </div>
      <h1 className=" text-sm  font-bold  ">{titleThreeWords}</h1>
        <div className=" text-center font-semibold">{price} $</div>
      <div className=" text-center font-semibold">
        <span className=" text-green-500"> Quantity : {quantity}</span>
      </div>
      <div className=" text-center  text-xs">
        {day} {time}{" "}
      </div>
    </div>
  );
};
export default CartDrawer;
