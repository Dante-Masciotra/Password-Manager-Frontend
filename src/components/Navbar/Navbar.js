import "./Navbar.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import {logOut} from 'react-icons-kit/feather/logOut'
import {Icon} from 'react-icons-kit';

const Navbar = ({ username }) => {
	const navigate = useNavigate();

	const logoutFun = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<>
			<div className="NavWrapper">
				<div className="Welcome-Message">
						<img src={require("../../imgs/logo-black.png")} alt="" />
						<h2>Hello {username}</h2>
				</div>
				<ul className="NavButtons">
					<li><a href="../Dashboard">Home</a></li>
					<li><a href="../GradePassword">Password Grader</a></li>
				</ul>
				<div className="logout" >
				<Icon className="icon" onClick={logoutFun} icon={logOut} size={25}/>
				</div>
			</div>
		</>
	);
};

export default Navbar;
