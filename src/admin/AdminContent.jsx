import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminContent = () => {
  return (
    <aside className='m-auto h-full w-max flex justify-center items-center'>
        <Outlet />
    </aside>
  )
}

export default AdminContent