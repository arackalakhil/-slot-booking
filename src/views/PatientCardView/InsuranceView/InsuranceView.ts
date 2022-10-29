import { View } from "dhx-optimus";
import { Form } from "@lib/suite/suite";
import { IAppState } from "@root/types";

class InsuranceView extends View<IAppState> {
	form: Form;

	private inputWidth = 240;

	init() {
		this.form = new dhx.Form(null, {
			padding: "20px 40px",
			height: 190,
			align: "between",
			cols: [
				{
					rows: [
						{
							type: "select",
							label: "Type of insurance",
							placeholder: "Select the type of insurance",
							width: this.inputWidth,
							options: [
								{
									value: "PPO",
									content: "PPO",
								},
								{
									value: "HMO",
									content: "HMO",
								},
								{
									value: "POS",
									content: "POS",
								},
								{
									value: "EPOSe",
									content: "EPOSe",
								},
								{
									value: "HSA",
									content: "HSA",
								},
								{
									value: "HRAs",
									content: "HRAs",
								},
							],
							name: "insuranceType",
						},
						{
							type: "input",
							label: "Policy holder name",
							placeholder: "Enter the policy holder name",
							width: this.inputWidth,
							name: "policyHolderName",
						},
					],
				},
				{
					rows: [
						{
							type: "datepicker",
							label: "Policy holder date of birth",
							placeholder: "Select date",
							width: this.inputWidth,
							dateFormat: "%d/%m/%Y",
							name: "policyHolderDate",
						},
						{
							type: "input",
							label: "Policy holder relationship to patient",
							placeholder: "Enter the policy holder",
							width: this.inputWidth,
							name: "policyHolderRelationship",
						},
					],
				},
				{
					rows: [
						{
							type: "input",
							label: "Policy/Member ID number",
							placeholder: "Enter the policy/member ID number",
							width: this.inputWidth,
							name: "policyIdNumber",
						},
						{
							type: "input",
							label: "Group/Plan number",
							placeholder: "Enter the group/plan number",
							width: this.inputWidth,
							name: "planNumber",
						},
					],
				},
			],
		});

		return this.form;
	}
}

export default InsuranceView;
