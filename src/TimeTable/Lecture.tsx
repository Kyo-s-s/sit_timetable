export enum Week {
	Others = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6
}
export const weekNum = 7;

export const weekList = [Week.Monday, Week.Tuesday, Week.Wednesday, Week.Thursday, Week.Friday, Week.Saturday];

export function weekToStr(week: Week): string {
	switch (week) {
		case Week.Monday:
			return "Monday";
		case Week.Tuesday:
			return "Tuesday";
		case Week.Wednesday:
			return "Wednesday";
		case Week.Thursday:
			return "Thursday";
		case Week.Friday:
			return "Friday";
		case Week.Saturday:
			return "Saturday";
		default:
			return "";
	}
}

export enum Period {
	Others = 0,
	Period1 = 1,
	Period2 = 2,
	Period3 = 3,
	Period4 = 4,
	Period5 = 5,
	Period6 = 6,
	Period7 = 7
}
export const periodNum = 8;

export const periodList = [Period.Period1, Period.Period2, Period.Period3, Period.Period4, Period.Period5];

export type Lecture = {
	name: string;
	week: Week;
	period: Period;
	credit: number;
	category: string;
}

function toWeek(week: string): Week {
	switch (week) {
		case "月曜日":
			return Week.Monday;
		case "火曜日":
			return Week.Tuesday;
		case "水曜日":
			return Week.Wednesday;
		case "木曜日":
			return Week.Thursday;
		case "金曜日":
			return Week.Friday;
		case "土曜日":
			return Week.Saturday;
		default:
			return Week.Others;
	}
}

function toPeriod(period: number): Period {
	switch (period) {
		case 1:
			return Period.Period1;
		case 2:
			return Period.Period2;
		case 3:
			return Period.Period3;
		case 4:
			return Period.Period4;
		case 5:
			return Period.Period5;
		case 6:
			return Period.Period6;
		case 7:
			return Period.Period7;
		default:
			return Period.Others;
	}
}

export const lectureNone = {
	name: "null",
	week: Week.Others,
	period: Period.Others,
	credit: 0,
	category: "null"
};

export function toLecture(
	name: string,
	week: string,
	period: number,
	credit: number,
	category: string
): Lecture {
	return {
		name: name,
		week: toWeek(week),
		period: toPeriod(period),
		credit: credit,
		category: category
	}
}
