import Avatar, { genConfig } from "react-nice-avatar";

export default function Face({ data }) {
	console.log(data);

	let config = "";
	if (data.gender === "male") {
		config = genConfig({ sex: "man" });
	} else if (data.gender === "female") {
		config = genConfig({ sex: "woman" });
	} else {
		config = genConfig();
	}

	return (
		<div className="face">
			<div className="section profileSection">
				<Avatar
					className="avatar"
					style={{ width: 250, height: 250 }}
					shape="circle"
					bgColor="#f2f2f2"
					textColor="#333"
					{...config}
				/>
				<div className="pesonalInfo">
					<div className="name">
						{data.fName + " " + data.lName + " "} ({data.regNumber})
					</div>
					<div className="email">{data.email}</div>
					<div className="phone">{data.phoneNumber}</div>
					{data.role === "student" && (
						<div className="myclass">
							{data.studentClass} {data.section}
						</div>
					)}
					<div className="schoolName">Beautiful Professional School</div>
				</div>
			</div>
		</div>
	);
}
