import { View } from "dhx-optimus";
import { IAppState, Views } from "@root/types";
import { Tabbar } from "@lib/suite/suite";

import HospitalTable from "./HospitalTable/HospitalTable";
import DiagramView from "./DiagramView/DiagramView";
import RichTextView from "./RichTextView/RichTextView";

import "./DashboardView.scss";
import SpreadsheetView from "./SpreadsheetView/SpreadsheetView";

class DashboardView extends View<IAppState> {
	tabbar: Tabbar;

	init() {
		this.tabbar = new dhx.Tabbar(null, {
			tabWidth: 200,
			tabAlign: "center",
			activeTab: this.params.view,
			views: [
				{
					id: "patients",
					tab: "patients",
					css: "dhx-demo_tabbar--gray dhx-demo_hospital-table",
				},
				{
					id: "doctors",
					tab: "doctors",
					css: "dhx-demo_tabbar--gray",
				},
				{
					id: "certificate",
					tab: "medical certificate",
					css: "dhx-demo_tabbar--gray",
				},
				{
					id: "BMI",
					tab: "BMI data",
					css: "dhx-demo_tabbar--gray",
				},
			],
		});

		this.tabbar.events.on("change", (id: Views) => {
			this.fire("viewChanged", [id]);
		});

		return this.tabbar;
	}

	ready() {
		this.observe(
			state => state.view,
			(view: Views) => {
				this.showView(view);
			}
		);
	}

	showView(view: Views) {
		switch (view) {
			case "doctors":
				this.show(this.tabbar.getCell(view), DiagramView, { personal: this.params.personal });
				break;
			case "certificate":
				this.show(this.tabbar.getCell(view), RichTextView);
				break;
			case "BMI":
				this.show(this.tabbar.getCell(view), SpreadsheetView, { hospital: this.params.hospital });
				break;
			case "patients":
			default:
				this.show(this.tabbar.getCell(view), HospitalTable, { hospital: this.params.hospital });
				break;
		}
	}
}

export default DashboardView;
