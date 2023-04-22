import { useState } from "react";
import xss from "xss";
import { isValidEmail, isValidPassword } from "../../utilities/LoginValidator";
import RadioButton from "../../utilities/RadioButton";
import StudentDetail from "./StudentDetail";
import TeacherDetail from "./TeacherDetail";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [role, setRole] = useState("");

	const [emailStatus, setEmailStatus] = useState({});
	const [passwordStatus, setPasswordStatus] = useState({});

	const [message, setMessage] = useState("");

	const [moveForward, setMoveForward] = useState(false);

	const roleOptions = [
		{ value: "student", label: "Student" },
		{ value: "faculty", label: "Faculty" },
	];

	const [showStudentDetails, setShowStudentDetails] = useState(false);

	const SubmitHandler = (e) => {
		e.preventDefault();
		if (passwordStatus.status && emailStatus.status) {
			fetch("http://localhost:4000/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.moveForward) {
						setMessage("Successfully Created New User");
						setMoveForward(response.moveForward);
					} else {
						console.log(response);
						setMoveForward(false);
						setMessage(response.msg);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const emailHandler = (e) => {
		setEmailStatus(isValidEmail(xss(e.target.value)));
		setEmail(xss(e.target.value));
	};

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};

	const confirmPasswordHandler = (e) => {
		setPasswordStatus(isValidPassword(e.target.value, password));
		setConfirmPassword(e.target.value);
	};
	return (
		<div className="signup">
			{!moveForward ? (
				<div className="container">
					<h1 className="signup_title">Signup Here</h1>
					<form className="signupForm" onSubmit={SubmitHandler}>
						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="text"
								placeholder="Email"
								value={email}
								onChange={emailHandler}
							/>
							<div className="warning_msg">{emailStatus.reason}</div>
						</div>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								name="password"
								type="password"
								placeholder="Password"
								value={password}
								onChange={passwordHandler}
							/>
							<div className="warning_msg">{passwordStatus.reason}</div>
						</div>
						<div className="confirmPassword">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={confirmPasswordHandler}
							/>
						</div>
						<div className="role">
							<label htmlFor="role">Role</label>
							<div className="radioBtn">
								<RadioButton options={roleOptions} setterFunction={setRole} />
							</div>
						</div>
						<button className="nextBtn" type="submit">
							Next
						</button>
					</form>

					<div className="warning_msg">{message}</div>
					<div className="alreadySignup">
						<a href="/">Already SignUp?</a>
					</div>
				</div>
			) : (
				<div>
					{role === "student" && (
						<StudentDetail role={role} email={email} password={password} />
					)}
					{role === "faculty" && (
						<TeacherDetail role={role} email={email} password={password} />
					)}
				</div>
			)}
		</div>
	);
}
