import React from "react";
import { Button, Modal, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import systemsEngineeringAndScienceData from "../Data/システム理工学部.json"
import collegeOfEngineering from "../Data/工学部.json"
import { CardColor } from "./CardColor";
import { Lecture, lectureNone, Period, periodNum, toLecture, Week, weekNum } from "./Lecture";
import { SelectedOthers } from "./SelectedOthers";
import { TimeTableContents } from "./TimeTableContents";
import { TimeTableCredit } from "./TimeTableCredit";

type Semester = {
  semester: string,
  files: String[],
}

type Year = {
  year: string,
  semesters: Semester[],
}

type Department = {
  name: string,
  years: Year[],
}

type lectureJson = {
  name: string,
  week: string,
  period: number,
  teacher: string,
  credit: number,
  division: string,
  time: number,
}

type creditJson = {
  group: string,
  name: string,
  division: string,
  count: number,
  grade: string,
  form: string,
  period: string,
}

export type SelectedLecture = {
  table: Lecture[][],
  others: Lecture[],
}

const checkGrade = (grade: string): boolean => {
  const accept = ["S", "A", "B", "C", "N"];
  return accept.includes(grade);
};

export const TimeTable = () => {
  const keyData = {
    "departments": collegeOfEngineering.departments.concat(
      systemsEngineeringAndScienceData.departments
    )
  }

  const departmentData = sessionStorage.getItem("department") !== null ?
    JSON.parse(sessionStorage.getItem("department") as string) as Department : undefined;
  const [department, setDepartment] = React.useState<Department | undefined>(departmentData);

  const yearData = sessionStorage.getItem("year") !== null ?
    JSON.parse(sessionStorage.getItem("year") as string) as Year : undefined;
  const [year, setYear] = React.useState<Year | undefined>(yearData);

  const semesterData = sessionStorage.getItem("semester") !== null ?
    JSON.parse(sessionStorage.getItem("semester") as string) as Semester : undefined;
  const [semester, setSemester] = React.useState<Semester | undefined>(semesterData);

  const creditsData = sessionStorage.getItem("credits") !== null ?
    JSON.parse(sessionStorage.getItem("credits") as string) as creditJson[] : undefined;
  const [credits, setCreditData] = React.useState<creditJson[] | undefined>(creditsData);

  let _selectedLecture: Lecture[][] = [];
  for (let i = 0; i < weekNum; i++) {
    _selectedLecture.push([]);
    for (let j = 0; j < periodNum; j++) {
      _selectedLecture[i].push(lectureNone);
    }
  }

  const selectedLectureData = sessionStorage.getItem("selectedLecture") !== null ?
    JSON.parse(sessionStorage.getItem("selectedLecture") as string) as SelectedLecture : { table: _selectedLecture, others: [] };
  const [selectedLecture, setStateSelectedLecture] = React.useState<SelectedLecture>(selectedLectureData);
  const setSelectedLecture = (selectedLecture: SelectedLecture) => {
    setStateSelectedLecture(selectedLecture);
    sessionStorage.setItem("selectedLecture", JSON.stringify(selectedLecture));
  };
  const oneSelectLecTable = (week: number, period: number, lecture: Lecture) => {
    selectedLecture.table[week][period] = lecture;
    setSelectedLecture(selectedLecture);
  };

  const selectLec = (lecture: Lecture) => {
    if (lecture.week === Week.Others) {
      if (selectedLecture.others.find((lec, _) => lec.name === lecture.name)) {
        return;
      }
      selectedLecture.others.push(lecture);
      setSelectedLecture(selectedLecture);
      return;
    }
    for (let i = 0; i < lecture.time; i++) {
      const lec = Object.assign({}, lecture);
      if (i > 0) {
        lec.credit = 0;
      }
      oneSelectLecTable(lec.week, lec.period + i, lec);
    }
  };
  const setNull = (week: Week, period: Period) => {
    selectedLecture.table[week][period] = lectureNone;
    setSelectedLecture(selectedLecture);
  };

  const lecturesData = sessionStorage.getItem("lectures") !== null ?
    JSON.parse(sessionStorage.getItem("lectures") as string) as Lecture[] : [lectureNone];
  const [lectures, setLectures] = React.useState<Lecture[]>(lecturesData);

  const [cardColor, setCardColor] = React.useState<CardColor>(new CardColor(lecturesData));

  const obtainedData = sessionStorage.getItem("obtained") !== null ?
    JSON.parse(sessionStorage.getItem("obtained") as string) as { [key: string]: number } : undefined;
  const [obtained, setObtained] = React.useState<{ [key: string]: number } | undefined>(obtainedData);

  const departmentOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(keyData.departments.find((dep, _) => dep.name === e.target.value));
    sessionStorage.setItem(
      "department",
      JSON.stringify(keyData.departments.find((dep, _) => dep.name === e.target.value))
    );
    setYear(undefined);
    setSemester(undefined);
  };

  const yearOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(department?.years.find((year, _) => year.year === e.target.value));
    sessionStorage.setItem(
      "year",
      JSON.stringify(department?.years.find((year, _) => year.year === e.target.value))
    );
    setSemester(undefined);
  };

  const semesterOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSemester(year?.semesters.find((seme, _) => seme.semester === e.target.value));
    sessionStorage.setItem(
      "semester",
      JSON.stringify(year?.semesters.find((seme, _) => seme.semester === e.target.value))
    );
  };

  const creditFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.target.files[0].text().then((text) => {
        const data = JSON.parse(text).credits as creditJson[];
        sessionStorage.setItem("credits", JSON.stringify(data));
        setCreditData(data);
      })
    }
  };

  const generateLectures = () => {
    let lectures: Lecture[] = [lectureNone];
    if (semester) {
      semester.files.forEach((file, _) => {
        const data = require("../Data/" + file);
        data.lectures.forEach((lecture: lectureJson) => {
          lectures.push(toLecture(
            lecture.name,
            lecture.week,
            lecture.period,
            lecture.credit,
            lecture.division,
            lecture.time
          ));
        });
      });
    }
    let result: Lecture[] = [];
    lectures.forEach((lec, _) => {
      if (
        result.filter((res, _) => {
          return res.name === lec.name && res.week === lec.week && res.period === lec.period && res.category === lec.category;
        }).length === 0
        && (credits === undefined || credits.find((credit, _) => checkGrade(credit.grade) && credit.name === lec.name) === undefined)
      ) {
        result.push(lec);
      }
    });
    sessionStorage.setItem("lectures", JSON.stringify(result));
    setLectures(result);
    return result;
  };

  const generateObtained = (): { [key: string]: number } | undefined => {
    if (credits === undefined) {
      sessionStorage.removeItem("obtained");
      setObtained(undefined);
      return undefined;
    }
    let result: { [key: string]: number } = {};
    credits.forEach((credit, _) => {
      if (checkGrade(credit.grade)) {
        if (result[credit.group] === undefined) {
          result[credit.group] = 0;
        }
        result[credit.group] += credit.count;
      }
    })
    sessionStorage.setItem("obtained", JSON.stringify(result));
    setObtained(result);
    return result;
  }

  const onDone = () => {
    let lecs = generateLectures();
    setCardColor(new CardColor(lecs));
    generateObtained();
    setShow(false);
  };

  const [show, setShow] = React.useState(year === undefined);

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Select Department/Year/Semester</Modal.Title>
        </Modal.Header>
        <div className="p-2">
          <Form.Select className="my-2" onChange={e => departmentOnChange(e)}>
            {department === undefined ?
              <option hidden>Department</option> :
              <option value={department.name}>{department.name}</option>
            }
            {
              keyData.departments.filter(dep => dep.name !== department?.name)
                .map((department, _) => <option key={department.name} value={department.name}>{department.name}</option>)
            }
          </Form.Select>
          <Form.Select className="mb-2" onChange={e => yearOnChange(e)}>
            {year === undefined ?
              <option hidden>Year</option> :
              <option value={year.year}>{year.year}</option>
            }
            {
              department &&
              department.years.filter(yea => yea.year !== year?.year)
                .map((year, _) => <option key={department?.name + year.year} value={year.year}>{year.year}</option>)
            }
          </Form.Select>
          <Form.Select className="mb-2" onChange={e => semesterOnChange(e)}>
            {
              semester === undefined ?
                <option hidden>Semester</option> :
                <option value={semester.semester}>{semester.semester}</option>
            }
            {
              year &&
              year.semesters.filter(seme => seme.semester !== semester?.semester)
                .map((semester, _) => <option key={department?.name + year?.year + semester.semester} value={semester.semester}>{semester.semester}</option>)
            }
          </Form.Select>
          <Form.Label className="mt-1">
            optional: your credit file (How to get: <a href="https://sit-graduation-checker.ecto0310.com/usage">here</a>)
          </Form.Label>
          <Form.Control type="file" accept="application/json" onChange={creditFileOnChange} />
        </div>
        <Modal.Footer>
          <Button disabled={semester === undefined} onClick={onDone}>Done</Button>
        </Modal.Footer>
      </Modal>

      <Container>
        {
          TimeTableContents(
            lectures,
            selectedLecture,
            selectLec,
            cardColor,
            setNull
          )
        }
        {
          SelectedOthers(
            lectures,
            selectedLecture,
            setSelectedLecture,
            selectLec,
            cardColor
          )
        }
        <h3 className="m-2">今期の取得予定単位数の総和</h3>
        {
          TimeTableCredit(
            lectures,
            selectedLecture,
            cardColor
          )
        }
        {obtained && <>
          <h3 className="m-2">今までの単位数と取得予定単位数の総和</h3>
          {
            TimeTableCredit(
              lectures,
              selectedLecture,
              cardColor,
              obtained
            )
          }
        </>
        }
      </Container>
    </>
  )
}
