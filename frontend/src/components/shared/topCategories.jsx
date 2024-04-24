import { Link } from "react-router-dom";

const CATEGORIES = ["Electronics", "Baby", "Clothing", "Hobby"];

function TopCategories() {
  return (
    <div className=" xl:w-[30%] lg:w-auto w-full   rounded-2xl   bg-[#E9F7FF] p-4">
      <h1 className=" self-center sm:text-3xl text-2xl   xl:pl-16 lg:pl-12 pl-4  sm:font-extrabold  font-semibold ">Top Categories</h1>
      <div className="sm:grid flex  flex-col  grid-cols-2 gap-2 mt-6 pl-8 p-2">
        {CATEGORIES.map((cat) => (
          <button key={cat} className=" bg-black p-4 text-white  font-bold rounded-md">{cat}</button>
        ))}
      </div>
      <div className="flex justify-center ">

      <Link href="" className="mt-10  underline">view more</Link>
      </div>
    </div>
  );
}

export default TopCategories;
