import {
	AddSchoolData,
	ListSchoolParams,
	ValidatedData,
	ValidatedParams,
} from "@/types";

export const validateAddSchoolData = ({
	name,
	address,
	latitude,
	longitude,
	...restData
}: AddSchoolData): ValidatedData => {
	let errors: string[] = [];
	if (!isvalidName(name)) {
		errors.push(
			"Name should be a string with minimum 5 and maximum 30 characters"
		);
	}

	if (!isvalidAddress(address)) {
		errors.push(
			"Address should be a string with minimum 5 and maximum 100 characters"
		);
	}

	if (!isValidLatitude(latitude)) {
		errors.push("Latitude must be a number between -90 and 90 degrees.");
	}
	if (!isValidLongitude(longitude)) {
		errors.push("Longitude must be a number between -180 and 180 degrees.");
	}
	return {
		name,
		address,
		latitude,
		longitude,
		errors,
	};
};

function isValidLatitude(lat: number): boolean {
	return typeof lat === "number" && lat >= -90 && lat <= 90;
}

function isValidLongitude(lon: number): boolean {
	return typeof lon === "number" && lon >= -180 && lon <= 180;
}

function isvalidName(name: string): boolean {
	return typeof name === "string" && name.length > 5 && name.length < 50;
}
function isvalidAddress(address: string): boolean {
	return (
		typeof address === "string" &&
		address.length > 5 &&
		address.length < 100
	);
}

export const validateSchoolParams = ({
	latitude,
	longitude,
	distance,
	...restParams
}: ListSchoolParams): ValidatedParams => {
	let errors: string[] = [];

	if (!isValidLatitude(latitude)) {
		errors.push("Latitude must be a number between -90 and 90 degrees.");
	}
	if (!isValidLongitude(longitude)) {
		errors.push("Longitude must be a number between -180 and 180 degrees.");
	}
	if ((distance && typeof distance !== "number") || distance! < 0) {
		errors.push("Distance must be a positive number.");
	} else if (!distance) {
		distance = 1000;
	}
	return {
		latitude,
		longitude,
		distance,
		errors,
	};
};
