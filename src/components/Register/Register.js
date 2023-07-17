import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const submitForm = async (e) => {
		e.preventDefault();
		const obj = {
			email: email,
			username: username,
			password: password,
		};
		try {
			const res = await fetch("http://127.0.0.1:5000/register", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(obj),
			});
			const data = await res.json();
			setMessage(data.message);
			if (res.ok) {
				setMessage("");
				navigate("/");
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<form classname="register-container" onSubmit={submitForm}>
				<label for="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label for="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<label for="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input className="register-button" type="submit" value="Submit" />
			</form>
			<div>{message && <p>{message}</p>}</div>
		</>
	);
};

export default Register;
