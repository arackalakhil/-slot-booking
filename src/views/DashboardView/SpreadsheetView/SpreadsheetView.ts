import { View } from "dhx-optimus";
import { IAppState } from "@root/types";
import { Spreadsheet } from "@root/lib/spreadsheet/spreadsheet";
import { ICellInfo } from "@root/lib/spreadsheet/types/ts-spreadsheet/sources/types";
import { TreeCollection } from "@root/lib/suite/suite";

const patientMap: { [key: string]: string } = {
	patientName: "A",
	patientBloodGroup: "B",
	patientHeight: "C",
	patientWeight: "D",
	bloodPressure: "E",
	patientId: "F",
	patientAllergies: "G",
	patientChronicCondition: "H",
	patientDateBrith: "I",
	patientEmployer: "J",
	patientOccupation: "K",
	patientReligion: "L",
	patientNationality: "M",
	adress: "N",
	city: "O",
	country: "P",
	email: "Q",
	firstContactNumber: "R",
	secondContactNumber: "S",
	emergencyContactName: "T",
	emergencyFirstContactNumber: "U",
	emergencyContactCountry: "V",
	relationship: "W",
	emergencyContactCity: "X",
	policyHolderName: "Y",
	policyHolderDate: "Z",
	policyIdNumber: "AA",
	policyHolderRelationship: "AB",
	planNumber: "AC",
};

const bmiMap: { [key: string]: string } = {
	patientName: "A",
	age: "B",
	patientHeight: "C",
	patientWeight: "D",
	bmi: "E",
};

class SpreadsheetView extends View<IAppState> {
	spreadsheet: Spreadsheet;

	data: TreeCollection;

	rows: number;

	init() {
		this.data = this.params.hospital;
		this.spreadsheet = new (dhx as any).Spreadsheet(null, {
			leftSplit: 1,
			topSplit: 1,
			menu: true,
		});
		this.spreadsheet.menu.data.add({
			id: "checkBMI",
			value: "Check BMI",
		});
		this.setData();
		this.initHandlers();
		return this.spreadsheet;
	}

	setData() {
		if (this.spreadsheet) {
			const preparedData = this.prepareData(this.data.serialize());
			this.spreadsheet.parse(preparedData);
		}
	}

	prepareData(data: any[]) {
		const patients = {
			name: "Patients",
			data: [
				{ cell: "A1", value: "Patient name", css: "bold" },
				{ cell: "B1", value: "Blood group", css: "bold" },
				{ cell: "C1", value: "Height (m)", css: "bold" },
				{ cell: "D1", value: "Weight (kg)", css: "bold" },
				{ cell: "E1", value: "Blood pressure", css: "bold" },
				{ cell: "F1", value: "Patient ID", css: "bold" },
				{ cell: "G1", value: "Allergies", css: "bold" },
				{ cell: "H1", value: "Chronic conditions", css: "bold" },
				{ cell: "I1", value: "Date of birth", css: "bold" },
				{ cell: "J1", value: "Employer", css: "bold" },
				{ cell: "K1", value: "Occupation", css: "bold" },
				{ cell: "L1", value: "Religion", css: "bold" },
				{ cell: "M1", value: "Nationality", css: "bold" },
				{ cell: "N1", value: "Address", css: "bold" },
				{ cell: "O1", value: "City", css: "bold" },
				{ cell: "P1", value: "Country", css: "bold" },
				{ cell: "Q1", value: "Email", css: "bold" },
				{ cell: "R1", value: "Contact N1", css: "bold" },
				{ cell: "S1", value: "Contact N2", css: "bold" },
				{ cell: "T1", value: "Name", css: "bold" },
				{ cell: "U1", value: "Contact No", css: "bold" },
				{ cell: "V1", value: "Country", css: "bold" },
				{ cell: "W1", value: "Relationship", css: "bold" },
				{ cell: "X1", value: "City", css: "bold" },
				{ cell: "Y1", value: "Policy holder name", css: "bold" },
				{ cell: "Z1", value: "Policy holder date of birth", css: "bold" },
				{ cell: "AA1", value: "Policy/Member ID number", css: "bold" },
				{ cell: "AB1", value: "Policy holder relationship to patient", css: "bold" },
				{ cell: "AC1", value: "Group/Plan number", css: "bold" },
			] as ICellInfo[],
		};
		const bmi = {
			name: "BMI",
			id: "bmi",
			data: [
				{ cell: "A1", value: "Patient name", css: "green-header" },
				{ cell: "B1", value: "Age", css: "green-header" },
				{ cell: "C1", value: "Height (m)", css: "green-header" },
				{ cell: "D1", value: "Weight (kg)", css: "green-header" },
				{ cell: "E1", value: "BMI (kg/m2)", css: "green-header" },
			] as ICellInfo[],
		};
		const preparedData = {
			styles: {
				"green-header": {
					background: "#34a853",
					color: "#FFFFFF",
					"font-weight": "bold",
				},
				"green-color": {
					color: "#34a853",
					"font-weight": "bold",
				},
				danger: {
					background: "#FF0000",
				},
				orange: {
					background: "#FFA500",
				},
				bold: {
					"font-weight": "bold",
				},
			},
			sheets: [patients, bmi],
		};
		const filteredData = data.filter(i => i.patientId);
		this.rows = filteredData.length + 2;
		for (let i = 0; i < filteredData.length; i++) {
			const item = filteredData[i];
			const row = i + 2;
			Object.keys(patientMap).forEach(key => {
				const cell: ICellInfo = { cell: `${patientMap[key]}${row}`, value: item[key] };
				if (key === "patientDateBrith" || key === "policyHolderDate") {
					cell.format = "date";
				}
				if (key.includes("Contact")) {
					cell.format = "text";
				}
				patients.data.push(cell);
			});
			Object.keys(bmiMap).forEach(key => {
				const cell: ICellInfo = {
					cell: `${bmiMap[key]}${row}`,
					value: `='Patients'!${patientMap[key]}${row}`,
				};
				if (key === "patientName") {
					cell.css = "green-color";
				}
				bmi.data.push(cell);
			});

			bmi.data.push({
				cell: `${bmiMap.age}${row}`,
				value: `=TRUNC((NOW()-'Patients'!${patientMap.patientDateBrith}${row})/365)`,
				format: "common",
			});

			bmi.data.push({
				cell: `${bmiMap.bmi}${row}`,
				value: `=ROUND(${bmiMap.patientWeight}${row}/(${bmiMap.patientHeight}${row}*${bmiMap.patientHeight}${row}),2)`,
			});
		}
		return preparedData;
	}

	checkBMI() {
		this.spreadsheet.setActiveSheet("bmi");
		this.spreadsheet.eachCell((cell: string, val: any) => {
			if (val >= 25 && +val < 30) {
				this.spreadsheet.setStyle(cell, "orange");
			}
			if (+val >= 30) {
				this.spreadsheet.setStyle(cell, "danger");
			}
		}, `${bmiMap.bmi}2:${bmiMap.bmi}${this.rows}`);
	}

	initHandlers() {
		this.spreadsheet.menu.events.on("click", id => {
			if (id === "checkBMI") {
				this.checkBMI();
			}
		});
	}
}

export default SpreadsheetView;
