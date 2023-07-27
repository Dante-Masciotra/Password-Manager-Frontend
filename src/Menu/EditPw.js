import React, { useState } from "react";
import { authHttpPut } from "../utils/httpUtil";

const EditPw = ({ website, oldPassword, setEditing, update, setUpdate }) => {
	const [password, setPassword] = useState("");
	const handleEdit = async (e) => {
		e.preventDefault();
		const obj = {
			website: website,
			password: password,
		};
		try {
			const res = await authHttpPut(
				"http://127.0.0.1:5000/editpassword",
				localStorage.getItem("token"),
				obj
			);
			if (res.ok) {
				setUpdate(!update);
				setEditing(false);
			}
		} catch (e) {
			console.log(e);
			setEditing(false);
		}
	};
	return (
		<>
			<h2>Edit Password</h2>
			<p>Website: {website}</p>
			<form onSubmit={handleEdit}>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="New Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input id= "edit-pass-save" className= "edit-pass-button" type="submit" value="Save" />
				<button id="edit-cancel-button" className="edit-pass-button" onClick={() => setEditing(false)}>Cancel</button>
			</form>
			
		</>
	);
};
export default EditPw;
