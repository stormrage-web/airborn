export interface Flight {
	time: string;
	title: string;
	direction: string;
	classes: string[];
}

export const flightsMock: Flight[] = [
	{
		title: "1125",
		time: "11:11",
		direction: "Moscow-Sochi",
		classes: [
			"B",
			"C",
			"D",
			"E",
			"G",
			"H",
			"I",
			"J",
			"K",
			"L",
			"M",
			"N",
			"O",
			"P",
			"Q",
			"R",
			"T",
			"U",
			"V",
			"X",
			"Y",
			"Z",
		],
	},
	{
		title: "1121",
		time: "11:20",
		direction: "Moscow-Sochi",
		classes: [
			"B",
			"C",
			"D",
			"E",
			"G",
			"H",
			"I",
			"J",
			"K",
			"L",
			"M",
			"N",
			"O",
			"P",
			"Q",
			"R",
			"T",
			"U",
			"V",
			"X",
			"Y",
			"Z",
		],
	},
];
