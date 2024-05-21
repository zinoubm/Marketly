import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductApi from "@/lib/api/useProductApi";

function TopCategories() {
  const [categorieList, setCategorie] = useState([]);
  const { getCategories } = useProductApi();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let data = await getCategories();
      data = data.slice(0, 4);

      setCategorie(data);
    })();
  }, []);
  return (
    <div className=" xl:w-[35%] lg:w-auto w-full rounded-2xl bg-[#E9F7FF] p-4">
      <h1 className="sm:text-4xl text-2xl xl:pl-16 lg:pl-12 pl-4 sm:font-extrabold font-black">
        Top Categories
      </h1>
      <div className="sm:grid flex  flex-col  grid-cols-2 gap-2 mt-6 pl-8 p-4">
        {categorieList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/search?category=${cat.id}`)}
            className=" bg-black px-6 py-5 text-white font-black rounded-lg"
          >
            {cat.title}
          </button>
        ))}
      </div>
      <div className="flex justify-center ">
        <Link to={"/search"} className="mt-10  underline">
          view more
        </Link>
      </div>
    </div>
  );
}

export default TopCategories;
