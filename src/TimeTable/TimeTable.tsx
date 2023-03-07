import React from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import test from "../json/test.json"
import { Lecture, lectureNone, Period, periodNum, toLecture, Week, weekNum } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";

type TimeTableState = {

}

type TimeTableProps = {}

export class TimeTable extends React.Component {
  
  lecturesWeekTime: Lecture[][][] = [];

  constructor(props: TimeTableProps) {
    super(props);

    // ごめんなさい
    for (let i = 0; i < weekNum; i++) {
      let lecturesTime: Lecture[][] = [];
      for (let j = 0; j < periodNum; j++) {
        lecturesTime.push([lectureNone]);
      }
      this.lecturesWeekTime.push(lecturesTime);
    }

    test.class.map((item, _) => {
      const lecture = toLecture(item.name, item.week, item.time, item.credit, item.category);
      this.lecturesWeekTime[lecture.week][lecture.time].push(lecture);
    }); 
    console.log(JSON.stringify(this.lecturesWeekTime));
  }

  

  render() {
    return (
      <Container className="p-3">
        <Row>
          { 
            ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item, _) => {
              return <Col>{item}</Col>
            })
          }
        </Row>
        {
          [Period.Period1, Period.Period2, Period.Period3, Period.Period4, Period.Period5].map((period, _) => {
            return (
              <Row>
                <Col>{"Period " + period}</Col>
                {
                  [Week.Monday, Week.Tuesday, Week.Wednesday, Week.Thursday, Week.Friday, Week.Saturday].map((week, _) => {
                    return <Col><TimeTableCell lectures={this.lecturesWeekTime[week][period]}/></Col>
                  })
                }
              </Row>
            )
          })
        }
      </Container>
    );
  }
}