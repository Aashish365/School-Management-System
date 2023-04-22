import Avatar, { genConfig } from "react-nice-avatar";

export default function Face({ data }) {
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
					<div className="address">{data.address}</div>
					{data.role === "student" && (
						<div className="myclass">
							{data.studentClass} {data.section}
						</div>
					)}
					<div className="schoolName">Beautiful Professional School</div>
					{data.role === "student" && (
						<div className="guardianDetail">
							<h2>Guardian Details</h2>
							<div className="gName">
								{data.guardianName}{" "}
								{data.relation && <span>({data.relation})</span>}
							</div>
							<div className="gAddress"> {data.g_address}</div>
							<div className="gEmail">{data.g_email}</div>
							<div className="gNumber">{data.g_number}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
