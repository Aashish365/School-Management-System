import AdminDashboard from "./components/adminDashboard";
import Login from "./components/login";
import UserProfile from "./components/userProfile";

function App() {
	return (
		<div className="App">
			This is the app component.
			<AdminDashboard />
			<Login />
			<UserProfile />
		</div>
	);
}

export default App;
