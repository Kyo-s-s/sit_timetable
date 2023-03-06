import React from "react";
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
			<div style = {{
				width: "150px",
				height: "100px",
				backgroundColor: "gray",
			}}>
				<select style = {{
					width: "100%",
					margin: "20px 0px",
					fontSize: "15px",
				}}>
					{
						this.props.lectures.map((item, _) => {
							return (
								<option>{item.name}</option>
							)
						})
					}
				</select>
			</div>
		)
	}
}