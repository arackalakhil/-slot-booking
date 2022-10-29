import { View } from "dhx-optimus";
import { TreeGrid } from "@lib/suite/suite";
import { IRow } from "@root/lib/suite/types/ts-grid";
import { IAppState, RowButton } from "@root/types";

import "./HospitalTable.scss";

class HospitalTable extends View<IAppState> {
	treeGrid: TreeGrid;

	init() {
		this.treeGrid = new dhx.TreeGrid(null, {
			columns: [
				{
					id: "bedNumber",
					header: [{ text: "Bed number" }],
					align: "left",
					minWidth: 160,
				},
				{
					id: "status",
					header: [{ text: "Status" }],
					align: "center",
					minWidth: 160,
					mark: () => "dhx-demo_cell-template",
					template: (value: string) => {
						if (!value) return;
						let css = "dhx-demo_status-template";
						switch (value) {
							case "available":
								css += "--available";
								break;
							case "occupied":
							default:
								css += "--occupied";
								break;
						}
						return `
							<div class = "dhx-demo_status-wrapper">
								<div class="dhx-demo_status-template">
									<span class="${css}">${value}</span>
								</div>
							</div>
						`;
					},
					htmlEnable: true,
					options: ["available", "occupied"],
					editorType: "select",
				},
				{
					id: "patientName",
					header: [{ text: "Patient name" }],
					align: "left",
					minWidth: 170,
				},
				{
					id: "diagnosis",
					header: [{ text: "Diagnosis" }],
					align: "left",
					minWidth: 170,
				},
				{
					id: "patientHeight",
					header: [{ text: "Height (m)" }],
					align: "left",
					minWidth: 160,
				},
				{
					id: "patientWeight",
					header: [{ text: "Weight (kg)" }],
					align: "left",
					minWidth: 160,
				},
				{
					id: "patientTemperature",
					header: [{ text: "Body temperature (°C)" }],
					align: "left",
					minWidth: 160,
				},
				{
					id: "bloodPressure",
					header: [{ text: "Blood pressure (mm HG)" }],
					align: "left",
					minWidth: 170,
				},
				{
					id: "careRequired",
					header: [{ text: "Care required" }],
					align: "left",
					minWidth: 170,
				},
				{
					id: "doctor",
					header: [{ text: "Doctor assigned" }],
					align: "left",
					minWidth: 170,
				},
				{
					id: "admission",
					header: [{ text: "Admission" }],
					align: "left",
					minWidth: 160,
				},
				{
					id: "controls",
					header: [{ text: "Controls" }],
					align: "center",
					minWidth: 170,
					mark: () => "dhx-demo_cell-template",
					template: (value: RowButton[]) => {
						if (!value) return;
						const controls = value.map((item: RowButton) => {
							const icon = item === "edit" ? "mdi mdi-pencil" : "mdi mdi-delete-forever";
							return `
								<button class="dhx-demo_controls-template__button ${item}">
									<i class="${icon} dhx-demo_controls-template__icon"></i>
								</button>
							`;
						});
						return `
							<div class="dhx-demo_controls-template dhx-demo_control--${value}">
								${controls.join("")}
							</div>
						`;
					},
					htmlEnable: true,
				},
			],
			eventHandlers: {
				onclick: {
					clear: (_event: MouseEvent, { row }: IRow) => {
						this.fire("clearPatientData", [row.id]);
					},
					edit: (_event: MouseEvent, { row }: IRow) => {
						this.fire("openPaientCard", [row.id]);
					},
				},
			},
			data: this.params.hospital,
		});

		return this.treeGrid;
	}
}

export default HospitalTable;
