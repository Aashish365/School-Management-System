import Face from "./face";
export default function StudentProfile({ data }) {
	return (
		<div className="studentProfile">
			<Face data={data} />
		</div>
	);
}
