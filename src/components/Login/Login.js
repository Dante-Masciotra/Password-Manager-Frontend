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
			localStorage.setItem("refresh",data.refresh);
			localStorage.setItem("token",data.token);
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
			<div className="main-wrapper">
				<div className="main-container">
					<div className="main-title">
						<img src={ require("./logo-black.png") } alt="" />
						<h1>LOGIN</h1>
					</div>
					<form onSubmit={submitForm}>
							<input
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								onChange={e => setUsername(e.target.value)}
							/>
							<br />
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								onChange={e => setPassword(e.target.value)}
							/>
							<div className="main-error">{message && <p>{message}</p>}</div>
							<input className="main-button" type="submit" value="Login" />
							<br />
							<a href="http://localhost:3000/dashboard">Temp button to go to dashboard</a>.
					</form>
				</div>
				<div className="register">
					<p>
						Don't have an account? 
					</p>
					<a href="http://localhost:3000/register">Sign Up</a>
				</div>
			</div>
		</>
	);
}

export default Login;
