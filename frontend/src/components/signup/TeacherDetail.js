import { useState } from "react";
import RadioButton from "../../utilities/RadioButton";
import xss from "xss";
import { Navigate } from "react-router-dom";

export default function TeacherDetail({ role, email, password }) {
	const [gotoSignIn, setGotoSignIn] = useState(false);

	const [fName, setfName] = useState("");
	const [lName, setlName] = useState("");
	const [gender, setGender] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [subject, setSubject] = useState("");
	const [emergencyContact, setEmergencyContact] = useState("");

	const genderList = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
	];

	const submitHandler = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/signup/teacher", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fName: fName,
				lName: lName,
				gender: gender,
				email: email,
				password: password,
				role: role,
				phoneNumber: phoneNumber,
				address: address,
				emergencyContact: emergencyContact,
				subject: subject,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
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
		<form onSubmit={submitHandler} className="detailsTeacherForm">
			<h1>Enter your Details Here</h1>
			<div className="teacherDetails">
				<div className="name">
					<label>Name</label>
					<div className="name_container">
						<input
							className="fName"
							type="text"
							value={fName}
							onChange={(e) => setfName(xss(e.target.value))}
							placeholder="First Name"
						/>
						<input
							className="lName"
							type="text"
							value={lName}
							onChange={(e) => setlName(xss(e.target.value))}
							placeholder="Last Name"
						/>
					</div>
				</div>
				<div className="gender">
					<label>Gender</label>
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
				<div className="subject">
					<label>Subject</label>
					<input
						type="string"
						value={subject}
						placeholder="Subject"
						onChange={(e) => setSubject(xss(e.target.value))}
					/>
				</div>
				<div className="emergencyCN">
					<label>Emergency Contact Number</label>
					<input
						type="string"
						value={emergencyContact}
						placeholder="Emergency Contact Number"
						onChange={(e) => setEmergencyContact(xss(e.target.value))}
					/>
				</div>
			</div>
			<button className="tdsubmitBtn" type="submit" onSubmit={submitHandler}>
				Submit
			</button>
		</form>
	);
}
