import "./AddPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import retrieveUser from "../../utils/retrieveUser";




function AddPassword() {
	const [user, setUser] = useState("");
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();
        

	const submitForm = async (e) => {
		e.preventDefault();
		const obj = {
			user: user,
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
        setUser(userData.id);
		try {
			const res = await fetch("http://127.0.0.1:5000/AddPassword", {
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
				navigate("/dashboard");
			}
		} catch (e) {
			console.log(e);
		}
	}
    return(
        <>
        <form onSubmit={submitForm}>
							<input
								type="text"
								id="Website"
								name="Website"
								placeholder="Website"
								onChange={e => setWebsite(e.target.value)}
							/>
							<br />
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								onChange={e => setPassword(e.target.value)}
							/>
							<br />
							<input className="add-button" type="submit" value="Add" /><br/>
							<a href="http://localhost:3000/dashboard">Temp button to go to dashboard</a>.
					</form>
			<div>{message && <p>{message}</p>}</div>
        </>
    );
}
export default AddPassword;