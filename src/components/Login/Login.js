import './Login.css';

function  Login() {
  return (
        <form className="Login-container" action="">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder='Username' /><br/>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder='Password' /><br/>
            <input className="login-button" type="submit" value="Submit" />
        </form> 
  );
}

export default Login;