import { useState } from "react";
import RadioButton from "../../utilities/RadioButton";
import xss from "xss";
import { Navigate } from "react-router-dom";

export default function StudentDetail({ email, password, role }) {
	const [gotoSignIn, setGotoSignIn] = useState(false);

	const [fName, setfName] = useState("");
	const [lName, setlName] = useState("");
	const [gender, setGender] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [studentClass, setStudentClass] = useState("");
	const [section, setSection] = useState("");

	const [guardianName, setGuardianName] = useState("");
	const [relation, setRelation] = useState("");
	const [g_email, setG_Email] = useState("");
	const [g_number, setG_Number] = useState("");
	const [g_address, setG_Address] = useState("");

	const genderList = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
	];
	const submitHandler = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/signup/student", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fName: fName,
				lName: lName,
				email: email,
				password: password,
				role: role,
				gender: gender,
				phoneNumber: phoneNumber,
				address: address,
				studentClass: studentClass,
				section: section,
				guardianName: guardianName,
				relation: relation,
				g_email: g_email,
				g_number: g_number,
				g_address: g_address,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					setfName("");
					setlName("");
					setGender("");
					setPhoneNumber("");
					setAddress("");
					setStudentClass("");
					setSection("");
					setGuardianName("");
					setRelation("");
					setG_Email("");
					setG_Number("");
					setG_Address("");
					setGotoSignIn(!gotoSignIn);
				} else {
					console.log(response.error);
				}
			})
			.catch((err) => console.log(err));
	};

	if (gotoSignIn) {
		return <Navigate to="/" />;
	}

	return (
		<form onSubmit={submitHandler} className="details">
			<div className="studentDetails">
				<div className="name">
					<label>Name</label>
					<div className="name_container">
						<input
							type="text"
							value={fName}
							onChange={(e) => setfName(xss(e.target.value))}
							placeholder="First Name"
						/>
						<input
							type="text"
							value={lName}
							onChange={(e) => setlName(xss(e.target.value))}
							placeholder="Last Name"
						/>
					</div>
				</div>
				<div className="gender">
					<RadioButton
						options={genderList}
						value={gender}
						setterFunction={setGender}
					/>
				</div>
				<div className="phone">
					<label>Phone</label>
					<input
						type="string"
						placeholder="Phone Number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(xss(e.target.value))}
					/>
				</div>
				<div className="address">
					<label>Address</label>
					<input
						type="string"
						value={address}
						placeholder="Address"
						onChange={(e) => setAddress(xss(e.target.value))}
					/>
				</div>
				<div className="studentClass">
					<label>Class</label>
					<input
						type="string"
						value={studentClass}
						placeholder="Class"
						onChange={(e) => setStudentClass(xss(e.target.value))}
					/>
				</div>
				<div className="section">
					<label>Section</label>
					<input
						type="string"
						value={section}
						placeholder="Section"
						onChange={(e) => setSection(xss(e.target.value))}
					/>
				</div>
			</div>
			<div className="guardianDetails">
				<div className="Guardian Name">
					<label>Guardian Name</label>
					<input
						type="string"
						value={guardianName}
						placeholder="Guardian Name"
						onChange={(e) => setGuardianName(xss(e.target.value))}
					/>
				</div>
				<div className="relation">
					<label>Relation</label>
					<input
						type="string"
						value={relation}
						placeholder="Relation to Student"
						onChange={(e) => setRelation(xss(e.target.value))}
					/>
				</div>
				<div className="email">
					<label>Email</label>
					<input
						type="string"
						value={g_email}
						placeholder="Guardian Email"
						onChange={(e) => setG_Email(xss(e.target.value))}
					/>
				</div>
				<div className="number">
					<label>Number</label>
					<input
						type="string"
						value={g_number}
						placeholder="Guardian Phone Number"
						onChange={(e) => setG_Number(xss(e.target.value))}
					/>
				</div>
				<div className="address">
					<label>Address</label>
					<input
						type="string"
						value={g_address}
						placeholder="Guardian Address"
						onChange={(e) => setG_Address(xss(e.target.value))}
					/>
				</div>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
