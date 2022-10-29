export type Views = "patients" | "doctors" | "certificate" | "BMI";

export type RowButton = "clear" | "edit";

export type WindowStatus = "add" | "edit";

type BedStatus = "occupied" | "available";

type DiagnosType = "Unspecified" | "Pneumonia" | "Flu" | "Meningitis" | "Sinusitis" | "Bronchitis";

type CareRequired = "Take samples" | "Give medications" | "Prep for surgery" | "Post-operation care";

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

type Gender = "male" | "female" | "other";

type EmploymentStatus = "worker" | "employee" | "self-employed" | "contractor" | "director" | "office holder";

type Insurance = "PPO" | "HMO" | "POS" | "EPOSe" | "HSA" | "HRAs";

export interface IAppStatus {
	available: boolean;
	occupied: boolean;
}

export interface IAppCareRequired {
	takeSamples: boolean;
	giveMedications: boolean;
	prepForSurgey: boolean;
	postOperationCare: boolean;
}

export interface IAppFilter {
	status: IAppStatus;
	careRequired: IAppCareRequired;
	diagnosis: string;
	admission: string;
	room: string;
}

export interface IAppState {
	view: Views;
	patientCard: IPatientState;
	selectedPersonalId: string;
	notificationsCount: number;
	filter: IAppFilter;
}

export interface IPersonalCard {
	photo: string;
	name: string;
	post: string;
	phone: string;
	mail: string;
	id: string | number;
	parent: string | number;
	open?: boolean;
}

export interface IRoomData {
	value: string;
	id: string;
}

export interface IHospitalStatistic {
	title: string;
	total: number;
	current: number;
}

interface IPatientState {
	open: boolean;
	id: string;
}

export interface IHospitalInfo {
	title: string;
	total: number;
	current: number;
}

export interface IPatientData {
	id: string;
	parent: string;
	bedNumber: string;
	status: BedStatus;
	patientName: string;
	diagnosis: DiagnosType;
	patientTemperature: number | string;
	bloodPressure: string;
	careRequired: CareRequired;
	doctor: string;
	admission: string;
	controls: RowButton[];
	room: string;

	insuranceType?: Insurance;
	planNumber?: string;
	policyHolderDate?: string;
	policyHolderName?: string;
	policyHolderRelationship?: string;
	policyIdNumber?: string;

	emergencyContactCity?: string;
	emergencyContactCountry?: string;
	emergencyContactName?: string;
	emergencyFirstContactNumber?: string;
	emergencySecondContactNumber?: string;
	relationship?: string;

	adress?: string;
	city?: string;
	country?: string;
	email?: string;
	firstContactNumber?: string;
	secondContactNumber?: string;

	patientAllergies?: string;
	patientBloodGroup?: BloodGroup;
	patientChronicCondition?: string;
	patientDateBrith?: string;
	patientEmployer?: string;
	patientEmploymentStatus?: EmploymentStatus;
	patientGender?: Gender;
	patientId?: string;
	patientNationality?: string;
	patientOccupation?: string;
	patientReligion?: string;
}
