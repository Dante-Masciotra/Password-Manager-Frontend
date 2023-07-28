import "./AddPassword.css";
import { useState } from "react";
import { authHttpPost } from "../../utils/httpUtil";
import {Icon} from 'react-icons-kit';
import { plusSquare } from "react-icons-kit/feather/plusSquare";

const AddPassword = ({setAdding}) => {
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");


	const submitForm = async (e) => {
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
			}
		} catch (e) {
			console.log(e);
			setAdding(false)
		}
	};
	return (
		<>
		<h2>Add Password</h2>
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
			<button  id="add-pass-save"  className="edit-pass-button" type="submit">Save</button>
			<button id="add-cancel-button" className="edit-pass-button" onClick={() => setAdding(false)}>Cancel</button>
		</div>
		<br />
	</form>
	<div className="main-error">{message && <p>{message}</p>}</div>
		</>
	);
}
export default AddPassword;
