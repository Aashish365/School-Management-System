import StudentBar from "./StudentBar";
import Cookies from "js-cookie";
export default function StudentTable({ data }) {
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
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					// DisplayPopup with success msg
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
					<div className="name">Full Name</div>
					<div className="status">Present/Absent</div>
				</div>
				{data.map((user) => {
					return (
						<StudentBar
							addPresentees={addPresentees}
							removePresentees={removePresentees}
							key={user.regNumber}
							regNumber={user.regNumber}
							fullName={user.fName + " " + user.lName}
						/>
					);
				})}
			</div>
			<button onClick={markAttendanceHandler}>Mark Attendance</button>
		</div>
	);
}
