import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function PopUp({ setDisplayPopUp, setActiveSection }) {
	const [gotoHome, setGotoHome] = useState(false);

	if (gotoHome) {
		return <Navigate to="/" />;
	}

	return (
		<div className="popUp">
			<div>Attendance Marked Successfully !!!</div>
			<button
				className="closeBtn"
				onClick={() => {
					setDisplayPopUp(false);
					setGotoHome(!gotoHome);
					setActiveSection("home");
				}}>
				Close
			</button>
		</div>
	);
}
