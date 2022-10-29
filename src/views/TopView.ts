import { View } from "dhx-optimus";

import { IAppState } from "@root/types";
import { Layout } from "@lib/suite/suite";

import ToolbarView from "./ToolbarView/ToolbarView";
import SidebarView from "./SidebarView/SidebarView";
import DashboardView from "./DashboardView/DashboardView";
import PatientCardView from "./PatientCardView/PatientCardView";

class TopView extends View<IAppState> {
	layout: Layout;

	init() {
		this.layout = new dhx.Layout(null, {
			rows: [
				{
					id: "toolbar",
					height: "content",
					init: cell => this.show(cell, ToolbarView),
				},
				{
					cols: [
						{
							id: "sidebar",
							width: "content",
							init: cell =>
								this.show(cell, SidebarView, {
									personal: this.params.personal,
									hospital: this.params.hospital,
									unsortedData: this.params.unsortedData,
								}),
						},
						{
							id: "dashboard",
							css: "dhx-demo_dashboard",
							init: cell =>
								this.show(cell, DashboardView, {
									view: this.params.view,
									personal: this.params.personal,
									hospital: this.params.hospital,
								}),
						},
					],
				},
			],
		});

		this.show(null, PatientCardView, { personal: this.params.personal, hospital: this.params.hospital });

		return this.layout;
	}
}

export default TopView;
