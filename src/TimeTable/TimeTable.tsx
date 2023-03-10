import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
  isContinued: boolean,
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
  
  const generateLectures = (): Lecture[] => {
    let result: Lecture[] = [lectureNone];   
    if (semester) {
      semester.files.forEach((file, _) => {
        const data = require("../Data/" + file);
        data.lectures.forEach((lecture: lectureJson) => {
          result.push(toLecture(lecture.name, lecture.week, lecture.period, lecture.credit, lecture.division));
        });
      });
    }
    return result;
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
          <Form.Select onChange = {e => semesterOnChange(e)}>
            <option hidden>Semester</option>
            {
              year &&
              year.semesters.map((semester, _) => <option key = {semester.semester} value = {semester.semester}>{semester.semester}</option>)
            }
          </Form.Select>
        </div>
        <Modal.Footer>
          <Button disabled = {semester === undefined} onClick = {() => setShow(false)}>Done</Button>
        </Modal.Footer>
      </Modal>

      {TimeTableContents(generateLectures())}
    </>
  )
}
