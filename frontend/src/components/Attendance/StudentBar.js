import ToggleButtons from "./ToggleButtons";
export default function StudentBar({
	regNumber,
	fullName,
	addPresentees,
	removePresentees,
}) {
	return (
		<div className="studentBar">
			<div className="regNo">{regNumber}</div>
			<div className="name">{fullName}</div>
			<ToggleButtons
				addPresentees={addPresentees}
				removePresentees={removePresentees}
				regNumber={regNumber}
			/>
		</div>
	);
}
