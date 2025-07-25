import React from 'react'
import Menu from './Menu'
import Logo from './Logo'

const NavbarContainer = () => {
  return (
    <header className='w-[100vw] h-[70px] fixed top-0 z-50 px-3 bg-gray-700/50 backdrop-blur-xl text-white flex justify-between items-center'>
      <Logo />
      <Menu />
    </header>
  )
}

export default NavbarContainer