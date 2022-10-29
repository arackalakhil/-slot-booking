import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IAppState } from "@root/types";

class DetailsView extends View<IAppState> {
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
							label: "Address",
							placeholder: "Enter the address",
							width: this.inputWidth,
							name: "adress",
						},
						{
							type: "input",
							label: "Country",
							placeholder: "Enter the country",
							width: this.inputWidth,
							name: "country",
						},
					],
				},
				{
					rows: [
						{
							type: "input",
							label: "City",
							placeholder: "Enter the city",
							width: this.inputWidth,
							name: "city",
						},
						{
							type: "input",
							label: "Email",
							placeholder: "Enter the email",
							width: this.inputWidth,
							name: "email",
						},
					],
				},
				{
					rows: [
						{
							type: "input",
							label: "Contact No. 1",
							placeholder: "Enter the first contact No.",
							width: this.inputWidth,
							name: "firstContactNumber",
						},
						{
							type: "input",
							label: "Contact No. 2",
							placeholder: "Enter the second contact No.",
							width: this.inputWidth,
							name: "secondContactNumber",
						},
					],
				},
			],
		});

		return this.form;
	}
}

export default DetailsView;
