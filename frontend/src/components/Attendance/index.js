import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import StudentTable from "./StudentTable";
import ClassesList from "./ClassesList";

export default function MarkAttendance() {
	const [studentClass, setStudentClass] = useState("1");
	const [data, setData] = useState([]);
	const savedCookie = Cookies.get("Token");

	useEffect(() => getStudentsHandler, []);

	const getStudentsHandler = async () => {
		await fetch("http://localhost:4000/getData/byclass", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cookie: savedCookie,
				studentClass: studentClass,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					setData(response.data);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="attendanceSection">
			<ClassesList setterFunction={setStudentClass} />
			<StudentTable data={data} />
		</div>
	);
}
