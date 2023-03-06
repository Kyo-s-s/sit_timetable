import React from "react";
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
      <table>
        <tr>
          <th></th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
        </tr>
        <tr>
          <td>1限</td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Monday][Period.Period1]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Tuesday][Period.Period1]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Wednesday][Period.Period1]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Thursday][Period.Period1]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Friday][Period.Period1]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Saturday][Period.Period1]} /></td>
        </tr>
        <tr>
          <td>2限</td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Monday][Period.Period2]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Tuesday][Period.Period2]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Wednesday][Period.Period2]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Thursday][Period.Period2]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Friday][Period.Period2]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Saturday][Period.Period2]} /></td>
        </tr>
        <tr>
          <td>3限</td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Monday][Period.Period3]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Tuesday][Period.Period3]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Wednesday][Period.Period3]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Thursday][Period.Period3]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Friday][Period.Period3]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Saturday][Period.Period3]} /></td>
        </tr>
        <tr>
          <td>4限</td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Monday][Period.Period4]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Tuesday][Period.Period4]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Wednesday][Period.Period4]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Thursday][Period.Period4]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Friday][Period.Period4]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Saturday][Period.Period4]} /></td>
        </tr>
        <tr>
          <td>5限</td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Monday][Period.Period5]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Tuesday][Period.Period5]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Wednesday][Period.Period5]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Thursday][Period.Period5]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Friday][Period.Period5]} /></td>
          <td><TimeTableCell lectures={this.lecturesWeekTime[Week.Saturday][Period.Period5]} /></td>
        </tr>
      </table>
    );
  }
}