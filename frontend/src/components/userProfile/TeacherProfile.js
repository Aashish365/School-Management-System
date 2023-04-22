import { useState } from "react";
import Cookies from "js-cookie";
import MarkAttendance from "../Attendance";
import Face from "./face";
import { Navigate } from "react-router-dom";
import Summary from "./Summary";

export default function TeacherProfile({ data }) {
	const [activeSection, setActiveSection] = useState("home");
	const sections = ["home", "markAttendance", "attendance"];
	const [loggedIn, setLoggedIn] = useState(true);

	const logoutHandler = () => {
		fetch("http://localhost:4000/signout/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					setLoggedIn(response.loggedIn);
					Cookies.set("Token", "");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	if (!loggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<div className="teacherProfile">
			<div className="navContainer">
				<div className="navBar">
					{sections.map((section) => {
						return (
							<div
								key={section}
								className="navButton"
								onClick={() => setActiveSection(section)}>
								{section === "markAttendance" ? "Mark-Attendance" : section}
							</div>
						);
					})}
				</div>
				<div className="logoutButton" onClick={logoutHandler}>
					Logout
				</div>
			</div>

			<div className="profileBody">
				{activeSection === "home" && <Face data={data} />}
				{activeSection === "markAttendance" && (
					<MarkAttendance setActiveSection={setActiveSection} />
				)}
				{activeSection === "attendance" && <Summary data={data} />}
			</div>
		</div>
	);
}
