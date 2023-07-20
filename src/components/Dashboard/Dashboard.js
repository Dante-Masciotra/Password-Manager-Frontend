import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import retrieveUser from "../../utils/retrieveUser";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import getPasswords from "../../utils/getPasswords";

export default function Dashboard() {
	const [authorized, setAuthorized] = useState(false);
	const [userData, setUserData] = useState({});
  const [passwords, setPasswords] = useState([])
  const [websites, setWebsites] = useState([])
	const navigate = useNavigate();


  useEffect(() => {
    async function fecthPasswords() {
    const payload = await getPasswords(
      localStorage.getItem("token"),
      localStorage.getItem("refresh")
    );
    if (payload) {
      setAuthorized(true);
      setWebsites(payload[0]);
      setPasswords(payload[1]);
      // console.log(payload);

    } 
    }
  fecthPasswords();
  }, []);
  

  console.log(passwords)
  const listWebsite = websites.map((website,i) =>
    <li>{website}</li>
  );

  const listPasswords = passwords.map((password,i) =>
    <li>{password}</li>
  );

	try {
		useEffect(() => {
			const checkAuthorization = async () => {
				const payload = await retrieveUser(
					localStorage.getItem("token"),
					localStorage.getItem("refresh")
				);
				if (payload) {
					setAuthorized(true);
					setUserData(payload);
					// console.log(payload);
				} else {
					setAuthorized(false);
					navigate("/");
				}
			};
			checkAuthorization();
			const handleStorageChange = () => {
				checkAuthorization();
			};

			window.addEventListener("storage", handleStorageChange);

			return () => {
				window.removeEventListener("storage", handleStorageChange);
			};
		}, [navigate]);

	} catch (e) {
		console.log(e);
		navigate("/");
	}
  

  


	if (!authorized)
		return (
			<>
				<div>Session expired</div>
			</>
		);

	return (
		<>
			<Navbar username={userData.username} />
			<h2>Dashboard</h2>

      <ul>{listWebsite}</ul>
      <ul>{listPasswords}</ul>
      
			<table>
				<tbody>
					<tr>
						<th>Website</th>
						<th>Password</th>
					</tr>
					<tr>
						<td>Sample Data</td>
						<td>Sample Data</td>
					</tr>
				</tbody>
			</table>
			<button>
				<a href="http://localhost:3000/AddPassword"> +</a>
			</button>
		</>
	);
}
