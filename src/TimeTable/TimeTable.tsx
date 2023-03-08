import React from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import test from "../json/test.json"
import keyData from "../Data/data.json"
import { Lecture, lectureNone, Period, periodList, periodNum, toLecture, Week, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";

type Semester = {
  semester: string,
  files: String[],
}

type Year = {
  year: string,
  semesters: Semester[],
}

type Department = {
  name: string;
  years: Year[];
}

type TimeTableState = {
  selectedLecture: Lecture[][];
  creditSum: number;
  creditDivision: { [key: string]: number };
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
  
  let lectures = test.lectures.map((item, _) => {
    // console.log(JSON.stringify(item));
    return toLecture(item.name, item.week, item.period, item.credit, item.division);
  }).concat([lectureNone]);

  let creditDivision: { [key: string]: number } = {};
  lectures.forEach((lecture, _) => creditDivision[lecture.category] = 0);

  const [state, setState] = React.useState<TimeTableState>({
    selectedLecture: selectedLecture,
    creditSum: 0,
    creditDivision: creditDivision,
  });
  
  const calculateCredit = (): [number, { [key: string]: number}] => {
    let sum = 0;
    let division: { [key: string]: number } = {};
    lectures.forEach((lecture, _) => division[lecture.category] = 0);

    for (let i = 0; i < weekNum; i++) {
      for (let j = 0; j < periodNum; j++) {
        sum += state.selectedLecture[i][j].credit;
        division[state.selectedLecture[i][j].category] += state.selectedLecture[i][j].credit;
      }
    }
    return [sum, division];
  }
  
  return (
    <>
      <Container>
        <Row>
          <Col sm = {8}>
            <Form.Select onChange = {e => setDepartment(keyData.departments.find((dep, _) => dep.name === e.target.value ))}>
              <option hidden>Department</option>
              {
                keyData.departments.map((department, _) => <option key = {department.name} value = {department.name}>{department.name}</option>)
              }
            </Form.Select>
          </Col>
          <Col sm = {2}>
            <Form.Select onChange = {e => setYear(department?.years.find((year, _) => year.year === e.target.value ))}>
              <option hidden>Year</option>
              {
                department &&
                department.years.map((year, _) => <option key = {year.year} value = {year.year}>{year.year}</option>)
              }
            </Form.Select>
          </Col>
          <Col sm = {2}>
            <Form.Select onChange = {e => setSemester(year?.semesters.find((seme, _) => seme.semester === e.target.value ))}>
              <option hidden>Semester</option>
              {
                year &&
                year.semesters.map((semester, _) => <option key = {semester.semester} value = {semester.semester}>{semester.semester}</option>)
              }
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <Container className="py-4">
        <Row>
          <Col xs={1}></Col>
          {
            weekList.map((week, _) => {
              return (
                <Col className="text-center"><h5>{weekToStr(week)}</h5></Col>
              )
            })
          }
        </Row>
        {
          periodList.map((period, _) => {
            return (
              <Row>
                <Col style={{display: "flex", justifyItems: "center", alignItems: "center"}} xs={1}>
                  <h5>{"Period " + period}</h5>
                </Col>
                {
                  weekList.map((week, _) => {
                    return (
                      <Col className="p-1">
                        {TimeTableCell({
                          nowSelect: state.selectedLecture[week][period],
                          week: week,
                          period: period,
                          lectures: [lectureNone].concat(lectures.filter((lecture) => { return lecture.week === week && lecture.period === period})),
                          onSelect: (lecture: Lecture) => {
                            state.selectedLecture[week][period] = lecture;
                            const [creditSum, creditDivision] = calculateCredit();
                            setState({
                              selectedLecture: state.selectedLecture,
                              creditSum: creditSum,
                              creditDivision: creditDivision,
                            });
                          },
                        })}
                      </Col>
                    )
                  })
                }
              </Row>
            )
          })
        }
      </Container>
      <p>creditSum : {state.creditSum}</p>
      {
        Object.keys(state.creditDivision).map((key, _) => {
          if (key === lectureNone.category) return;
          return (
            <p>{key} : {state.creditDivision[key]}</p>
          )
        })
      }
    </>
  )
}
