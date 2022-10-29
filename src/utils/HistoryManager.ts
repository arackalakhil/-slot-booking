import { Component } from "dhx-optimus";
import { createBrowserHistory } from "history";
import { getLocationParams } from "./urlParams";
import { IAppState } from "../types";

const history = createBrowserHistory();

export default class HistoryManager extends Component<IAppState> {
	init() {
		history.listen((location, action) => {
			if (action === "POP") {
				const locationParams = getLocationParams(location);
				this.fire("viewChanged", [locationParams.view]);
			}
		});

		this.observe(
			state => state.view,
			view => {
				if (getLocationParams(history.location).view !== view) {
					history.push(`#${view}`);
				}
			}
		);
	}
}
