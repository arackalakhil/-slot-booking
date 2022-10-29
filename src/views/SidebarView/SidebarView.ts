import { View } from "dhx-optimus";
import { Layout } from "@lib/suite/suite";
import { IAppState, Views } from "@root/types";

import HospitalFilter from "./Filters/HospitalFilter";
import PersonalFilter from "./Filters/PersonalFilter";
import HospitalInfo from "./HospitalInfo/HospitalInfo";

import "./SidebarView.scss";

class SidebarView extends View<IAppState> {
	layout: Layout;

	init() {
		this.layout = new dhx.Layout(null, {
			rows: [
				{
					id: "filter",
					height: "content",
				},
				{
					id: "hospitalInfo",
					css: "dhx-demo_sidebar__info",
					init: cell =>
						this.show(cell, HospitalInfo, {
							hospital: this.params.hospital,
							doctorsLength: this.params.personal.getLength(),
							unsortedData: this.params.unsortedData,
						}),
				},
			],
		});
		return this.layout;
	}

	ready() {
		this.observe(
			state => state.view,
			(view: Views) => {
				if (view) {
					this.showFilter(view);
				}
			}
		);
	}

	showFilter(view: Views): void {
		switch (view) {
			case "doctors":
			case "certificate":
				this.show(this.layout.getCell("filter"), PersonalFilter, { personal: this.params.personal });
				break;
			case "patients":
			default:
				this.show(this.layout.getCell("filter"), HospitalFilter, {
					hospital: this.params.unsortedData,
				});
				break;
		}
	}
}

export default SidebarView;
