import React, { useEffect } from 'react'
import { Link, Navigate, useLocation,useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  const location = useLocation()
  useEffect(() => {
    //console.log(location.pathname)
  }, [location])

  const logoutHandler=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand" >iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className={`nav-link ${location.pathname}==='/'?'active':""`} aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/about' className={`nav-link ${location.pathname}==='/about'?'active':""`} >About</Link>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            {!localStorage.getItem('token')?
            <form className="d-flex">
            <Link to='/login' className="btn btn-info mx-1" role="button" aria-disabled="true">Login</Link>
            <Link to='/signup' className="btn btn-outline-info mx-1" role="button" aria-disabled="true">Signup</Link>
            </form>:
            <button onClick={logoutHandler} type="button" className="btn btn-info">Logout</button>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
