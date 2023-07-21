import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import retrieveUser from "../../utils/retrieveUser";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import getPasswords from "../../utils/getPasswords";
import EditPw from "../../Buttons/EditPw";
import { authHttpDelete } from "../../utils/httpUtil";

export default function Dashboard() {
	const [authorized, setAuthorized] = useState(false);
	const [userData, setUserData] = useState({});
	const [passwords, setPasswords] = useState([]);
	const [editing, setEditing] = useState(false);
	const [props, setProps] = useState();
	const [update, setUpdate] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		async function fecthPasswords() {
			const payload = await getPasswords(
				localStorage.getItem("token"),
				localStorage.getItem("refresh")
			);
			if (payload) {
				setAuthorized(true);
				setPasswords(payload);
				console.log(payload);
			}
		}
		fecthPasswords();
	}, [update]);

	const handleEdit = (item) => {
		const obj = {
			website: item[0],
			password: item[1],
			setEditing: setEditing,
			update: update,
			setUpdate: setUpdate,
		};
		setProps(obj);
		setEditing(true);
	};

	const handleDelete = async (item) => {
		console.log(item[0]);
		const res = await authHttpDelete(
			`http://127.0.0.1:5000/deletepassword/${item[0]}`,
			localStorage.getItem("token")
		);
		if (res.ok) {
			setUpdate(!update);
		}
	};

	const listPasswords = passwords
		.slice(0, passwords.length)
		.map((item, index) => (
			<tr>
				<td>{item[0]}</td>
				<td>{item[1]}</td>
				<td>
					<button onClick={() => handleEdit(item)}>Edit</button>
					<button onClick={() => handleDelete(item)}>Delete</button>
				</td>
				{console.log(item)}
			</tr>
		));

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
					// console.log(payload);
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
	if (editing)
		return (
			<>
				<EditPw {...props} />
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
					{listPasswords}
				</tbody>
			</table>
			<button>
				<a href="http://localhost:3000/AddPassword"> +</a>
			</button>
		</>
	);
}
