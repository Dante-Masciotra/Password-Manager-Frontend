import "./GradePassword.css";
import React, { useEffect, useState } from 'react';
import CalcPasswordStr from "../../utils/CalcPasswordStr";
import retrieveUser from "../../utils/retrieveUser";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const GradePassword = () => {
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

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


// handle Password change
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setScore(CalcPasswordStr(newPassword));
  };

  //width of password grade
  const strengthBarWidth = (score / 5) * 100;

  return (
    <>
	    <Navbar username={userData.username} />
        <h2>Password Grade</h2>
        <label>
            Enter your password:
            <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
        <div className="strength-bar-container">
            <div className="strength-bar" style={{ width: `${strengthBarWidth}%` }} />
        </div>
    </>
  );
};

export default GradePassword;
