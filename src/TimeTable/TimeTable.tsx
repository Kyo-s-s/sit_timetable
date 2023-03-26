import React from "react";
import { Button, Container, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { CardColor } from "./CardColor";
import { Lecture, lectureNone, periodNum, toLecture, weekNum, Week, Period } from "./Lecture";
import { SelectedOthers } from "./SelectedOthers";
import { TimeTableContents } from "./TimeTableContents";
import { TimeTableCredit } from "./TimeTableCredit";
import { creditJson, Department, Faculty, getData, SelectedLecture, Year, lectureJson, checkGrade } from "./Type";

export const TimeTable = () => {
  const [faculty, _setFaculty] = React.useState<string | undefined>
    (sessionStorage.getItem("faculty") ?? undefined);
  const updateFaculty = (faculty: string | undefined) => {
    faculty === undefined ?
      sessionStorage.removeItem("faculty") :
      sessionStorage.setItem("faculty", faculty);
    _setFaculty(faculty);
  };
  const [department, _setDepartment] = React.useState<Department | undefined>
    (JSON.parse(sessionStorage.getItem("department") as string) ?? undefined);
  const updateDepartment = (department: Department | undefined) => {
    department === undefined ?
      sessionStorage.removeItem("department") :
      sessionStorage.setItem("department", JSON.stringify(department));
    _setDepartment(department);
  };
  const [year, _setYear] = React.useState<Year | undefined>
    (JSON.parse(sessionStorage.getItem("year") as string) ?? undefined);
  const updateYear = (year: Year | undefined) => {
    year === undefined ?
      sessionStorage.removeItem("year") :
      sessionStorage.setItem("year", JSON.stringify(year));
    _setYear(year);
  };

  const [credits, _setCredits] = React.useState<creditJson[] | undefined>
    (JSON.parse(sessionStorage.getItem("credits") as string) ?? undefined);
  const updateCredits = (credits: creditJson[] | undefined) => {
    credits === undefined ?
      sessionStorage.removeItem("credits") :
      sessionStorage.setItem("credits", JSON.stringify(credits));
    _setCredits(credits);
  };

  const [selectedLectures, _setSelectedLectures] = React.useState<SelectedLecture[]>
    (JSON.parse(sessionStorage.getItem("selectedLecture") as string) ?? []);
  const updateSelectedLectures = (selectedLectures: SelectedLecture[]) => {
    selectedLectures === undefined ?
      sessionStorage.removeItem("selectedLecture") :
      sessionStorage.setItem("selectedLecture", JSON.stringify(selectedLectures));
    _setSelectedLectures(selectedLectures);
  };
  const selectLec = (index: number, lecture: Lecture) => {
    if (lecture.week === Week.Others) {
      if (!selectedLectures[index].others.find((lec, _) => lec.name === lecture.name)) {
        selectedLectures[index].others.push(lecture);
      }
    } else {
      for (let i = 0; i < lecture.time; i++) {
        const lec = Object.assign({}, lecture);
        if (i > 0) {
          lec.credit = 0;
        }
        selectedLectures[index].table[lec.week][lec.period + i] = lec;
      }
    }
    updateSelectedLectures(selectedLectures);
  };
  const setNull = (index: number, week: Week, period: Period) => {
    selectedLectures[index].table[week][period] = lectureNone;
    updateSelectedLectures(selectedLectures);
  };
  const generateLectures = (id: number): Lecture[] => {
    let lectures: Lecture[] = [lectureNone];
    year?.semesters[id].files.forEach((file, _) => {
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
    let result: Lecture[] = [];
    lectures.forEach(lec => {
      if (
        result.find(res => res.name === lec.name && res.week === lec.week && res.category === lec.category) === undefined
        && (credits === undefined || credits.find(credit => checkGrade(credit.grade) && credit.name === lec.name) === undefined)
      ) {
        result.push(lec);
      }
    });
    return result;
  };

  const generateLecturesList = (): Lecture[][] => {
    if (year === undefined) return [[lectureNone]];
    let result: Lecture[][] = [];
    year.semesters.forEach((_, i) => {
      result.push(generateLectures(i));
    });
    return result;
  }

  const [lecturesList, setLecturesList] = React.useState<Lecture[][]>(generateLecturesList());
  const [cardColor, setCardColor] = React.useState<CardColor>(new CardColor(generateLecturesList().flat()));

  const [modalShow, setModalShow] = React.useState<boolean>(selectedLectures.length === 0);
  let tableNull: Lecture[][] = [];
  for (let i = 0; i < weekNum; i++) {
    tableNull.push([]);
    for (let j = 0; j < periodNum; j++) {
      tableNull[i].push(lectureNone);
    }
  }

  const creditFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.target.files[0].text().then(text => {
        updateCredits(JSON.parse(text).credits as creditJson[]);
      })
    }
  };

  const next = () => {
    let newSelectedLectures: SelectedLecture[] = [];
    year?.semesters.forEach(_ => {
      let add: Lecture[][] = [];
      for (let i = 0; i < weekNum; i++) {
        add.push([]);
        for (let j = 0; j < periodNum; j++) {
          add[i].push(lectureNone);
        }
      }
      newSelectedLectures.push({ table: add, others: [] });
    });
    updateSelectedLectures(newSelectedLectures);
    setCardColor(new CardColor(generateLecturesList().flat()));
    setLecturesList(generateLecturesList());
    setModalShow(false);
  }

  const getLecture = (idx: number): Lecture[] => {
    if (lecturesList[idx] === undefined) return [lectureNone];
    return lecturesList[idx];
  };

  const getSelectedLecture = (idx: number): SelectedLecture => {
    if (selectedLectures[idx] === undefined) return { table: tableNull, others: [] };
    return selectedLectures[idx];
  };

  return <>
    <Modal show={modalShow}>
      <Modal.Header>
        <Modal.Title>Select Faculty/Department/Year</Modal.Title>
      </Modal.Header>
      <div className="p-2">
        <Form.Select className="my-2"
          onChange={e => {
            updateFaculty(e.target.value)
            updateDepartment(undefined);
            updateYear(undefined);
          }}
        >
          <option hidden>Faculty</option>
          {
            [Faculty.CollegeOfEngineering, Faculty.SystemsEngineeringAndScience, Faculty.EngineeringAndDesign, Faculty.SchoolOfArchitecture]
              .map((faculty, _) => <option key={faculty} value={faculty}>{faculty}</option>)
          }
        </Form.Select>
        <Form.Select className="my-2"
          onChange={e => {
            updateDepartment(getData(faculty)?.departments.find(dep => dep.name === e.target.value))
            updateYear(undefined);
          }}
        >
          <option hidden>Department</option>
          {
            getData(faculty) &&
            getData(faculty)?.departments.map((dep, _) =>
              <option key={dep.name} value={dep.name}>{dep.name.split(" ").slice(1).join(" ")}</option>
            )
          }
        </Form.Select>
        <Form.Select className="mb-2"
          onChange={e => updateYear(department?.years.find(y => y.year === e.target.value))}
        >
          <option hidden>Year</option>
          {
            department &&
            department.years.map((year, _) =>
              <option key={department.name + year.year} value={year.year}>{year.year}</option>
            )
          }
        </Form.Select>
        <Form.Label className="mt-1">
          optional: your credit file (How to get: <a href="https://sit-graduation-checker.ecto0310.com/usage">here</a>)
        </Form.Label>
        <Form.Control type="file" accept="application/json" onChange={creditFileOnChange} />
      </div>
      <Modal.Footer>
        <Button disabled={year === undefined} onClick={next}>Next</Button>
      </Modal.Footer>
    </Modal>

    <Container style={{ display: !modalShow ? "block" : "none" }}>
      <Tabs defaultActiveKey={"1"}>
        <Tab eventKey={"1"} title={year?.semesters[0].semester ?? ""}>
          {
            TimeTableContents(
              getLecture(0),
              getSelectedLecture(0),
              (lec: Lecture) => selectLec(0, lec),
              cardColor,
              (week: Week, period: Period) => setNull(0, week, period)
            )
          }
          {
            SelectedOthers(
              getLecture(0),
              getSelectedLecture(0),
              (selectedLec: SelectedLecture) => {
                selectedLectures[0] = selectedLec;
                updateSelectedLectures(selectedLectures)
              },
              (lec: Lecture) => { selectLec(0, lec) },
              cardColor
            )
          }
          <h3 className="m-2">{year?.semesters[0].semester ?? ""}の取得予定単位数の総和</h3>
          {
            TimeTableCredit(
              lecturesList.flat(),
              [getSelectedLecture(0)],
              cardColor
            )
          }
        </Tab>
        <Tab eventKey={"2"} title={year?.semesters[1].semester}>
          {
            TimeTableContents(
              getLecture(1),
              getSelectedLecture(1),
              (lec: Lecture) => selectLec(1, lec),
              cardColor,
              (week: Week, period: Period) => setNull(1, week, period)
            )
          }
          {
            SelectedOthers(
              getLecture(1),
              getSelectedLecture(1),
              (selectedLec: SelectedLecture) => {
                selectedLectures[1] = selectedLec;
                updateSelectedLectures(selectedLectures)
              },
              (lec: Lecture) => { selectLec(1, lec) },
              cardColor
            )
          }
          <h3 className="m-2">{year?.semesters[1].semester ?? ""}の取得予定単位数の総和</h3>
          {
            TimeTableCredit(
              lecturesList.flat(),
              [getSelectedLecture(1)],
              cardColor
            )
          }
        </Tab>
      </Tabs>
      <h3>
        {credits && "今までの単位数と"}
        取得予定単位数の総和
      </h3>
      {
        TimeTableCredit(
          lecturesList.flat(),
          selectedLectures,
          cardColor,
          credits ?? []
        )
      }
    </Container>
  </>
}