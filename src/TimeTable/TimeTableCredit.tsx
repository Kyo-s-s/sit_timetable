import React from 'react';
import { Lecture } from './Lecture';

type Credits = { [key: string]: number };

export const TimeTableCredit = (lectures: Lecture[], selectedLecture: Lecture[][]) => {

  let _credits: Credits = {};
  for (let lecture of lectures) {
    _credits[lecture.category] = 0;
  }

  for (let i = 0; i < selectedLecture.length; i++) {
    for (let j = 0; j < selectedLecture[i].length; j++) {
      if (selectedLecture[i][j].name !== "") {
        _credits[selectedLecture[i][j].category] += selectedLecture[i][j].credit;
      }
    }
  }

  return (
    <>
    {
      Object.keys(_credits).map((key, _) => {
        return <p>{key}: {_credits[key]}</p>
      })
    }
    </>
  )
}