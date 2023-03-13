import React from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { Lecture, lectureNone, periodList, periodNum, weekList, weekNum, weekToStr } from "./Lecture";
import { TimeTableCell } from "./TimeTableCell";
import { TimeTableCredit } from "./TimeTableCredit";


export const TimeTableContents = (
  show: boolean, 
  lectures: Lecture[],
  obtained: { [key: string]: number } | undefined
) => {
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

  const [alert, setAlert] = React.useState(true);
  const [alert2022, setAlert2022] = React.useState(true);

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <Container className="py-4">
        <Alert variant="danger" onClose={() => setAlert(false)} show={alert} dismissible>
          時間割や取得予定単位数は参考値です。万が一誤りがあった場合でも、一切の責任を負いません。
        </Alert>
        <Alert variant="danger" onClose={() => setAlert2022(false)} show={alert2022} dismissible>
          これは2022年度の時間割です。2023年度の時間割は未定です。公開され次第更新します。
        </Alert>
        <Table borderless style={{ tableLayout: "fixed" }}>
          <tbody>
            <tr>
              <td></td>
              {
                weekList.map((week, _) => {
                  return <td className="text-center"><h5>{weekToStr(week)}</h5></td>
                })
              }
            </tr>
            {
              periodList.map((period, _) => {
                return <tr>
                  <td className="text-center" style = {{ verticalAlign: "middle" }}>
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
      {TimeTableCredit(lectures, selectedLecture)}
      {obtained && TimeTableCredit(lectures, selectedLecture, obtained)}
    </div>
  )
};