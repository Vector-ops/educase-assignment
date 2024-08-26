export interface AddSchoolData {
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface ListSchoolParams {
	latitude: number;
	longitude: number;
	distance?: number;
}

export interface SchoolDataWithDistance {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	distance: number;
}

export interface ValidatedData extends AddSchoolData {
	errors: string[];
}

export interface ValidatedParams extends ListSchoolParams {
	errors: string[];
}
