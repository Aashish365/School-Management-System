import { useState } from "react";

export default function RadioButton({ options, setterFunction }) {
	const handleSelectedOption = (e) => {
		setterFunction(e.target.value);
	};
	return (
		<div>
			{options.map((option) => {
				return (
					<label key={option.value}>
						<input
							name="common"
							type="radio"
							value={option.value}
							onChange={handleSelectedOption}
						/>
						{option.label}
					</label>
				);
			})}
		</div>
	);
}
