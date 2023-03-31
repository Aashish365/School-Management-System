import {
	BrowserRouter as Router,
	Routes,
	Route,
	Switch,
} from "react-router-dom";

// import pages //
import UserProfile from "../userProfile";
import SignIn from "../signin";
import SignUp from "../signup";

export default function LoginRoute() {
	const pages = [
		{
			name: "signin",
			link: "/",
			elem: <SignIn />,
		},
		{
			name: "signup",
			link: "/signup",
			elem: <SignUp />,
		},

		{
			name: "UserProfile",
			link: "/user",
			elem: <UserProfile />,
		},
	];
	return (
		<div>
			<Router>
				<Routes>
					{pages.map((page) => {
						return (
							<Route path={page.link} element={page.elem} key={page.link} />
						);
					})}
				</Routes>
			</Router>
		</div>
	);
}
