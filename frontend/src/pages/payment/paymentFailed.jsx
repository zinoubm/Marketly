import React from 'react'
import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
function PaymentFailed() {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen '>
        <div onClick={()=>navigate("/")} className=' flex cursor-pointer  items-center'>

        <h1 className='text-3xl font-bold mr-2   '>your payment has failed </h1>
        <MdOutlineReportGmailerrorred className=' text-primary-light  '  size={50}/> 
        </div>
    </div>
  )
}

export default PaymentFailed