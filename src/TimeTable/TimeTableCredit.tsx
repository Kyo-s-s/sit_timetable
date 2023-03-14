import React from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { CardColor } from './CardColor';
import { Lecture, lectureNone } from './Lecture';

type Credits = { [key: string]: number };

export const TimeTableCredit = (
  lectures: Lecture[], 
  selectedLecture: Lecture[][], 
  cardColor: CardColor,
  obtained: { [key: string]: number } = {}
) => {
  let credits: Credits = {};
  for (let lecture of lectures) {
    if (lecture.name === lectureNone.name) continue;
    credits[lecture.category] = 0;
  }

  for (let i = 0; i < selectedLecture.length; i++) {
    for (let j = 0; j < selectedLecture[i].length; j++) {
      if (selectedLecture[i][j].name !== lectureNone.name) {
        credits[selectedLecture[i][j].category] += selectedLecture[i][j].credit;
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
                    return <th style = {{ backgroundColor: cardColor.getColor(key) }}>
                      {key}
                    </th>
                  })
                }
                <th>総和</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  Object.keys(credits).map((key, _) => {
                    return <td>
                      {credits[key] + (obtained[key] ?? 0)}
                    </td>
                  })
                }
                <td>
                  {
                    Object.values(credits).reduce((a, b) => a + b, 0) + 
                    Object.values(obtained).reduce((a, b) => a + b, 0)
                  }
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}