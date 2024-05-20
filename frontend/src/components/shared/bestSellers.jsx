import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProductApi from "@/lib/api/useProductApi";
import { useProductStore } from "@/context/productStore";
import ProductDetails from "./productDetails";
function BestSellers() {
  const {searchForProduct}= useProductApi()
  const [data , setData]=useState([])
  const {setProduct}=useProductStore()
  useEffect(()=>{
    (async ()=>{

      let res =await  searchForProduct({search: "best seller"}) 
      res =res.slice(0 , 2)
      console.log(res);
      //! fixing the image 
      res.forEach((element) => {
         if(element.product_image.indexOf("https" , 5) !=-1 )
          element.product_image = element.product_image.replace(
            "https://res.cloudinary.com/diqljjjbp/image/upload/v1/media/",
            "")
      });
      
      setData(res)
    })()
  } , [])
  const handleClick=(prod)=>{
    setProduct(prod)
  }
  return (
    <div className="  lg:w-[60%] w-full bg-[#FFFEED]   rounded-2xl  p-4">
      <h1 className=" text-3xl font-extrabold mb-4">Best Sellers</h1>
      <div className="flex gap-x-28 gap-12  lg:gap-2 flex-wrap justify-around ">
        {data.map((prod) => (
          <ProductDetails>

          <div onClick={()=>handleClick(prod)} key={prod.id} className=" bg-primary-light rounded-xl w-32 h-52 relative">
            <img className="absolute -left-12 top-1/2 -translate-y-1/2  w-96 scale-110 scale-x-[250%] h-full "  src={prod.product_image} alt={prod.title} />
          </div>
          </ProductDetails>
        ))}
      </div>
      <div className="flex justify-center mt-4">

      <Link to={"/search?search=best seller"} className="underline">view more</Link>
      </div>
    </div>
  );
}

export default BestSellers;
