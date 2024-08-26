import prisma from "@/lib/prisma";
import {
	AddSchoolData,
	ListSchoolParams,
	SchoolDataWithDistance,
	ValidatedData,
	ValidatedParams,
} from "@/types";
import { logger } from "@/utils/logger";
import { validateAddSchoolData, validateSchoolParams } from "@/utils/validator";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

/**
 * @desc Add new school
 * @route POST /api/v1/addSchool
 * @access Public
 * @returns {message: string}
 */
export const addSchool = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, address, latitude, longitude, errors }: ValidatedData =
			validateAddSchoolData(req.body);

		if (errors.length !== 0) {
			return next(createHttpError.BadRequest(errors[0]));
		}
		const school = await prisma.school.findFirst({
			where: {
				name: name,
				latitude,
				longitude,
				address,
			},
		});
		if (school) {
			return next(
				createHttpError.BadRequest(
					"School with that name already exists."
				)
			);
		}
		await prisma.school.create({
			data: {
				name,
				address,
				latitude,
				longitude,
			},
		});

		return res.status(201).json({ message: "School added successfully." });
	} catch (error) {
		logger.error(error);
		console.error(error);
		return next(
			createHttpError.InternalServerError("Failed to add school")
		);
	}
};

export const listSchools = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { lat, lon, dis } = req.query;

		const { latitude, longitude, distance, errors }: ValidatedParams =
			validateSchoolParams({
				latitude: parseFloat(lat as string),
				longitude: parseFloat(lon as string),
				distance: parseInt(dis as string),
			});

		if (errors.length > 0) {
			return next(createHttpError.BadRequest(errors[0]));
		}

		const schools: SchoolDataWithDistance[] = await prisma.$queryRaw<
			SchoolDataWithDistance[]
		>`
    SELECT id, name, address, latitude, longitude, distance
FROM (
    SELECT id, name, address, latitude, longitude,
        (6371 * acos(
            cos(radians(${latitude})) * cos(radians(latitude)) * 
            cos(radians(longitude) - radians(${longitude})) + 
            sin(radians(${latitude})) * sin(radians(latitude))
        )) AS distance
    FROM School
) AS calculated_distances
WHERE distance <= ${distance}
ORDER BY distance ASC
LIMIT 10;

`;

		if (!schools) {
			return next(createHttpError.BadRequest("Failed to fetch schools."));
		}

		return res.status(200).json({
			schools,
		});
	} catch (error) {
		logger.error(error);
		console.error(error);
		return next(
			createHttpError.InternalServerError("Failed to get schools.")
		);
	}
};
