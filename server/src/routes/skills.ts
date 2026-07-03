import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getSkillsController } from "../controllers/skillsControllers/getSkills.controller";
import { createSkillController } from "../controllers/skillsControllers/createSkill.controller";
import { deleteSkillController } from "../controllers/skillsControllers/deleteSkill.controller";
import { addUserSkillController } from "../controllers/skillsControllers/addUserSkill.controller";
import { removeUserSkillController } from "../controllers/skillsControllers/removeUserSkill.controller";

const SkillsRouter = Router();

SkillsRouter.get("/", getSkillsController);
SkillsRouter.post("/", protect, createSkillController);
SkillsRouter.delete("/:skillId", protect, deleteSkillController);
SkillsRouter.post("/user/add", protect, addUserSkillController);
SkillsRouter.post("/user/remove", protect, removeUserSkillController);

export default SkillsRouter;