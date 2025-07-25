import React from 'react'
import NavbarContainer from '../components/NavbarBlock/navbarContainer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <div>
      <NavbarContainer />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default Layout