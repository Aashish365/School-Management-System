import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Attendance from "../Attendance";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";

export default function UserProfile() {
	const [loggedIn, setLoggedIn] = useState(true);
	const [data, setData] = useState({});
	const savedCookie = Cookies.get("Token");

	useEffect(() => {
		fetch("http://localhost:4000/getData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cookie: savedCookie,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					setData(response.data);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const logoutHandler = () => {
		fetch("http://localhost:4000/signout/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				setLoggedIn(response.body.loggedIn);
				Cookies.set("Token", "");
			})
			.catch((error) => {
				console.error(error);
			});
	};
	console.log(data);

	if (!loggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			{data.role === "student" && <StudentProfile data={data} />}
			{data.role === "faculty" && <TeacherProfile data={data} />}

			{/* <Attendance role={data.role} subjects={data.subjects} /> */}

			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
}
