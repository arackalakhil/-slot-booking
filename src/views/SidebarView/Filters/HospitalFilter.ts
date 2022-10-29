import { View } from "dhx-optimus";
import { DataCollection, Form } from "@lib/suite/suite";
import { IAppCareRequired, IAppState, IAppStatus, IRoomData } from "@root/types";

class HospitalFilter extends View<IAppState> {
	form: Form;

	init() {
		this.form = new dhx.Form(null, {
			css: "dhx_widget--bordered",
			padding: 20,
			width: 240,
			height: 550,
			rows: [
				{
					type: "combo",
					label: "Room",
					labelPosition: "top",
					placeholder: "All rooms",
					data: this.getComboData(this.params.hospital, "room"),
					name: "room",
				},
				{
					type: "checkboxGroup",
					label: "Status",
					options: {
						cols: [
							{
								text: "Available",
								id: "available",
							},
							{
								text: "Оccupied",
								id: "occupied",
							},
						],
					},
					name: "status",
				},
				{
					type: "checkboxGroup",
					label: "Care required",
					options: {
						rows: [
							{
								text: "Take samples",
								id: "takeSamples",
							},
							{
								text: "Give medications",
								id: "giveMedications",
							},
							{
								text: "Prep for surgery",
								id: "prepForSurgey",
							},
							{
								text: "Post-operation care",
								id: "postOperationCare",
							},
						],
					},
					name: "careRequired",
				},
				{
					type: "combo",
					label: "Diagnosis",
					labelPosition: "top",
					placeholder: "All diagnosis",
					data: this.getComboData(this.params.hospital, "diagnosis"),
					name: "diagnosis",
				},
				{
					type: "datepicker",
					label: "Admission",
					labelPosition: "top",
					placeholder: "All dates",
					editable: true,
					name: "admission",
				},
				{
					type: "spacer",
				},
				{
					type: "button",
					circle: true,
					full: true,
					size: "small",
					value: "Search",
				},
			],
		});

		this.form.forEach((item: any) => {
			if (item.config.type === "combo") {
				item.getWidget().events.on("beforeOpen", () => item.clear());
			}
		});

		this.form.events.on("click", () => {
			this.fire("filterChanged", [this.form.getValue()]);
		});

		return this.form;
	}

	ready() {
		this.observe(
			state => state.filter.diagnosis,
			(diagnosis: string) => this.form.setValue({ diagnosis })
		);

		this.observe(
			state => state.filter.admission,
			(admission: string) => this.form.setValue({ admission })
		);

		this.observe(
			state => state.filter.room,
			(room: string) => this.form.setValue({ room })
		);

		this.observe(
			state => state.filter.status,
			(currentState: IAppStatus) => {
				const { available, occupied } = this.form.getItem("status").getValue();
				if (currentState.available !== available) {
					this.form.setValue({ status: { available: currentState.available } });
				}
				if (currentState.occupied !== occupied) {
					this.form.setValue({ status: { occupied: currentState.occupied } });
				}
			}
		);

		this.observe(
			state => state.filter.careRequired,
			(currentState: IAppCareRequired) => {
				const { takeSamples, giveMedications, prepForSurgey, postOperationCare } = this.form
					.getItem("careRequired")
					.getValue();
				if (currentState.takeSamples !== takeSamples) {
					this.form.setValue({ careRequired: { takeSamples: currentState.takeSamples } });
				}
				if (currentState.giveMedications !== giveMedications) {
					this.form.setValue({ careRequired: { giveMedications: currentState.giveMedications } });
				}
				if (currentState.prepForSurgey !== prepForSurgey) {
					this.form.setValue({ careRequired: { prepForSurgey: currentState.prepForSurgey } });
				}
				if (currentState.postOperationCare !== postOperationCare) {
					this.form.setValue({
						careRequired: { postOperationCare: currentState.postOperationCare },
					});
				}
			}
		);
	}

	getComboData(data: DataCollection, targetProperty: string): IRoomData[] {
		const uniqueProperties: string[] = [];
		const defaultValue =
			targetProperty === "diagnosis" ? `All ${targetProperty}` : `All ${targetProperty}s`;
		const comboData: IRoomData[] = [{ value: defaultValue, id: defaultValue }];

		data.forEach(item => {
			if (item[targetProperty] && !uniqueProperties.includes(item[targetProperty])) {
				uniqueProperties.push(item[targetProperty]);
			}
		});

		uniqueProperties.forEach(item => {
			if (item !== "-") {
				comboData.push({ value: item, id: item });
			}
		});

		return comboData;
	}
}

export default HospitalFilter;
