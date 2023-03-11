import React from "react";
import { Container, Table } from "react-bootstrap";
import { Lecture, lectureNone, periodList, periodNum, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";
import { TimeTableCredit } from "./TimeTableCredit";


export const TimeTableContents = (lectures: Lecture[]) => {
  let _selectedLecture: Lecture[][] = [];
  for (let i = 0; i < weekNum; i++) {
    _selectedLecture.push([]);
    for (let j = 0; j < periodNum; j++) {
      _selectedLecture[i].push(lectureNone);
    }
  }

  const [selectedLecture, setSelectedLecture] = React.useState(_selectedLecture);

  const onSelect = (week: number, period: number, lecture: Lecture) => {
    selectedLecture[week][period] = lecture;
    setSelectedLecture(selectedLecture);
  };

  return (
    <>
      <Container className = "py-4">
        <Table style = {{tableLayout: "fixed"}}>
          <tr>
            <td></td>
            {
              weekList.map((week, _) => {
                return <td className = "text-center"><h5>{weekToStr(week)}</h5></td>
              })
            }
          </tr>
          {
            periodList.map((period, _) => {
              return <tr>
                <td className = "text-center">
                  <h5>{"Period" + period}</h5>
                </td>
                {
                  weekList.map((week, _) => {
                    return <td className = "p-1">
                      {TimeTableCell({
                        nowSelect: selectedLecture[week][period],
                        week: week,
                        period: period,
                        lectures: [lectureNone].concat(lectures.filter((lecture) => { return lecture.week === week && lecture.period === period})),
                        onSelect: (lecture: Lecture) => { onSelect(week, period, lecture) },
                      })}
                    </td>
                  })
                }
              </tr>
            })
          }
        </Table>
      </Container>
      {TimeTableCredit(lectures, selectedLecture)}
    </>
  )
};