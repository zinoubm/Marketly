import React, { useEffect } from "react";
import TopBar from "./TopBar";
import useAuth from "@/lib/api/useAuth";
import { toast } from "sonner";

import { useAuthStore } from "@/context/authStore";
import { useUserInfo } from "@/context/userStore";
import TopCategories from "@/components/shared/topCategories";
import BestSellers from "@/components/shared/bestSellers";
import ProductList from "@/components/shared/productList";
import Footer from "./Footer";
import useCookie from "@/lib/api/useCookie";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
const HomePage = () => {
  const { getCurrentUser } = useAuth();

  const { setFirstName, setLastName } = useAuthStore();
  const {
    updatePhone,
    updateShippingDetails,
    updateBillingDetails,
    updateImage,
  } = useUserInfo();
  const { getToken } = useCookie();

    

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        setFirstName(currentUser.first_name);
        setLastName(currentUser.last_name);
        updateBillingDetails(currentUser.billing_details);
        updatePhone(currentUser.phone);
        updateShippingDetails(currentUser.shipping_details);
        updateImage(currentUser.image);
      }
    })();
  }, [getToken()]);

  return (
    <>
      <TopBar />
      {!getToken() && <GoogleOneTapLogin/>}
      <section className="h-full flex  justify-around gap-4 xl:gap-0 px-8 xl:px-0 flex-wrap lg:flex-nowrap">
        <TopCategories />
        <BestSellers />
      </section>
      <section className=" flex w-full flex-col lg:gap-4 gap-2 lg:px-8 justify-center">
        <ProductList categorie={"Gaming"} theme={"bg-primary-light"} />
        <ProductList categorie={"Baby"} theme={"bg-black"} />
        <ProductList categorie={"Clothing"} theme={"bg-black"} />
        <ProductList categorie={"Hobby"} theme={"bg-black"} />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
