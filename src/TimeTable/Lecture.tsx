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

export type Lecture = {
	name: string;
	week: Week;
	time: Period;
	credit: number;
	category: string;
}

function toWeek(week: string): Week {
	switch (week) {
		case "月":
			return Week.Monday;
		case "火":
			return Week.Tuesday;
		case "水":
			return Week.Wednesday;
		case "木":
			return Week.Thursday;
		case "金":
			return Week.Friday;
		case "土":
			return Week.Saturday;
		default:
			return Week.Others;
	}
}

function toPeriod(period: string): Period {
	switch (period) {
		case "1":
			return Period.Period1;
		case "2":
			return Period.Period2;
		case "3":
			return Period.Period3;
		case "4":
			return Period.Period4;
		case "5":
			return Period.Period5;
		case "6":
			return Period.Period6;
		case "7":
			return Period.Period7;
		default:
			return Period.Others;
	}
}

export const lectureNone = {
	name: "(なし)",
	week: Week.Others,
	time: Period.Others,
	credit: 0,
	category: ""
};

export function toLecture(
	name: string,
	week: string,
	time: string,
	credit: number,
	category: string
): Lecture {
	return {
		name: name,
		week: toWeek(week),
		time: toPeriod(time),
		credit: credit,
		category: category
	}
}
