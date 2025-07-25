import React, { useContext } from 'react'
import { AuthUserContext } from '../context/AuthContextApi';

const Home = () => {
  let { authUser } = useContext(AuthUserContext);
  {/*console.log(authUser);*/}
  return (
    <div>Home</div>
  )
}

export default Home