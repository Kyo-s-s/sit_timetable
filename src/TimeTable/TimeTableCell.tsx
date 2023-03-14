import React from "react";
import { Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Modal from "react-bootstrap/esm/Modal";
import Tooltip from "react-bootstrap/esm/Tooltip";
import { Lecture, Week, Period, weekToStr, lectureNone } from "./Lecture";
import { CardColor } from "./CardColor";

type Props = {
	nowSelect: Lecture,
	week: Week,
	period: Period,
	lectures: Lecture[];
	cardColor: CardColor;
	onSelect: (lecture: Lecture) => void;
}

export const TimeTableCell = (props: Props) => {
	const [selectedLecture, setSelectedLecture] = React.useState(props.lectures[0]);
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Card className = "p-0" onClick={handleShow} style={{ backgroundColor: props.cardColor.getColor(props.nowSelect.category) }}>
				<Card.Body>
          {
            props.nowSelect.name === lectureNone.name ?
              <Card.Title className="text-truncate">
                {props.nowSelect.name}
              </Card.Title> :
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    {props.nowSelect.name}
                  </Tooltip>
                }
              >
                <Card.Title className="text-truncate">
                  {props.nowSelect.name}
                </Card.Title>
              </OverlayTrigger>
          }
					<Card.Text className="m-0 text-truncate">
            credit: {props.nowSelect.credit}
          </Card.Text>
          {
            props.nowSelect.category === lectureNone.category ? 
              <Card.Text className="m-0 text-truncate">category</Card.Text> :
              <OverlayTrigger
                overlay = {
                  <Tooltip>
                    {props.nowSelect.category}
                  </Tooltip>
                }
              >
                <Card.Text className="m-0 text-truncate">{props.nowSelect.category}</Card.Text>
              </OverlayTrigger>
          }
				</Card.Body>
			</Card>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{weekToStr(props.week) + " Period " + props.period}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Select onChange={e => {
						setSelectedLecture(props.lectures.find((lecture) => { return lecture.name === e.target.value })!);
					}}>
						<option>{props.nowSelect.name}</option>
						{
							props.lectures.map((lecture, _) => {
								if (lecture.name === props.nowSelect.name) {
									return;
								}
								return (
									<option>{lecture.name}</option>
								)
							})
						}
					</Form.Select>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick = {() => {
						props.onSelect(selectedLecture);
						handleClose();
					}}>
						Done
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
} 
