import { View } from "dhx-optimus";
import { IAppState } from "@root/types";
import { Toolbar } from "@lib/suite/suite";

import "./ToolbarView.scss";

const data = [
	{
		type: "customHTML",
		html: `
			<a class="dhx-demo_toolbar__logo" href='https://dhtmlx.com/docs/products/dhtmlxSuite/' target='_blank'>
				<img src='./assets/images/logo.svg' alt='DHTMLX - Hospital management'/>
				<span>Hospital Management System</span>
			</a>
		`,
	},
	{
		id: "addPatient",
		type: "button",
		value: "Add a patient",
		circle: true,
		size: "small",
		icon: "dxi dxi-plus",
		css: "dhx-demo_toolbar__button",
	},
	{
		type: "spacer",
	},
	{
		id: "notifications",
		type: "button",
		icon: "mdi mdi-bell-ring-outline",
		view: "link",
		circle: true,
		css: "dhx-demo_toolbar__icon",
		tooltip: "Notifications",
	},
	{
		id: "employeeId",
		type: "imageButton",
		src: "./assets/images/staff/big-avatar-1.jpg",
		tooltip: "Employee name",
		css: "dhx-demo_toolbar__image_button",
	},
];

class ToolbarView extends View<IAppState> {
	toolbar: Toolbar;

	init() {
		this.toolbar = new dhx.Toolbar(null, {
			height: 54,
			css: "dhx-demo_toolbar",
			data,
		});

		this.toolbar.events.on("click", (id: string) => {
			switch (id) {
				case "addPatient":
					this.fire("openPaientCard", [""]);
					break;
				case "notifications":
					this.fire("clearNotifications", []);
					break;
				default:
					break;
			}
		});

		return this.toolbar;
	}

	ready() {
		this.observe(
			state => state.notificationsCount,
			count => {
				this.toolbar.data.update("notifications", { count });
			}
		);
	}
}

export default ToolbarView;
