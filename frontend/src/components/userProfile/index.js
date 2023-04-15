import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function UserProfile() {
	const [loggedIn, setLoggedIn] = useState(true);

	const logoutHandler = () => {
		fetch("http://localhost:4000/signout/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				setLoggedIn(response.body.loggedIn);
				Cookies.set("Token", "");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	if (!loggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<div>This is the User Profile.</div>
			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
}
