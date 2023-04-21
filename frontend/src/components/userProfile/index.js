import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";

export default function UserProfile() {
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
	return (
		<div>
			{data.role === "student" && <StudentProfile data={data} />}
			{data.role === "faculty" && <TeacherProfile data={data} />}
		</div>
	);
}
