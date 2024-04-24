
function Card({name , price , rating}) {

  return (<>
    <div className='bg-white shadow-xl  border-2  min-w-36  w-36 p-2 rounded-xl  ' key={`${name}${price}${rating}`}>
      <img className='' src="blue-t-shirt 1.png" alt="" />
      <h1>
        {name}
        </h1>
      <span>rating</span>
        <div className=' text-center font-bold'>price$ </div>
    </div>
      
  </>
  )
}






export default Card