import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Lecture, lectureNone, periodList, periodNum, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";


export const TimeTableContents = (lectures: Lecture[]) => {
  let _selectedLecture: Lecture[][] = [];
  for (let i = 0; i < weekNum; i++) {
    _selectedLecture.push([]);
    for (let j = 0; j < periodNum; j++) {
      _selectedLecture[i].push(lectureNone);
    }
  }

  const [selectedLecture, setSelectedLecture] = React.useState(_selectedLecture);

  const onSelect = (lecture: Lecture) => {
    selectedLecture[lecture.week][lecture.period] = lecture;
    setSelectedLecture(selectedLecture);
  };

  return (
    <>
      <Container className = "py-4">
        <Row>
          <Col xs = {1}></Col>
          {
            weekList.map((week, _) => {
              return <Col className = "text-center"><h5>{weekToStr(week)}</h5></Col>
            })
          }
        </Row>
        {
          periodList.map((period, _) => {
            return <Row>
              <Col style = {{display: "flex", justifyItems: "center", alignItems: "center"}} xs = {1}>
                <h5>{"Period" + period}</h5>
              </Col>
              {
                weekList.map((week, _) => {
                  return <Col className = "p-1">
                    {TimeTableCell({
                      nowSelect: selectedLecture[week][period],
                      week: week,
                      period: period,
                      lectures: [lectureNone].concat(lectures.filter((lecture) => { return lecture.week === week && lecture.period === period})),
                      onSelect: onSelect,
                    })}
                  </Col>
                })
              }
            </Row>
          })
        }
      </Container> 
    </>
  )
};