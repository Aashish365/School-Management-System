import { useState } from "react";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
		await fetch("http://localhost:4000/createUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => {
				setEmail("");
				setPassword("");
				setMessage(response.status);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className="email">
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="Password">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">SignUp</button>
			</form>
			<div>{message}</div>
		</div>
	);
}
