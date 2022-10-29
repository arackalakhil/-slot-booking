import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IAppState } from "@root/types";

class EmergencyContactView extends View<IAppState> {
	form: Form;

	private inputWidth = 240;

	init() {
		this.form = new dhx.Form(null, {
			padding: "20px 40px",
			height: 190,
			align: "between",
			cols: [
				{
					rows: [
						{
							type: "input",
							label: "Name",
							placeholder: "Enter the name",
							width: this.inputWidth,
							name: "emergencyContactName",
						},
						{
							type: "input",
							label: "Relationship",
							placeholder: "Enter the relationship",
							width: this.inputWidth,
							name: "relationship",
						},
					],
				},
				{
					rows: [
						{
							type: "input",
							label: "Contact No.",
							placeholder: "Enter the contact No.",
							width: this.inputWidth,
							name: "emergencyFirstContactNumber",
						},
						{
							type: "input",
							label: "Address",
							placeholder: "Enter the address",
							width: this.inputWidth,
							name: "emergencySecondContactNumber",
						},
					],
				},
				{
					rows: [
						{
							type: "input",
							label: "Country",
							placeholder: "Enter the country",
							width: this.inputWidth,
							name: "emergencyContactCountry",
						},
						{
							type: "input",
							label: "City",
							placeholder: "Enter the city",
							width: this.inputWidth,
							name: "emergencyContactCity",
						},
					],
				},
			],
		});

		return this.form;
	}
}

export default EmergencyContactView;
