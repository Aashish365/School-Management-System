import { useEffect, useState } from "react";

export default function Attendance({ role, data }) {
	return (
		<div className="attendance">
			{role}
			{data}
		</div>
	);
}
