import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IAppState, IPersonalCard } from "@root/types";

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
					label: "Name",
					labelPosition: "top",
					placeholder: "Type or select name",
					data: this.params.personal.map(({ name, id }: IPersonalCard) => {
						return { value: name, id };
					}),
					name: "name",
				},
				{
					type: "combo",
					label: "Phone",
					labelPosition: "top",
					placeholder: "Type or select phone",
					data: this.params.personal.map(({ phone, id }: IPersonalCard) => {
						return { value: phone, id };
					}),
					name: "phone",
				},
				{
					type: "combo",
					label: "Mail",
					labelPosition: "top",
					placeholder: "Type or select mail",
					data: this.params.personal.map(({ mail, id }: IPersonalCard) => {
						return { value: mail, id };
					}),
					name: "mail",
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

		this.form.events.on("change", (_id: string, value: string) => {
			this.form.setValue({ name: value, phone: value, mail: value });
		});

		this.form.events.on("click", () => {
			this.fire("selectPersonalId", [this.form.getValue().name]);
		});

		this.form.forEach((item: any) => {
			if (item.config.type === "combo") {
				item.getWidget().events.on("beforeOpen", () => item.clear());
			}
		});

		return this.form;
	}

	ready() {
		this.observe(
			state => state.selectedPersonalId,
			(id: string) => {
				if (id) {
					this.form.setValue({ name: id, phone: id, mail: id });
				} else {
					this.form.clear();
				}
			}
		);
	}
}

export default HospitalFilter;
