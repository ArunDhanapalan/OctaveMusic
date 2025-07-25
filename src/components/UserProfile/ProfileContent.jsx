import React from 'react'
import { Outlet } from 'react-router-dom'

const ProfileContent = () => {
  return ( 
    <div className='m-auto h-full w-max flex justify-center items-center'>
        <Outlet />
    </div>
  )
}

export default ProfileContent