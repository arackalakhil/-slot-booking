import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IAppState } from "@root/types";

class PersonalInfoView extends View<IAppState> {
	form: Form;

	private inputWidth = 240;

	init() {
		this.form = new dhx.Form(null, {
			padding: "20px 40px",
			height: 540,
			align: "between",
			cols: [
				{
					rows: [
						{
							type: "input",
							label: "Patient ID",
							placeholder: "Enter the patient ID",
							width: this.inputWidth,
							name: "patientId",
							required: true,
						},
						{
							type: "input",
							required: true,
							label: "Patient name",
							placeholder: "Enter the patient name",
							width: this.inputWidth,
							name: "patientName",
						},
						{
							type: "radioGroup",
							label: "Gender",
							width: this.inputWidth,
							options: {
								cols: [
									{
										text: "Male",
										value: "male",
									},
									{
										text: "Female",
										value: "female",
									},
									{
										text: "Other",
										value: "other",
									},
								],
							},
							name: "patientGender",
						},
						{
							type: "datepicker",
							required: true,
							label: "Admission",
							placeholder: "Select admission date",
							width: this.inputWidth,
							dateFormat: "%d/%m/%Y",
							name: "admission",
						},
						{
							type: "datepicker",
							label: "Date of birth",
							placeholder: "Select date",
							width: this.inputWidth,
							dateFormat: "%d/%m/%Y",
							name: "patientDateBrith",
							required: true,
						},
					],
				},
				{
					rows: [
						{
							type: "select",
							label: "Care required",
							width: this.inputWidth,
							options: [
								{
									value: "Take samples",
									content: "Take samples",
								},
								{
									value: "Give medications",
									content: "Give medications",
								},
								{
									value: "Prep for surgery",
									content: "Prep for surgery",
								},
								{
									value: "Post-operation care",
									content: "Post-operation care",
								},
							],
							name: "careRequired",
						},
						{
							type: "input",
							required: true,
							label: "Height (m)",
							placeholder: "Enter height",
							width: this.inputWidth,
							name: "patientHeight",
						},
						{
							type: "input",
							required: true,
							label: "Weight (kg)",
							placeholder: "Enter weight",
							width: this.inputWidth,
							name: "patientWeight",
						},
						{
							type: "input",
							required: true,
							label: "Body temperature (°C)",
							placeholder: "Enter the body temperature",
							width: this.inputWidth,
							name: "patientTemperature",
						},
						{
							type: "input",
							required: true,
							inputType: "string",
							label: "Blood pressure (mm HG)",
							placeholder: "Enter the blood pressure",
							width: this.inputWidth,
							name: "bloodPressure",
						},
						{
							type: "select",
							label: "Diagnosis",
							width: this.inputWidth,
							options: [
								{
									value: "Unspecified",
									content: "Unspecified",
								},
								{
									value: "Pneumonia",
									content: "Pneumonia",
								},
								{
									value: "Flu",
									content: "Flu",
								},
								{
									value: "Meningitis",
									content: "Meningitis",
								},
								{
									value: "Sinusitis",
									content: "Sinusitis",
								},
								{
									value: "Bronchitis",
									content: "Bronchitis",
								},
							],
							name: "diagnosis",
						},
						{
							type: "input",
							label: "Chronic conditions",
							placeholder: "Enter the chronic conditions",
							width: this.inputWidth,
							name: "patientChronicCondition",
						},
					],
				},
				{
					rows: [
						{
							type: "select",
							label: "Blood group",
							width: this.inputWidth,
							options: [
								{
									value: "A+",
									content: "A+",
								},
								{
									value: "A-",
									content: "A-",
								},
								{
									value: "B+",
									content: "B+",
								},
								{
									value: "B-",
									content: "B-",
								},
								{
									value: "O+",
									content: "O+",
								},
								{
									value: "O-",
									content: "O-",
								},
								{
									value: "AB+",
									content: "AB+",
								},
								{
									value: "AB-",
									content: "AB-",
								},
							],
							name: "patientBloodGroup",
						},
						{
							type: "input",
							label: "Allergies",
							placeholder: "Enter the allergies",
							width: this.inputWidth,
							name: "patientAllergies",
						},
						{
							type: "select",
							label: "Employment status",
							width: this.inputWidth,
							options: [
								{
									value: "worker",
									content: "worker",
								},
								{
									value: "employee",
									content: "employee",
								},
								{
									value: "self-employed",
									content: "self-employed",
								},
								{
									value: "contractor",
									content: "contractor",
								},
								{
									value: "director",
									content: "director",
								},
								{
									value: "office holder",
									content: "office holder",
								},
							],
							name: "patientEmploymentStatus",
						},
						{
							type: "input",
							label: "Employer",
							placeholder: "Enter the employer",
							width: this.inputWidth,
							name: "patientEmployer",
						},
						{
							type: "input",
							label: "Occupation",
							placeholder: "Enter the occupation",
							width: this.inputWidth,
							patient: "Occupation",
							name: "patientOccupation",
						},
						{
							type: "input",
							label: "Religion",
							placeholder: "Enter the religion",
							width: this.inputWidth,
							name: "patientReligion",
						},
						{
							type: "input",
							label: "Nationality",
							placeholder: "Enter the nationality",
							width: this.inputWidth,
							name: "patientNationality",
						},
					],
				},
			],
		});

		return this.form;
	}
}

export default PersonalInfoView;
