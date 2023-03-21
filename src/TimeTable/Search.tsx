import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { Lecture, weekToStr } from "./Lecture";

export const Search = (
  lectures: Lecture[],
  updateSelectedLec: (lec: Lecture) => void
) => {
  const [show, setShow] = React.useState(false);
  const [searchStr, setSearchStr] = React.useState<string>("");
  const [findLectures, setFindLectures] = React.useState<Lecture[]>([]);

  const updateFindLectures = (str: string) => {
    setSearchStr(str);
    setFindLectures(
      str === "" ? [] : lectures.filter(lec => (lec.name.includes(str) || lec.category.includes(str)) && lec.credit !== 0)
    );
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lecture Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={searchStr}
            onChange={e => updateFindLectures(e.target.value)}
            type="text"
            placeholder="Lecture Name or Category"
          />
          {
            findLectures.map(lec => SearchCard(lec, updateSelectedLec, () => setShow(false)))
          }
        </Modal.Body>
      </Modal >

      <div onClick={() => setShow(true)}>
        <h5>
          <FontAwesomeIcon icon={faSearch} className="mx-1" />
          Search
        </h5>
      </div>
    </>
  )
}

const SearchCard = (
  lec: Lecture,
  updateSelectedLec: (lec: Lecture) => void,
  closeModal: () => void
) => {
  const updateLec = () => {
    updateSelectedLec(lec);
    closeModal();
  };

  return <>
    <Card className="p-0 mt-2">
      <Card.Body>
        <Card.Title>
          {lec.name}
          <Button className="mx-2" size="sm" onClick={updateLec}>
            Add
          </Button>
        </Card.Title>
        <Card.Text>
          {weekToStr(lec.week) + " Period " + lec.period + " " + lec.category}
        </Card.Text>
      </Card.Body>
    </Card>
  </>
}