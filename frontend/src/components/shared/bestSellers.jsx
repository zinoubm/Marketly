import { Link } from "react-router-dom";

const Sellers = ["lg_screen 1.png", "blue-t-shirt 1.png"];
function BestSellers() {
  return (
    <div className="  lg:w-[60%] w-full bg-[#FFFEED]   rounded-2xl  p-4">
      <h1 className=" text-3xl font-extrabold mb-4">Best Sellers</h1>
      <div className="flex gap-x-28 gap-12  lg:gap-2 flex-wrap justify-around ">
        {Sellers.map((link) => (
          <div key={link} className=" bg-primary-light rounded-xl w-32 h-52 relative">
            <img className="absolute -left-12 top-1/2 -translate-y-1/2  w-96 scale-110 scale-x-[250%] h-full "  src={link} alt={link} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">

      <Link href="" className="underline">view more</Link>
      </div>
    </div>
  );
}

export default BestSellers;
