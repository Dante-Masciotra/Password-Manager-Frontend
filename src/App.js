import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AddPassword from "./components/AddPassword/AddPassword";
import GradePassword from "./components/GradePassword/GradePassword";

function App() {
	return (
		<div className="App">
			<div className="wrapper">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/Dashboard" element={<Dashboard />} />
						<Route path="/GradePassword" element={<GradePassword />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
