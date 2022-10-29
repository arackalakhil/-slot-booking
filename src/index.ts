import { App } from "dhx-optimus";
import Store from "dhx-optimus-store";

import personalData from "@data/personaData";
import hospitalData from "@data/hospitalData";
import { DataCollection, TreeGridCollection } from "@lib/suite/suite";
import { Views, IAppState, IAppFilter, IPatientData } from "@root/types";

import { getLocationParams } from "./utils/urlParams";
import HistoryManager from "./utils/HistoryManager";
import TopView from "./views/TopView";

import "./assets/scss/index.scss";

const locationParams = getLocationParams(window.location);

const initialState: IAppState = {
	view: locationParams.view || "patients",
	patientCard: {
		open: false,
		id: "",
	},
	filter: {
		status: {
			available: true,
			occupied: true,
		},
		careRequired: {
			takeSamples: true,
			giveMedications: true,
			prepForSurgey: true,
			postOperationCare: true,
		},
		diagnosis: "All diagnosis",
		admission: "",
		room: "All rooms",
	},
	selectedPersonalId: "",
	notificationsCount: 0,
};

export class HospitalApp extends App<IAppState> {
	state: IAppState;

	store: Store<IAppState>;

	personal: DataCollection;

	hospital: TreeGridCollection;

	init() {
		this.store = new Store<IAppState>(initialState);
		this.params.store = this.store;
		this.state = this.store.getState();
		dhx.scrollViewConfig.enable = true;

		this.personal = new dhx.DataCollection();
		this.personal.parse(personalData);

		this.hospital = new dhx.TreeGridCollection();
		this.hospital.parse(hospitalData);
		this.applyFiltration(this.state.filter);

		this.show(null, TopView, {
			view: this.state.view,
			personal: this.personal,
			hospital: this.hospital,
			unsortedData: hospitalData,
		});
		this.use(HistoryManager);

		setInterval(() => {
			this.state.notificationsCount += 1;
		}, Math.round(1000 - 0.5 + Math.random() * (20000 - 1000 + 1)));

		this.on("clearNotifications", () => {
			this.state.notificationsCount = 0;
		});

		this.on("viewChanged", (newView: Views) => {
			this.state.view = newView;
		});

		this.on("openPaientCard", (id: string) => {
			this.state.patientCard = {
				open: true,
				id,
			};
		});

		this.on("closePaientCard", () => {
			this.state.patientCard = {
				open: false,
				id: "",
			};
		});

		this.on("selectPersonalId", (id: string) => {
			this.state.selectedPersonalId = id;
		});

		this.on("filterChanged", (state: IAppFilter) => {
			this.state.filter = state;
			this.applyFiltration(state);
		});
	}

	applyFiltration(state: IAppFilter): void {
		this.hospital.filter();

		this.hospital.filter((item: IPatientData) => {
			return (
				((item.status === "available" && state.status.available) ||
					(item.status === "occupied" &&
						state.status.occupied &&
						((item.careRequired === "Give medications" && state.careRequired.giveMedications) ||
							(item.careRequired === "Take samples" && state.careRequired.takeSamples) ||
							(item.careRequired === "Prep for surgery" && state.careRequired.prepForSurgey) ||
							(item.careRequired === "Post-operation care" &&
								state.careRequired.postOperationCare)) &&
						(state.diagnosis === "All diagnosis" ||
							state.diagnosis === "" ||
							state.diagnosis === item.diagnosis) &&
						(!state.admission?.length || state.admission === item.admission))) &&
				(state.room === "All rooms" || state.room === "" || state.room === item.room)
			);
		});
	}
}
