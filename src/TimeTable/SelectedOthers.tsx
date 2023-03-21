import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Container, Form, Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap"
import { CardColor } from "./CardColor"
import { Lecture, lectureNone, Week } from "./Lecture"
import { SelectedLecture } from "./TimeTable"
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const SelectedOthers = (
  lectures: Lecture[],
  selectedLecture: SelectedLecture,
  setSelectedLecture: React.Dispatch<React.SetStateAction<SelectedLecture>>,
  selectLec: (lec: Lecture) => void,
  cardColor: CardColor
) => {
  const otherLecs = lectures.filter(lec => lec === lectureNone || lec.week === Week.Others);
  const [addSelectedLec, setAddSelectedLec] = React.useState<Lecture>(otherLecs[0]);
  const [show, setShow] = React.useState(false);
  const [deleteLec, setDeleteLec] = React.useState<Lecture | undefined>(undefined);

  const cards = selectedLecture.others.map((lec) => OtherCard(lec, cardColor, setDeleteLec));
  let table: JSX.Element[] = [];
  const rowCount = 5;

  for (let i = 0; i <= cards.length; i += rowCount) {
    let row: JSX.Element[] = [];
    for (let j = i; j < i + rowCount; j++) {
      if (j < cards.length) {
        row.push(<td className="p-1">{cards[j]}</td>);
      } else if (j === cards.length) {
        row.push(<td className="p-1">
          <Card onClick={_ => setShow(true)} style={{ height: "112px" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Title>
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                Add
              </Card.Title>
            </Card.Body>
          </Card>
        </td>);
      } else {
        row.push(<td></td>);
      }
    }
    table.push(<tr>{row}</tr>)
  }

  return <>
    <h3 className="m-2">その他の講義</h3>
    <Container>
      <Table borderless style={{ tableLayout: "fixed" }}>
        <tbody>
          {table}
        </tbody>
      </Table>
    </Container>

    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Other</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select onChange={e => {
          setAddSelectedLec(otherLecs.find((lec) => lec.name + lec.category === e.target.value)!);
        }}>
          <option hidden>{addSelectedLec.name}</option>
          {
            otherLecs.filter((lec) => !(lec.name === addSelectedLec.name && lec.category === addSelectedLec.category)).map((lec) => {
              return <option value={lec.name + lec.category} key={lec.name + lec.category}>{lec.name}</option>
            })
          }
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={_ => {
          selectLec(addSelectedLec);
          setAddSelectedLec(otherLecs[0]);
          setShow(false)
        }}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>


    <Modal show={deleteLec !== undefined} onHide={() => setDeleteLec(undefined)}>
      <Modal.Header>
        <Modal.Title>Lecture Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{deleteLec?.name}を削除しますか？</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={_ => { setDeleteLec(undefined) }}>
          Cancel
        </Button>
        <Button variant="danger" onClick={_ => {
          setSelectedLecture({
            table: selectedLecture.table,
            others: selectedLecture.others.filter((lec) => lec.name !== deleteLec?.name || lec.category !== deleteLec?.category)
          });
          setDeleteLec(undefined);
        }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

const OtherCard = (
  lecture: Lecture,
  cardColor: CardColor,
  setDeleteLec: React.Dispatch<React.SetStateAction<Lecture | undefined>>
) => {
  return <>
    <Card
      className="p-0"
      style={{ backgroundColor: cardColor.getColor(lecture.category) }}
      onClick={_ => setDeleteLec(lecture)}
    >
      <Card.Body>
        <OverlayTrigger
          overlay={<Tooltip>{lecture.name}</Tooltip>}
        >
          <Card.Title className="text-truncate">
            {lecture.name}
          </Card.Title>
        </OverlayTrigger>
        <Card.Text className="m-0 text-truncate">
          credit: {lecture.credit}
        </Card.Text>
        <OverlayTrigger
          overlay={<Tooltip>{lecture.category}</Tooltip>}
        >
          <Card.Text className="m-0 text-truncate">
            {lecture.category}
          </Card.Text>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  </>
}
