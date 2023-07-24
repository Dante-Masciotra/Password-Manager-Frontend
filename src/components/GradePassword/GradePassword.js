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
  const getStrengthBarColor = () => {
    if (score >= 4) {
      return "green"; // Strong password
    } else if (score >= 2) {
      return "gold"; // Moderate password
    } else {
      return "red"; // Weak password
    }
  };
  const strengthBarWidth = (score / 5) * 100;
  const strengthBarColor = getStrengthBarColor();

  return (
    <>
	    <Navbar username={userData.username} />
        <div className="main-wrapper">
				<div className="main-container gradePassword">
                    <div className="main-title">
						<img src={require("../../imgs/logo-black.png")} alt="" />
						<h1>GRADE PASSWORD</h1>
					</div>
                    <br/>
                    <br/>
                    <input type="text" placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
                    <br/>
                    <div className="strength-bar-container">
                    <div
                    className="strength-bar"
                    style={{ width: `${strengthBarWidth}%`, background: strengthBarColor }}
                    />
                </div>
            </div>
        </div>
            
    </>
  );
};

export default GradePassword;
