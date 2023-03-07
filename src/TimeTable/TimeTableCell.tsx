import React from "react";
import Form from "react-bootstrap/Form";
import { Lecture } from "./Lecture"

type TimeTableCellProps = {
	lectures: Lecture[];
}

export class TimeTableCell extends React.Component {
	props: TimeTableCellProps;
	constructor(props: TimeTableCellProps) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<div style={{
				height: "80px",
			}}>
				<Form.Select>
					{
						this.props.lectures.map((item, _) => {
							return (
								<option>{item.name}</option>
							)
						})
					}
				</Form.Select>
			</div>
		)
	}
}