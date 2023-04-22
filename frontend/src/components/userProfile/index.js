import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import { Navigate } from "react-router-dom";

export default function UserProfile() {
	const [data, setData] = useState({});
	const savedCookie = Cookies.get("Token");
	const [loggedIn, setLoggedIn] = useState("true");

	useEffect(() => {
		if (savedCookie) {
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
		} else {
			setLoggedIn(false);
		}
	}, [savedCookie]);

	if (!loggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			{data.role === "student" && <StudentProfile data={data} />}
			{data.role === "faculty" && <TeacherProfile data={data} />}
		</div>
	);
}
