import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IAppState } from "@root/types";

import "./CardsControlsView.scss";

class CardsControlsView extends View<IAppState> {
	form: Form;

	init() {
		this.form = new dhx.Form(null, {
			padding: "20px 40px",
			height: 80,
			align: "center",
			cols: [
				{
					type: "button",
					text: "Reset",
					size: "small",
					circle: true,
					view: "link",
					padding: "0 10px",
					name: "reset",
					full: true,
					css: "dhx-button",
				},
				{
					type: "button",
					text: "Save",
					size: "small",
					circle: true,
					padding: "0 10px",
					name: "save",
					full: true,
					css: "dhx-button",
				},
			],
		});

		this.form.events.on("click", (id: string) => {
			switch (id) {
				case "reset":
					this.fire("resetPitientCard", []);
					break;
				case "save":
					this.fire("savePatientCard", []);
					break;
				default:
					break;
			}
		});

		return this.form;
	}
}

export default CardsControlsView;
