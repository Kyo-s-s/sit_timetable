import React from "react";
import { Container, Table } from "react-bootstrap";
import { Lecture, lectureNone, periodList, Week, Period, weekList, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";
import { CardColor } from "./CardColor";
import { Search } from "./Search";
import { SelectedLecture } from "./Type";


export const TimeTableContents = (
  lectures: Lecture[],
  selectedLecture: SelectedLecture,
  onSelect: (lecture: Lecture) => void,
  cardColor: CardColor,
  setNull: (week: Week, period: Period) => void,
) => {

  return (
    <div>
      <Container className="pt-4">
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
                          nowSelect: selectedLecture.table[week][period],
                          week: week,
                          period: period,
                          lectures: [lectureNone].concat(lectures.filter((lecture) => { return lecture.week === week && lecture.period === period })),
                          cardColor: cardColor,
                          onSelect: onSelect,
                          setNull: setNull,
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
