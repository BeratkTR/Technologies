import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



function Navbar() {
    const {isAuthenticated, logout, user} = useContext(AuthContext);

  return (  
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Companies</Link>
      </div>  

      <div className="navbar-center">
        <Link to="/Bist100" className="navbar-link">Bist100</Link>
        <Link to="/Nasdaq" className="navbar-link">Nasdaq</Link>
      </div>

      <div className="navbar-right">
        {
            isAuthenticated ? 
                (
                <>
                    <div className="name">
                        <strong>Kullanıcı:</strong> {user.username}
                        <span style={{color: user.premium ? "blue" : "red", fontWeight: "bold"}}>({user.premium ? "Premium" : "Free"})</span>
                    </div>
                    <button onClick={logout} className= "navbar-logout">Logout</button>
                </>
                )
                :
                <Link to="/login" className="navbar-login">Login</Link>
        }
      </div>
    </nav>
  );
}

export default Navbar;
