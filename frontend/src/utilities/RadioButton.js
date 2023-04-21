import { useState } from "react";

export default function RadioButton({ options, setterFunction, studentClass }) {
	const handleSelectedOption = (e) => {
		setterFunction(e.target.value);
	};
	return (
		<div className="radioBtns">
			{options.map((option) => {
				return (
					<div className="radio" key={option.value}>
						<input
							name="common"
							type="radio"
							value={option.value}
							onChange={handleSelectedOption}
						/>
						<label>{option.label}</label>
					</div>
				);
			})}
		</div>
	);
}
