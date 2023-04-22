import AttendanceView from "../Attendance/AttendanceView";

export default function Summary({ data }) {
	return (
		<div className="summarySection">
			<AttendanceView data={data} />
		</div>
	);
}
