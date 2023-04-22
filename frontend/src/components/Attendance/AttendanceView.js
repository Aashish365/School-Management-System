import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "",
		},
	},
};

const getPosition = (date) => {
	const monthString = date.split("-")[1];
	const month = parseInt(monthString, 10) - 1;
	return month;
};

const noOfClassesInaMonth = (attendanceData) => {
	const noOfClasses = new Array(12).fill(0);
	attendanceData.map((el) => {
		noOfClasses[getPosition(el.date)]++;
	});
	return noOfClasses;
};

const getLabels = (data) => {
	let labels = [];
	data.map((el) => {
		labels.push(el.title);
	});
	return labels;
};

const getnoOfClasses = (data) => {
	let noOfClasses = [];
	data.map((el) => {
		noOfClasses.push(el.attendance.length);
	});
	return noOfClasses;
};

export default function AttendanceView({ data }) {
	let labels = [];
	let attendanceData = [];
	let mydata = [];
	if (data.role === "faculty") {
		attendanceData = data.teacherAttendance;
		labels = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		mydata = {
			labels,
			datasets: [
				{
					fill: true,
					label: "",
					data: noOfClassesInaMonth(attendanceData),
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgba(53, 162, 235, 0.5)",
				},
			],
		};
	} else {
		labels = getLabels(data.subjects);
		attendanceData = getnoOfClasses(data.subjects);
		mydata = {
			labels,
			datasets: [
				{
					fill: true,
					label: "",
					data: attendanceData,
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgba(53, 162, 235, 0.5)",
				},
			],
		};
	}

	return (
		<div className="attendanceView">
			<div className="graph">
				<h1>Attendance</h1>
				{data.role === "faculty" && <Line options={options} data={mydata} />}
				{data.role === "student" && <Bar options={options} data={mydata} />}
			</div>
		</div>
	);
}
