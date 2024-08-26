import { addSchool, listSchools } from "@/controllers/school.controller";
import { Router } from "express";

const router = Router();

router.route("/addSchool").post(addSchool);
router.route("/listSchools").get(listSchools);

export default router;
