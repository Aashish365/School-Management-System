import { Navigate } from "react-router-dom";
import { useState } from "react";
import xss from "xss";
export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cookie, setCookie] = useState("");

	let userName = "";
	const SubmitHandler = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/signin", {
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
				setMessage(response.message);
				setIsLoggedIn(response.loggedIn);
				setCookie(response.token);
				userName = response.name;
			})
			.catch((err) => console.log(err));
	};

	const emailHandler = (e) => {
		// setEmailStatus(isValidEmail(xss(e.target.value)));
		setEmail(xss(e.target.value));
	};
	const passwordHandler = (e) => {
		// setPasswordStatus(isValidPassword(e.target.value));
		setPassword(e.target.value);
	};

	if (isLoggedIn) {
		document.cookie = `token=${cookie};`;
		return <Navigate to="/user" />;
	}

	return (
		<div className="signin">
			<div className="signin_container">
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
					</div>
					<button type="submit">SignIn</button>
				</form>
				<div>{message}</div>
			</div>
			<button>
				<a href="/signup">Haven't Signup?</a>
			</button>
		</div>
	);
}
