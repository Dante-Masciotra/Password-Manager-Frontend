import "./AddPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import retrieveUser from "../../utils/retrieveUser";
import { authHttpPost } from "../../utils/httpUtil";

function AddPassword() {
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();

	const submitForm = async (e) => {
		e.preventDefault();
		const obj = {
			website: website,
			password: password,
		};
		const payload = await retrieveUser(
			localStorage.getItem("token"),
			localStorage.getItem("refresh")
		);
		if (payload) {
			setUserData(payload);
			console.log(payload);
		}
		try {
			const res = authHttpPost(
				"http://127.0.0.1:5000/AddPassword",
				localStorage.getItem("token"),
				obj
			);
			const data = await res.json();
			setMessage(data.message);
			if (res.ok) {
				setMessage("");
				navigate("/dashboard");
			} else {
				navigate("/");
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
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
				<input className="add-button" type="submit" value="Add" />
				<br />
				<a href="http://localhost:3000/dashboard">
					Temp button to go to dashboard
				</a>
				.
			</form>
			<div>{message && <p>{message}</p>}</div>
		</>
	);
}
export default AddPassword;
