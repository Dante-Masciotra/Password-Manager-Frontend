import "./Navbar.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<>
			<div className="NavWrapper">
				<h2>Hello {username}</h2>
				<button ><a href="../Dashboard">Home</a></button>
				<button ><a href="../GradePassword">Password Grader</a></button>
				<button onClick={logout}>Log Out</button>
			</div>
		</>
	);
};

export default Navbar;
