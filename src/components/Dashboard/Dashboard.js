import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import retrieveUser from "../../utils/retrieveUser";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PasswordTable from "../PasswordTable/PasswordTable";


export default function Dashboard() {
	const [authorized, setAuthorized] = useState(false);
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();

	try {
		useEffect(() => {
			const checkAuthorization = async () => {
				const payload = await retrieveUser(
					localStorage.getItem("token"),
					localStorage.getItem("refresh")
				);
				if (payload) {
					setAuthorized(true);
					setUserData(payload);
				} else {
					setAuthorized(false);
					navigate("/");
				}
			};
			checkAuthorization();
			const handleStorageChange = () => {
				checkAuthorization();
			};

			window.addEventListener("storage", handleStorageChange);

			return () => {
				window.removeEventListener("storage", handleStorageChange);
			};
		}, [navigate]);
	} catch (e) {
		console.log(e);
		navigate("/");
	}

	if (!authorized)
		return (
			<>
				<div>Session expired</div>
			</>
		);
	
	return (
		<>
			<Navbar username={userData.username} />
			<div className="main-wrapper">
				<div className="main-container">
					<div className="main-title">
						<img src={require("../../imgs/logo-black.png")} alt="" />
						<h1>DASHBOARD</h1>
					</div>
					<PasswordTable />
				</div>
			</div>
		</>
	);
}
