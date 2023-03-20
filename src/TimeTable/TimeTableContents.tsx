import React from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { Lecture, lectureNone, periodList, periodNum, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";
import { TimeTableCredit } from "./TimeTableCredit";
import { CardColor } from "./CardColor";
import { Search } from "./Search";


export const TimeTableContents = (
  lectures: Lecture[],
  selectedLecture: Lecture[][],
  onSelect: (week: number, period: number, lecture: Lecture) => void,
  cardColor: CardColor,
  obtained: { [key: string]: number } | undefined
) => {

  return (
    <div>
      <Container className="py-4">
        <Table borderless style={{ tableLayout: "fixed" }}>
          <tbody>
            <tr>
              <td className="text-center">{Search(lectures, onSelect)}</td>
              {
                weekList.map((week, _) => {
                  return <td className="text-center"><h5>{weekToStr(week)}</h5></td>
                })
              }
            </tr>
            {
              periodList.map((period, _) => {
                return <tr>
                  <td className="text-center" style={{ verticalAlign: "middle" }}>
                    <h5>{"Period" + period}</h5>
                  </td>
                  {
                    weekList.map((week, _) => {
                      return <td className="p-1">
                        {TimeTableCell({
                          nowSelect: selectedLecture[week][period],
                          week: week,
                          period: period,
                          lectures: [lectureNone].concat(lectures.filter((lecture) => { return lecture.week === week && lecture.period === period })),
                          cardColor: cardColor,
                          onSelect: (lecture: Lecture) => { onSelect(week, period, lecture) },
                        })}
                      </td>
                    })
                  }
                </tr>
              })
            }
          </tbody>
        </Table>
      </Container>
    </div>
  )
};
