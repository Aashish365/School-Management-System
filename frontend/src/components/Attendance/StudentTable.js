import { useState } from "react";
import StudentBar from "./StudentBar";
import Cookies from "js-cookie";
import PopUp from "./Popup";
export default function StudentTable({ data, setActiveSection }) {
	const [displayPopUp, setDisplayPopUp] = useState(false);
	const savedCookie = Cookies.get("Token");
	let presentStudents = [];
	const addPresentees = (regNumber) =>
		(presentStudents = Array.from(new Set([...presentStudents, regNumber])));
	const removePresentees = (regNumber) => {
		for (let i = 0; i < presentStudents.length; i++) {
			if (regNumber === presentStudents[i]) {
				presentStudents.splice(i, 1);
			}
		}
	};

	const markAttendanceHandler = async () => {
		await fetch("http://localhost:4000/update/markAttendance", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cookie: savedCookie,
				presentStudents: presentStudents,
				studentClass: data[0].studentClass,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					setDisplayPopUp(true);
					console.log("Attendance marked");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<div className="table">
				<div className="studentBar studentBar_title">
					<div className="regNo">Registration Number</div>
					<div className="email">Email</div>
					<div className="name">Full Name</div>
					<div className="status">Present/Absent</div>
				</div>
				{data.map((user) => {
					return (
						<StudentBar
							key={user.regNumber}
							addPresentees={addPresentees}
							removePresentees={removePresentees}
							regNumber={user.regNumber}
							stdemail={user.email}
							fullName={user.fName + " " + user.lName}
						/>
					);
				})}
				<button className="markAttendanceBtn" onClick={markAttendanceHandler}>
					Mark Attendance
				</button>
				{displayPopUp && (
					<div className="popUpOuter">
						<PopUp
							setDisplayPopUp={setDisplayPopUp}
							setActiveSection={setActiveSection}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
