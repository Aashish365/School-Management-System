import { useState } from "react";
import xss from "xss";
import { isValidEmail, isValidPassword } from "../../utilities/LoginValidator";
import RadioButton from "../../utilities/RadioButton";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");

	const [role, setRole] = useState("");

	const [emailStatus, setEmailStatus] = useState({});
	const [passwordStatus, setPasswordStatus] = useState({});

	const [message, setMessage] = useState("");

	const genderOptions = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
	];

	const roleOptions = [
		{ value: "student", label: "Student" },
		{ value: "faculty", label: "Faculty" },
		{ value: "admin", label: "Admin" },
	];

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
					password: password,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					setEmail("");
					setPassword("");
					if (response.success) {
						setMessage("Successfully Created New User");
					} else {
						setMessage(response.error);
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
			<div className="signup_container">
				<form onSubmit={SubmitHandler}>
					<div className="name">
						<label htmlFor="name">Email</label>
						<input
							name="name"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => {
								setName(xss(e.target.value));
							}}
						/>
					</div>

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
					<div className="Password">
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

					<div className="address">
						<label htmlFor="address">Address</label>
						<input
							name="address"
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => {
								setAddress(xss(e.target.value));
							}}
						/>
					</div>

					<div className="phoneNumber">
						<label htmlFor="phoneNumber">PhoneNumber</label>
						<input
							name="phoneNumber"
							type="text"
							placeholder="PhoneNumber"
							value={phoneNumber}
							onChange={(e) => {
								setPhoneNumber(xss(e.target.value));
							}}
						/>
					</div>

					<div className="gender">
						<label htmlFor="gender">Gender</label>
						<div>
							<RadioButton options={genderOptions} setGender={setGender} />
						</div>
					</div>

					<div className="role">
						<label htmlFor="role">Role</label>
						<div>
							<RadioButton options={roleOptions} setGender={setRole} />
						</div>
					</div>

					<button type="submit">SignUp</button>
				</form>
				<div className="warning_msg">{message}</div>
			</div>
			<button>
				<a href="/">Already SignUp?</a>
			</button>
		</div>
	);
}
