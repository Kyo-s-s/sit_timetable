import React from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { CardColor } from './CardColor';
import { Lecture, lectureNone } from './Lecture';
import { SelectedLecture } from './TimeTable';

type Credits = { [key: string]: number };

export const TimeTableCredit = (
  lectures: Lecture[],
  selectedLecture: SelectedLecture,
  cardColor: CardColor,
  obtained: { [key: string]: number } = {}
) => {
  let credits: Credits = {};
  for (let lecture of lectures) {
    if (lecture.name === lectureNone.name) continue;
    credits[lecture.category] = 0;
  }

  for (let i = 0; i < selectedLecture.table.length; i++) {
    for (let j = 0; j < selectedLecture.table[i].length; j++) {
      if (selectedLecture.table[i][j].name !== lectureNone.name) {
        credits[selectedLecture.table[i][j].category] += selectedLecture.table[i][j].credit;
      }
    }
  }

  for (let lecture of selectedLecture.others) {
    if (lecture.name === lectureNone.name) continue;
    credits[lecture.category] += lecture.credit;
  }

  return (
    <>
      <Container>
        <Row>
          <Table style={{ textAlign: "right" }}>
            <thead>
              <tr>
                {
                  Object.keys(credits).map((key, _) => {
                    return <th style={{ backgroundColor: cardColor.getColor(key) }}>
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
