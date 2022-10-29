import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IOption } from "@root/lib/suite/types/ts-form";
import { IAppState, IPersonalCard } from "@root/types";

class PatientLocationView extends View<IAppState> {
	form: Form;

	private inputWidth = 240;

	init() {
		this.form = new dhx.Form(null, {
			padding: "20px 40px",
			height: 120,
			align: "between",
			cols: [
				{
					type: "combo",
					required: true,
					label: "Doctor",
					width: this.inputWidth,
					placeholder: "Select the doctor",
					data: this.params.personal.map(({ name, id }: IPersonalCard) => {
						return { value: name, id };
					}),
					name: "doctor",
				},
				{
					type: "select",
					label: "Room",
					width: this.inputWidth,
					options: [
						{
							value: "",
							content: "",
						},
					],
					name: "room",
				},
				{
					type: "select",
					label: "Bed",
					width: this.inputWidth,
					options: [
						{
							value: "",
							content: "",
						},
					],
					name: "bedNumber",
				},
			],
		});

		this.form.getItem("room").setOptions(this.getOptionCount(10));
		this.form.getItem("bedNumber").setOptions(this.getOptionCount(4));

		this.form
			.getItem("doctor")
			.getWidget()
			.events.on("beforeOpen", () => {
				this.form.getItem("doctor").clear();
			});

		return this.form;
	}

	getOptionCount(count: number): IOption[] {
		const options: IOption[] = [];
		for (let index = 1; index <= count; index++) {
			options.push({
				value: index.toString(),
				content: index.toString(),
			});
		}

		return options;
	}
}

export default PatientLocationView;
