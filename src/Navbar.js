import React from 'react'

const Navbar = ({islogin,setislogin,settoken,setpageNumber}) => {
  return (
    <div className='navbarCustom'>
    <nav className="navbar bg-dark navbar-expand-lg fixed-top " data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand fw-bolder" href="#">Scholl Portal</a>
    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {islogin ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link disabled" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User Menu
          </a>
          <ul className="dropdown-menu">
            <li><a role="button"className="dropdown-item " onClick={()=>setpageNumber(1)}>Add User</a></li>
            <li><a role="button"className="dropdown-item " onClick={()=>setpageNumber(2)}>User Search</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a role="button"className="dropdown-item disabled" href="#">Something else here</a></li>
          </ul>
        </li>
        
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>:null}
      {islogin ? <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success disabled" type="submit">Search</button>
      </form>: null}
      {islogin == true ? <button type="button" className="btn btn-outline-danger" onClick={()=>{setislogin(false);settoken("");setpageNumber(0)}}>Sign Out </button>:null}
    </div>
  </div>
</nav>
</div>
  )
}

export default Navbar