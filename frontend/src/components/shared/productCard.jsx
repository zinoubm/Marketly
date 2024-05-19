import { useProductStore } from "@/context/productStore";
import { MdOutlineStar } from "react-icons/md"; 
function Card({
  id,
  title,
  price,
  description,
  product_image,
  inventory,
  rating,
  reviews,
}) {
  
  const { setProduct } = useProductStore();
  const titleWords = title.split(" ");
  let titleThreeWords = titleWords.slice(0, 3).join(" ");
  if (titleWords.length > 4) {
    titleThreeWords = titleThreeWords.concat(" ...");
  }
  const handleClick = () => {
    setProduct({
      id,
      title,
      price,
      description,
      product_image,
      inventory,
      rating,
      reviews,
    });
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white flex flex-col shadow-xl  border-2   h-56   w-40 p-2 rounded-xl  overflow-hidden  "
      >
        <div className=" flex-1 flex flex-col justify-center">
          <img className=" max-h-32" src={product_image} alt={title} />
        </div>
        <h1 className=" text-sm  font-bold  ">{titleThreeWords}</h1>
        <div className="flex items-center ">
          <Stars rating={rating} />{" "}
          <div className=" flex  text-xs w-16 ml-1 text-gray-600">
            {reviews.length} reviews
          </div>
        </div>
        <div className=" text-center font-bold">{price} $ </div>
      </div>
    </>
  );
}

const Stars = ({ rating }) => {
  
  const arr = [];
  for (let i = 0; i < 5; i++) {
    if (arr.length < rating) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }

  return arr.map((value, index) => (
    <MdOutlineStar
      key={index}
      size={20}
      color={value ? "#FFA620" : "#D7D7D7"}
    />
  ));
};
export default Card;
