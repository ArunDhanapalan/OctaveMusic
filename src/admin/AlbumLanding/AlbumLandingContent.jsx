import React from 'react'
import { Outlet } from 'react-router-dom'

const AlbumLandingContent = () => {
  return (
    <div className='h-full'>
      <Outlet />
    </div>
  )
}

export default AlbumLandingContent