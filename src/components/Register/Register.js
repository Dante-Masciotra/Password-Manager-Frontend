import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost } from "../../utils/httpUtil";

const Register = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const obj = {
				email: email,
				username: username,
				password: password,
			};

			const res = await httpPost("http://127.0.0.1:5000/register", obj);
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
			<div className="main-wrapper">
				<div className="main-container">
					<div className="main-title">
						<img src={require("./logo-black.png")} alt="" />
						<h1>REGISTER</h1>
					</div>
					<form onSubmit={submitForm}>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>
						<br />
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="main-error">{message && <p>{message}</p>}</div>
						<input className="main-button" type="submit" value="Register" />
					</form>
				</div>
				<div className="register">
					<p>Already have an account?</p>
					<a href="http://localhost:3000">Login</a>
				</div>
			</div>
		</>
	);
};

export default Register;
