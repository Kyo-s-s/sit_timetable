import collegeOfEngineeringData from "../Data/工学部.json";
import systemsEngineeringAndScienceData from "../Data/システム理工学部.json";
import engineeringAndDesignData from "../Data/デザイン工学部.json";
import schoolOfArchitectureData from "../Data/建築学部.json";
import { Lecture } from "./Lecture";

export type Semester = {
    semester: string,
    files: String[],
}

export type Year = {
    year: string,
    semesters: Semester[],
}

export type Department = {
    name: string,
    years: Year[],
}

export type lectureJson = {
    name: string,
    week: string,
    period: number,
    teacher: string,
    credit: number,
    division: string,
    time: number,
}

export type creditJson = {
    group: string,
    name: string,
    division: string,
    count: number,
    grade: string,
    form: string,
    period: string,
}

export type dataJson = {
    departments: {
        name: string,
        years: {
            year: string,
            semesters: {
                semester: string,
                files: string[],
            }[],
        }[],
    }[],
}

export enum Faculty {
    CollegeOfEngineering = "工学部",
    SystemsEngineeringAndScience = "システム理工学部",
    EngineeringAndDesign = "デザイン工学部",
    SchoolOfArchitecture = "建築学部"
}

export const getData = (str: string | undefined): dataJson | undefined => {
    switch (str) {
        case Faculty.CollegeOfEngineering:
            return collegeOfEngineeringData;
        case Faculty.SystemsEngineeringAndScience:
            return systemsEngineeringAndScienceData;
        case Faculty.EngineeringAndDesign:
            return engineeringAndDesignData;
        case Faculty.SchoolOfArchitecture:
            return schoolOfArchitectureData;
        default:
            return undefined;
    }
}

export type SelectedLecture = {
    table: Lecture[][],
    others: Lecture[],
}

export const checkGrade = (grade: string): boolean => {
    const accept = ["S", "A", "B", "C", "N"];
    return accept.includes(grade);
};

