import { useState } from "react";

export default function ClassesList({ setterFunction }) {
	const [activeBtn, setActiveBtn] = useState("1");
	const classList = [
		{ value: "1", label: "Class 1" },
		{ value: "2", label: "Class 2" },
		{ value: "3", label: "Class 3" },
		{ value: "4", label: "Class 4" },
		{ value: "5", label: "Class 5" },
		{ value: "6", label: "Class 6" },
		{ value: "7", label: "Class 7" },
		{ value: "8", label: "Class 8" },
		{ value: "9", label: "Class 9" },
		{ value: "10", label: "Class 10" },
	];

	return (
		<div className="classesList">
			{classList.map((myclass) => {
				return (
					<div key={myclass.value}>
						{activeBtn === myclass.value ? (
							<div
								className="classBtn activeBtn"
								onClick={() => {
									setterFunction(myclass.value);
									setActiveBtn(myclass.value);
								}}>
								{myclass.label}
							</div>
						) : (
							<div
								className="classBtn inactiveBtn"
								onClick={() => {
									setterFunction(myclass.value);
									setActiveBtn(myclass.value);
								}}
								key={myclass.value}>
								{myclass.label}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
