import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import retrieveUser from "../../utils/retrieveUser";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Dashboard() {
	const [authorized, setAuthorized] = useState(false);
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();
	useEffect(() => {
		const checkAuthorization = async () => {
			const payload = await retrieveUser(
				localStorage.getItem("token"),
				localStorage.getItem("refresh")
			);
			if (payload) {
				setAuthorized(true);
				setUserData(payload);
				console.log(payload);
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
	}, []);
	if (!authorized)
		return (
			<>
				<div>Session expired</div>
			</>
		);
	return (
		<>
			<Navbar username={userData.username} />
			<h2>Dashboard</h2>
			<table>
				<tbody>
					<tr>
						<th>Website</th>
						<th>Password</th>
					</tr>
					<tr>
						<td>Sample Data</td>
						<td>Sample Data</td>
					</tr>
				</tbody>
			</table>
			<button>
				<a href="http://localhost:3000/AddPassword"> +</a>
			</button>
		</>
	);
}
