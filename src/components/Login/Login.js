import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const submitForm = async (e) => {
		e.preventDefault();
		const obj = {
			username: username,
			password: password,
		};
		try {
			const res = await fetch("http://127.0.0.1:5000/login", {
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
	}
	return (
		<>
			<form className="Login-container" onSubmit={submitForm}>
				<label for="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
					onChange={e => setUsername(e.target.value)}
				/>
				<br />
				<label for="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={e => setPassword(e.target.value)}
				/>
				<br />
				<input className="login-button" type="submit" value="Submit" /><br/>
				<a href="http://localhost:3000/dashboard">Temp button to go to dashboard</a>.
			</form>
			<div>{message && <p>{message}</p>}</div>
			<p>
				Don't have an account? Register{" "}
				<a href="http://localhost:3000/register">here</a>.
				{/* TODO: replace with more permanent solution */}
			</p>
		</>
	);
}

export default Login;
