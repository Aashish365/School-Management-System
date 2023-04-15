import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import xss from "xss";

export default function SignIn() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const savedCookie = Cookies.get("Token");

	useEffect(() => {
		fetch("http://localhost:4000/signin/validateToken", {
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
				if (response.loggedIn) {
					setIsLoggedIn(response.loggedIn);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	function resetInputField() {
		setEmail("");
		setPassword("");
	}

	const SubmitHandler = async (e) => {
		e.preventDefault();
		await fetch("http://localhost:4000/signin", {
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
				if (response.loggedIn) {
					setIsLoggedIn(response.loggedIn);
					Cookies.set("Token", response.token); // store the same cookie in the browser
					resetInputField();
				}
				setMessage(response.message);
			})
			.catch((err) => console.log(err));
	};

	const emailHandler = (e) => {
		setEmail(xss(e.target.value));
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};

	if (isLoggedIn) {
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
