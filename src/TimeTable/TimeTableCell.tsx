import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Modal from "react-bootstrap/esm/Modal";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ModalDialog from "react-bootstrap/esm/ModalDialog";
import { Lecture, Week, Period, weekToStr } from "./Lecture";

type Props = {
	nowSelect: Lecture,
	week: Week,
	period: Period,
	lectures: Lecture[];
	onSelect: (lecture: Lecture) => void;
}

export const TimeTableCell = (props: Props) => {
	const [selectedLecture, setSelectedLecture] = React.useState(props.lectures[0]);
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Card onClick={handleShow}>
				<Card.Body>
					<Card.Title>
						{props.nowSelect.name}
					</Card.Title>
					<Card.Text>
						<p style={{margin: "0pt"}}>credit: {props.nowSelect.credit}</p>
						<p style={{margin: "0pt"}}>category: {props.nowSelect.category}</p>
					</Card.Text>
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
