import React from "react";
import { Button, Modal, Nav, OverlayTrigger, Popover } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import keyData from "../Data/data.json"
import { Lecture, lectureNone, Period, periodList, periodNum, toLecture, Week, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableContents } from "./TimeTableContents";

type Semester = {
  semester: string,
  files: String[],
}

type Year = {
  year: string,
  semesters: Semester[],
}

type Department = {
  name: string,
  years: Year[],
}

type lectureJson = {
  name: string,
  week: string,
  period: number,
  teacher: string,
  credit: number,
  division: string,
  time: number,
}

type creditJson = {
  group: string,
  name: string,
  division: string,
  count: number,
  grade: string,
  form: string,
  period: string,
}

export const TimeTable = () => {
  let selectedLecture: Lecture[][] =  [];
  for (let i = 0; i < weekNum; i++) {
    selectedLecture.push([]);
    for (let j = 0; j < periodNum; j++) {
      selectedLecture[i].push(lectureNone);
    }
  }

  const [department, setDepartment] = React.useState<Department | undefined>();
  const [year, setYear] = React.useState<Year | undefined>();
  const [semester, setSemester] = React.useState<Semester | undefined>();
  const [creditData, setCreditData] = React.useState<creditJson[] | undefined>();
  
  const departmentOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(keyData.departments.find((dep, _) => dep.name === e.target.value ));
    setYear(undefined);
    setSemester(undefined);
  };

  const yearOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(department?.years.find((year, _) => year.year === e.target.value ));
    setSemester(undefined);
  };
  
  const semesterOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSemester(year?.semesters.find((seme, _) => seme.semester === e.target.value ));
  };

  const creditFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.target.files[0].text().then((text) => {
        const data = JSON.parse(text).credits as creditJson[];
        setCreditData(data);
      })
    }
  };
  
  const generateLectures = (): Lecture[] => {
    let lectures: Lecture[] = [lectureNone];   
    if (semester) {
      semester.files.forEach((file, _) => {
        const data = require("../Data/" + file);
        data.lectures.forEach((lecture: lectureJson) => {
          for (let i = 0; i < lecture.time; i++) {
            lectures.push(toLecture(
              lecture.name,
              lecture.week,
              lecture.period + i,
              i === 0 ? lecture.credit : 0,
              lecture.division,
              lecture.time
            ))
          }
        });
      });
    }
    let result: Lecture[] = [];
    lectures.forEach((lec, _) => {
      if (
        result.filter((res, _) => res.name === lec.name && res.week === lec.week && res.period === lec.period).length === 0
        && (creditData === undefined || creditData.find((credit, _) => credit.name === lec.name) === undefined)
      ) {
        result.push(lec);
      }
    });
    return result
  };

  const [show, setShow] = React.useState(true);

  return (
    <>
      <Modal show = {show}>
        <Modal.Header>
          <Modal.Title>Select Department/Year/Semester</Modal.Title>
        </Modal.Header>
        <div className = "p-2">
          <Form.Select className = "my-2" onChange = {e => departmentOnChange(e)}>
            <option hidden>Department</option>
            {
              keyData.departments.map((department, _) => <option key = {department.name} value = {department.name}>{department.name}</option>)
            }
          </Form.Select>
          <Form.Select className = "mb-2" onChange = {e => yearOnChange(e)}>
            <option hidden>Year</option>
            {
              department &&
              department.years.map((year, _) => <option key = {year.year} value = {year.year}>{year.year}</option>)
            }
          </Form.Select>
          <Form.Select className="mb-2" onChange = {e => semesterOnChange(e)}>
            <option hidden>Semester</option>
            {
              year &&
              year.semesters.map((semester, _) => <option key = {semester.semester} value = {semester.semester}>{semester.semester}</option>)
            }
          </Form.Select>
            <Form.Label className="mt-1">
              optional: your credit file (How to get: <a href="https://sit-graduation-checker.ecto0310.com/usage" target="_blank">here</a>)
            </Form.Label>
          <Form.Control type="file" accept="application/json" onChange={creditFileOnChange}/>
        </div>
        <Modal.Footer>
          <Button disabled = {semester === undefined} onClick = {() => setShow(false)}>Done</Button>
        </Modal.Footer>
      </Modal>
      {
        TimeTableContents(!show, generateLectures())
      }
    </>
  )
}
