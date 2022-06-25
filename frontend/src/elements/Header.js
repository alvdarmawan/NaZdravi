import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  
  return (
    <div className='app-header'>
        <h1>Na Zdravi Notes</h1>
        {user && (<p onClick={logoutUser}>Logout</p>)}
    </div>
  )
}

export default Header
