import "./Login.css";

function Login() {
	return (
		<>
			<form className="Login-container" action="">
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
				<input className="login-button" type="submit" value="Submit" /><br/>
				<a href="http://localhost:3000/dashboard">Temp button to go to dashboard</a>.
			</form>
			<p>
				Don't have an account? Register{" "}
				<a href="http://localhost:3000/register">here</a>.
				{/* TODO: replace with more permanent solution */}
			</p>
		</>
	);
}

export default Login;
