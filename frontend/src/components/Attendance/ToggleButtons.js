import { useState } from "react";

export default function ToggleButtons({
	addPresentees,
	regNumber,
	removePresentees,
}) {
	const [present, setPresent] = useState("closedP");
	const [absent, setAbsent] = useState("closedA");

	const presentHandler = () => {
		setPresent("openedP");
		setAbsent("closedA");
		addPresentees(regNumber);
	};

	const absentHandler = () => {
		setAbsent("openedA");
		setPresent("closedP");
		removePresentees(regNumber);
	};

	return (
		<div className="buttons">
			<button className={present} onClick={presentHandler}>
				Present
			</button>
			<button className={absent} onClick={absentHandler}>
				Absent
			</button>
		</div>
	);
}
