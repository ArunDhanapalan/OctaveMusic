import React from 'react'
import NavbarContainer from './components/NavbarBlock/navbarContainer'
import { Router } from 'react-router-dom'

const App = () => {
  return (
    <div className='transition-all'>
      <NavbarContainer />
      <Router />
    </div>
  )
}

export default App