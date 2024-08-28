import { Router } from "express";
import { addSchool, listSchools } from "../controllers/school.controller";

const router = Router();

router.route("/addSchool").post(addSchool);
router.route("/listSchools").get(listSchools);

export default router;
