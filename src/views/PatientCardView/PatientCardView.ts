import { View } from "dhx-optimus";
import { Layout, Window } from "@lib/suite/suite";
import { emptyPatientCard } from "@data/empyData";
import { IAppState, IPatientData } from "@root/types";

import DetailsView from "./DetailsView/DetailsView";
import EmergencyContactView from "./EmergencyContactView/EmergencyContactView";
import InsuranceView from "./InsuranceView/InsuranceView";
import PersonalInfoView from "./PersonalInfoView/PersonalInfoView";
import PatientLocationView from "./PatientLocationView/PatientLocationView";
import CardsControlsView from "./CardControlsView/CardsControlsView";

import "./PatientCardView.scss";

class PatientCardView extends View<IAppState> {
	window: Window;

	layout: Layout;

	private width = 880;

	private height = window.innerHeight < 1400 ? window.innerHeight - 40 : 1400;

	private roomId: string;

	init() {
		this.layout = new dhx.Layout(null, {
			css: "patient-card__layout",
			rows: [
				{
					id: "personal",
					header: "Personal Information",
					collapsable: true,
					height: "content",
					init: cell => this.show(cell, PersonalInfoView),
				},
				{
					id: "details",
					header: "Communication Details",
					collapsable: true,
					height: "content",
					init: cell => this.show(cell, DetailsView),
				},
				{
					id: "emergency",
					header: "Emergency Contact",
					collapsable: true,
					height: "content",
					init: cell => this.show(cell, EmergencyContactView),
				},
				{
					id: "insurance",
					header: "Insurance Information",
					collapsable: true,
					height: "content",
					init: cell => this.show(cell, InsuranceView),
				},
				{
					id: "location",
					header: "Patient Allocation",
					collapsable: true,
					height: "content",
					init: cell => this.show(cell, PatientLocationView, { personal: this.params.personal }),
				},
				{
					type: "spacer",
				},
				{
					id: "controls",
					height: "content",
					align: "center",
					init: cell => this.show(cell, CardsControlsView),
				},
			],
		});

		this.window = new dhx.Window({
			css: "patient-card__window",
			closable: true,
			modal: true,
			width: this.width,
			height: this.height,
		});

		this.window.events.on("beforeHide", () => this.fire("closePaientCard", []));

		this.window.attach(this.layout);

		return this.window;
	}

	ready() {
		this.observe(
			state => state.patientCard,
			({ open, id }) => {
				this.roomId = id;
				if (open) {
					this.openWindow();
				} else {
					this.clearFormValue();
				}
			}
		);

		this.on("resetPitientCard", () => {
			if (this.roomId) {
				this.setFormValue(this.params.hospital.getItem(this.roomId));
			} else {
				this.clearFormValue();
			}
		});

		this.on("savePatientCard", () => {
			if (this.validateFormValue()) {
				this.updateData(this.roomId, this.getFormValue());
				this.window.hide();
			} else {
				dhx.message({
					text: "Enter required data",
					expire: 3000,
					css: "dhx_message--error",
				});
			}
		});

		this.on("clearPatientData", (id: string) => {
			this.updateData(id);
		});
	}

	setFormValue(data: IPatientData) {
		this.layout.forEach(item => {
			if (item && item.config.type !== "spacer") {
				switch (item.id) {
					case "location":
						item.getWidget().setValue({
							doctor: data.doctor === "-" ? "" : data.doctor,
							room: data.room,
							bedNumber: data.bedNumber.replace("Bed", "").trim(),
						});
						break;
					case "personal":
						item.getWidget().setValue({
							patientAllergies: data.patientAllergies,
							patientBloodGroup: data.patientBloodGroup,
							patientChronicCondition: data.patientChronicCondition,
							patientDateBrith: data.patientDateBrith === "-" ? "" : data.patientDateBrith,
							patientEmployer: data.patientEmployer,
							patientEmploymentStatus: data.patientEmploymentStatus,
							patientGender: data.patientGender,
							patientId: data.patientId,
							patientNationality: data.patientNationality,
							patientOccupation: data.patientOccupation,
							patientReligion: data.patientReligion,
							admission: data.admission === "-" ? "" : data.admission,
							patientName: data.patientName === "-" ? "" : data.patientName,
							diagnosis: data.diagnosis,
							patientTemperature:
								data.patientTemperature === "-" ? "" : data.patientTemperature,
							bloodPressure: data.bloodPressure === "-" ? "" : data.bloodPressure,
							careRequired: data.careRequired,
						});
						break;
					case "details":
						item.getWidget().setValue({
							adress: data.adress,
							city: data.city,
							country: data.country,
							email: data.email,
							firstContactNumber: data.firstContactNumber,
							secondContactNumber: data.secondContactNumber,
						});
						break;
					case "emergency":
						item.getWidget().setValue({
							emergencyContactCity: data.emergencyContactCity,
							emergencyContactCountry: data.emergencyContactCountry,
							emergencyContactName: data.emergencyContactName,
							emergencyFirstContactNumber: data.emergencyFirstContactNumber,
							emergencySecondContactNumber: data.emergencySecondContactNumber,
							relationship: data.relationship,
						});
						break;
					case "insurance":
						item.getWidget().setValue({
							insuranceType: data.insuranceType,
							planNumber: data.planNumber,
							policyHolderDate: data.policyHolderDate === "-" ? "" : data.policyHolderDate,
							policyHolderName: data.policyHolderName,
							policyHolderRelationship: data.policyHolderRelationship,
							policyIdNumber: data.policyIdNumber,
						});
						break;
					default:
						break;
				}
				item.getWidget().clear("validation");
			}
		});
	}

	getFormValue() {
		const patientData = { parent: "", room: "", bedNumber: "", id: "", status: "occupied" };

		this.layout.forEach(item => {
			if (item && item.config.type !== "spacer") {
				Object.assign(patientData, ...item.getWidget().getValue());

				patientData.parent = `room_${patientData.room}`;
				if (!patientData.bedNumber.includes("Bed")) {
					patientData.bedNumber = `Bed ${patientData.bedNumber}`;
				}
				patientData.id = `${patientData.room}.${patientData.bedNumber.replace("Bed", "").trim()}`;
			}
		});

		return patientData;
	}

	clearFormValue() {
		this.layout.forEach(item => {
			if (item && item.config.type !== "spacer") {
				item.getWidget().clear();
			}
		});
	}

	validateFormValue() {
		let validate = true;
		this.layout.forEach(item => {
			if (!validate) return;
			if (item && item.config.type !== "spacer") {
				validate = item.getWidget().validate();
			}
		});
		return validate;
	}

	updateData(id: string, data?: any) {
		if (!data || id !== data.id) {
			this.params.hospital.update(id, emptyPatientCard);
		}
		if (data || !id) {
			this.params.hospital.update(data.id, data);
		}
	}

	openWindow() {
		if (this.roomId) {
			this.setFormValue(this.params.hospital.getItem(this.roomId));
		}
		this.window.show();
	}
}

export default PatientCardView;
