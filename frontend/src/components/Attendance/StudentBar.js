import ToggleButtons from "./ToggleButtons";
export default function StudentBar({
	regNumber,
	fullName,
	stdemail,
	addPresentees,
	removePresentees,
}) {
	return (
		<div className="studentBar">
			<div className="regNo">{regNumber}</div>
			<div className="email">{stdemail}</div>
			<div className="name">{fullName}</div>
			<ToggleButtons
				addPresentees={addPresentees}
				removePresentees={removePresentees}
				regNumber={regNumber}
			/>
		</div>
	);
}
