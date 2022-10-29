import { View } from "dhx-optimus";
import { DataView, TreeGridCollection } from "@lib/suite/suite";
import { IAppState, IHospitalInfo, IHospitalStatistic, IPatientData } from "@root/types";

import "./HospitalInfo.scss";

const template = ({ title, total, current }: IHospitalInfo) => {
	const rate = ((current / total) * 100).toFixed();
	return `
		<div class="dhx-dataview_template_e">
			<div class="dhx-dataview_template_e__content">
				<p class="dhx-dataview_template_e__title">${title}</p>
				<div class="dhx-dataview_template_e__indicators">
					<span class="dhx-dataview_template_e__compare">${current}/${total}</span>
					<span class="dhx-dataview_template_e__rate">${rate}%</span>
				</div>
			</div>
			<div class="dhx-dataview_template_e__progress-bar">
				<div class="dhx-dataview_template_e__progress-bar--scale" style="width:${rate}%"></div>
			</div>
		</div>
	`;
};

class HospitalInfo extends View<IAppState> {
	dataview: DataView;

	init() {
		const { hospital, doctorsLength, unsortedData } = this.params;

		this.dataview = new dhx.DataView(null, {
			template,
			itemsInRow: 1,
			selection: false,
			gap: 0,
			css: "dhx_dataview_template_e_box",
			data: this.getStatisticData(hospital, doctorsLength, this.getHospitalLength(unsortedData)),
		});

		this.params.hospital.events.on("change", () => {
			this.dataview.data.parse(
				this.getStatisticData(hospital, doctorsLength, this.getHospitalLength(unsortedData))
			);
		});

		return this.dataview;
	}

	getStatisticData(
		data: TreeGridCollection,
		doctorsLength: number,
		hospitalLength: number
	): IHospitalStatistic[] {
		const statistic: IHospitalStatistic[] = [];
		const assignedDoctors: string[] = [];
		let occupiedBeds: number = 0;

		data.forEach(({ bedNumber, status, doctor }) => {
			if (bedNumber && status === "occupied") {
				occupiedBeds++;
			}
			if (bedNumber && doctor && !assignedDoctors.includes(doctor) && doctor !== "-") {
				assignedDoctors.push(doctor);
			}
		});

		statistic.push(
			{
				title: "Beds occupied",
				total: hospitalLength,
				current: occupiedBeds,
			},
			{
				title: "Doctors assigned",
				total: doctorsLength,
				current: assignedDoctors.length,
			}
		);

		return statistic;
	}

	getHospitalLength(data: IPatientData[]): number {
		let count = 0;
		data.forEach(({ bedNumber, status }) => {
			if (bedNumber && status) {
				count++;
			}
		});
		return count;
	}
}

export default HospitalInfo;
