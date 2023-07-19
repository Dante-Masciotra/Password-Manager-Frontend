import "./Navbar.css";
import React from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
		navigate("/");
      }

  return (
    <>
    <div className='NavWrapper'>
        <h2>Hello Username</h2>
        <button onClick={logout}>Log Out</button>
    </div>
    </>
  );
}

export default Navbar