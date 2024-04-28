import React from 'react'
import AddImage from './accountComponents/addImage'
import UpdateProfile from './accountComponents/updateProfile'
function Account() {
  return (
    <div className=' flex-1 flex lg:flex-row flex-col justify-around lg:pb-0 pb-4   lg:items-stretch items-center   lg:gap-32  gap-16 lg:px-32 sm:px-10'>
      <AddImage/>
      <UpdateProfile/>
    </div>
  )
}



export default Account