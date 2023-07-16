import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
	return (
		<>
			<form classname="register-container">
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" placeholder="Email" />
				<label for="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
				/>
				<br />
				<label for="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
				/>
				<br />
				<input className="login-button" type="submit" value="Submit" />
			</form>
		</>
	);
};

export default Register;
