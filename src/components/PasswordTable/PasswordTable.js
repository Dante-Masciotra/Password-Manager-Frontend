import "./PasswordTable.css";
import React, { useEffect, useState } from 'react'
import getPasswords from "../../utils/getPasswords";
import EditPw from "../../Menu/EditPw";
import { authHttpDelete } from "../../utils/httpUtil";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import {copy} from 'react-icons-kit/feather/copy'
import {trash2} from 'react-icons-kit/feather/trash2'
import {edit} from 'react-icons-kit/feather/edit'
import {plusSquare} from 'react-icons-kit/feather/plusSquare'

function PasswordTable() {
    const [passwords, setPasswords] = useState([]);
	const [editing, setEditing] = useState(false);
	const [props, setProps] = useState();
	const [update, setUpdate] = useState(false);

    useEffect(() => {
		async function fetchPasswords() {
			const payload = await getPasswords(
				localStorage.getItem("token"),
				localStorage.getItem("refresh")
			);
			if (payload) {
				setPasswords(payload);
				console.log(payload);
			}
		}
		fetchPasswords();
	}, [update]);

	const handleEdit = (item) => {
		const obj = {
			website: item[0],
			password: item[1],
			setEditing: setEditing,
			update: update,
			setUpdate: setUpdate,
		};
		setProps(obj);
		setEditing(true);
	};

	const handleDelete = async (item) => {
		console.log(item[0]);
		const res = await authHttpDelete(
			`http://127.0.0.1:5000/deletepassword/${item[0]}`,
			localStorage.getItem("token")
		);
		if (res.ok) {
			setUpdate(!update);
		}
	};

	const [passwordVisibility, setPasswordVisibility] = useState(
		new Array(passwords.length).fill(false)
	);
	const togglePasswordVisibility = (index) => {
		setPasswordVisibility((prevVisibility) => {
			const newVisibility = [...prevVisibility];
			newVisibility[index] = !newVisibility[index];
			return newVisibility;
		});
	};

	const copyToClipboard = (password) => {
		navigator.clipboard.writeText(password);
	};

	const listPasswords = passwords
		.slice(0, passwords.length)
		.map((item, index) => (
			<tr>
				<td>{item[0]}</td>
				<td>
					<div className={passwordVisibility[index] ? "show" : "hide"}>
						{item[1]}
					</div>
					
				</td>
				<td className='deleteEdit'>
					<button className='edit' onClick={() => handleEdit(item)}><Icon icon={edit} size={25}/> </button>
					<button className='delete' onClick={() => handleDelete(item)}><Icon icon={trash2} size={25}/> </button>
                    <button onClick={() => togglePasswordVisibility(index)}>{passwordVisibility[index] ?<Icon icon={eyeOff} size={25}/> : <Icon icon={eye} size={25}/>} </button>
					<button onClick={() => copyToClipboard(item[1])}><Icon icon={copy} size={25}/> </button>
				</td>
				{/* {console.log("index: "+index)} */}
			</tr>
		));

    if (editing)
		return (
			<>
				<EditPw {...props} />
			</>
		);
  return (
    <>
    <div className="PasswordWrapper">
        <table className="Passwords">
            <tbody>
                <tr>
                    <th><h2>Website</h2></th>
                    <th><h2>Password</h2></th>
                </tr>
                {listPasswords}
            </tbody>
        </table>
        <button>
            <a href="http://localhost:3000/AddPassword"><Icon icon={plusSquare} size={25}/></a>
        </button>
        </div>
    </>
  )
}

export default PasswordTable