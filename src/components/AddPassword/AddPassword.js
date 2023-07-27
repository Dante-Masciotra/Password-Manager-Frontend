import "./AddPassword.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHttpPost } from "../../utils/httpUtil";
import Navbar from "../Navbar/Navbar";
import retrieveUser from "../../utils/retrieveUser";
import {Icon} from 'react-icons-kit';
import { plusSquare } from "react-icons-kit/feather/plusSquare";

function AddPassword() {
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
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


	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const obj = {
				website: website,
				password: password,
			};

			const res = await authHttpPost(
				"http://127.0.0.1:5000/AddPassword",
				localStorage.getItem("token"),
				obj
			);
			const data = await res.json();
			setMessage(data.message);
			if (res.ok) {
				setMessage("");
				navigate("/dashboard");
			}
		} catch (e) {
			console.log(e);
			navigate("/");
		}
	};
	return (
		<>
			<Navbar username={userData.username} />
			<div className="main-wrapper ">
				<div className="main-container addPassword">
					<div className="main-title">
						<img src={require("../../imgs/logo-black.png")} alt="" />
						<h1>ADD PASSWORD</h1>
					</div>
					<form onSubmit={submitForm}>
						<input
							type="text"
							id="Website"
							name="Website"
							placeholder="Website"
							onChange={(e) => setWebsite(e.target.value)}
						/>
						<br />
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<br />
						<div id="add-pass-options" className="register">
							<button className="add-button" type="submit"><Icon icon={plusSquare} size={40}/></button>
							<a href="http://localhost:3000/Dashboard">Cancel</a>
						</div>
						<br />
					</form>
					<div className="main-error">{message && <p>{message}</p>}</div>
				</div>
			</div>
		</>
	);
}
export default AddPassword;
