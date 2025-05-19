import { Router } from "express";
import {
  getAllByProcess,
  create,
  update,
  remove,
} from "../controllers/proceedingsController.js";

const router = Router();

router.get("/:processId", getAllByProcess);
router.post("/:processId", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
