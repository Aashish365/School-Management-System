import { useState, useEffect } from "react";
import {
	isValidEmail,
	isValidPassword,
} from "../../../utilities/LoginValidator";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [emailStatus, setEmailStatus] = useState({});
	const [password, setPassword] = useState("");
	const [passwordStatus, setPasswordStatus] = useState({});

	const [message, setMessage] = useState("");

	const SubmitHandler = (e) => {
		e.preventDefault();
		if (passwordStatus.status && emailStatus.status) {
			fetch("http://localhost:4000/user/signUp", {
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
		setEmailStatus(isValidEmail(e.target.value));
		setEmail(e.target.value);
	};
	const passwordHandler = (e) => {
		setPasswordStatus(isValidPassword(e.target.value));
		setPassword(e.target.value);
	};

	return (
		<div className="signup">
			<div className="signup_container">
				<form onSubmit={SubmitHandler}>
					<div className="email">
						<label htmlFor="email">Email</label>
						<input
							name="email"
							type="text"
							placeholder="Email"
							value={email}
							onChange={emailHandler}
						/>
						<div>{emailStatus.reason}</div>
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
						<div>{passwordStatus.reason}</div>
					</div>
					<button type="submit">SignUp</button>
				</form>
				<div>{message}</div>
			</div>
		</div>
	);
}
