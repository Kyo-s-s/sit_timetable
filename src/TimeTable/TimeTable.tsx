import React from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import test from "../json/test.json"
import { Lecture, lectureNone, Period, periodList, periodNum, toLecture, Week, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";

type TimeTableState = {
  selectedLecture: Lecture[][];
  creditSum: number;
}

export const TimeTable = () => {
  let selectedLecture: Lecture[][] =  [];
  for (let i = 0; i < weekNum; i++) {
    selectedLecture.push([]);
    for (let j = 0; j < periodNum; j++) {
      selectedLecture[i].push(lectureNone);
    }
  }
  const [state, setState] = React.useState<TimeTableState>({
    selectedLecture: selectedLecture,
    creditSum: 0,
  });

  let lectures = test.lectures.map((item, _) => {
    console.log(JSON.stringify(item));
    return toLecture(item.name, item.week, item.period, item.credit, item.division);
  });

  const calculateCreditSum = () => {
    let sum = 0;
    for (let i = 0; i < weekNum; i++) {
      for (let j = 0; j < periodNum; j++) {
        sum += state.selectedLecture[i][j].credit;
      }
    }
    return sum;
  }

  return (
    <>
      <Container className="p-1">
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
                            console.log(lecture.name);
                            state.selectedLecture[week][period] = lecture;
                            setState({
                              selectedLecture: state.selectedLecture,
                              creditSum: calculateCreditSum(),
                            });
                            console.log(JSON.stringify(state.selectedLecture));
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
    </>
  )
}
