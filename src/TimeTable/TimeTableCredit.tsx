import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Lecture, lectureNone } from './Lecture';

type Credits = { [key: string]: number };

export const TimeTableCredit = (lectures: Lecture[], selectedLecture: Lecture[][]) => {

  let credits: Credits = {};
  let sum = 0;
  for (let lecture of lectures) {
    if (lecture.name === lectureNone.name) continue;
    credits[lecture.category] = 0;
  }

  for (let i = 0; i < selectedLecture.length; i++) {
    for (let j = 0; j < selectedLecture[i].length; j++) {
      if (selectedLecture[i][j].name !== lectureNone.name) {
        credits[selectedLecture[i][j].category] += selectedLecture[i][j].credit;
        sum += selectedLecture[i][j].credit;
      }
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Table style={{textAlign: "right"}}>
            <thead>
              <tr>
                {
                  Object.keys(credits).map((key, _) => {
                    return <th>{key}</th>
                  })
                }
                <th>総和</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  Object.keys(credits).map((key, _) => {
                    return <td>{credits[key]}</td>
                  })
                }
                <td>{sum}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}