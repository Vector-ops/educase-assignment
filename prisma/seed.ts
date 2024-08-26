import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schools = [
	{
		name: "Green Valley School",
		address: "Kochi, Kerala",
		latitude: 9.9312,
		longitude: 76.2673,
	},
	{
		name: "Bright Future Academy",
		address: "Chennai, Tamil Nadu",
		latitude: 13.0827,
		longitude: 80.2707,
	},
	{
		name: "Himalayan International School",
		address: "Dehradun, Uttarakhand",
		latitude: 30.3165,
		longitude: 78.0322,
	},
	{
		name: "Eastern Heights School",
		address: "Guwahati, Assam",
		latitude: 26.1445,
		longitude: 91.7362,
	},
	{
		name: "Western Horizon School",
		address: "Jaisalmer, Rajasthan",
		latitude: 26.9157,
		longitude: 70.9083,
	},
	{
		name: "Central Public School",
		address: "Connaught Place, New Delhi",
		latitude: 28.6254,
		longitude: 77.2115,
	},
	{
		name: "St. Peter's School",
		address: "Karol Bagh, New Delhi",
		latitude: 28.6517,
		longitude: 77.1941,
	},
	{
		name: "Spring Valley School",
		address: "Paharganj, New Delhi",
		latitude: 28.6401,
		longitude: 77.213,
	},
	{
		name: "Holy Child Convent",
		address: "Janpath, New Delhi",
		latitude: 28.6058,
		longitude: 77.217,
	},
	{
		name: "Global Indian International School",
		address: "Dwarka, New Delhi",
		latitude: 28.6127,
		longitude: 77.1916,
	},
];

async function seedData() {
	await prisma.school.createMany({
		data: schools,
	});

	console.log(`Seeded ${schools.length} schools`);
}

async function main() {
	try {
		await seedData();
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
