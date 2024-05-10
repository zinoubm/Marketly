import { useProductStore } from "@/context/productStore"

function Card({title , price , description  , product_image , inventory  }) {
  const {setProduct  } = useProductStore()

  
  const titleWords = title.split(" ")
  let titleFourWords =titleWords.slice(0 ,4).join(' ')
  if(titleWords.length>4){
    titleFourWords=titleFourWords.concat(" ...")
  }
  const handleClick=()=>{
    setProduct({title , price , description  , product_image , inventory})
    
  }
  return (<>
    <div onClick={handleClick} className='bg-white flex flex-col shadow-xl  border-2   h-56  w-36 p-2 rounded-xl  overflow-hidden  ' >
      <div className=" flex-1 flex flex-col justify-center">

      <img className=' max-h-32' src={product_image} alt={title}  />
      </div>
      <h1 className=" text-sm  font-bold  ">
        {titleFourWords}
        </h1>
      {/* <h2 className="  text-gray-800 text-sm">{description}</h2> */}
        <div className=' text-center font-bold'>{price} $ </div>
    </div>
      
  </>
  )
}






export default Card