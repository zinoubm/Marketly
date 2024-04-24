import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import useAuth from "@/lib/api/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
import TopCategories from "@/components/shared/topCategories";
import BestSellers from "@/components/shared/bestSellers";
import ProductList from "@/components/shared/productList";
import Footer from "./Footer";
const HomePage = () => {
  const { googleSignIn, getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const { setFirstName, setLastName, first_name } = useAuthStore();
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleSignIn(credentialResponse.credential);
    },
    onError: () => {
      toast.error("Something Went Wrong, Please Try Again!");
    },
  });

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      setFirstName(currentUser.first_name);
      setLastName(currentUser.last_name);
    })();
  }, []);

  return (
    <>
      <TopBar />

      <section className="h-full flex  justify-around gap-4 xl:gap-0 px-8 xl:px-0 flex-wrap lg:flex-nowrap">
        <TopCategories />
        <BestSellers />
      </section>
      <section className=" flex w-full flex-col lg:gap-4 gap-2 lg:px-8 justify-center">
        <ProductList categorie={"Gaming"}  theme={"bg-primary-light"}/>
        <ProductList categorie={"Baby"} theme={"bg-black"}/>
        <ProductList categorie={"Clothing"} theme={"bg-black"}/>
        <ProductList categorie={"Hobby"} theme={"bg-black"}/>
      </section>
      <Footer/>
    </>
  );
};

export default HomePage;
