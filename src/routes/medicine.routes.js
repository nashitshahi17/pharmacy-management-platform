import express from "express";

import medicineController from "../controllers/medicine.controller.js";

import validate from "../middleware/validate.js";

import {
  createMedicineSchema,
  updateMedicineSchema
} from "../validators/medicine.validator.js";

const router = express.Router();

router.post(
  "/",
  validate(createMedicineSchema),
  medicineController.createMedicine
);

router.get(
  "/",
  medicineController.getMedicines
);

router.get(
  "/:id",
  medicineController.getMedicineById
);

router.patch(
  "/:id",
  validate(updateMedicineSchema),
  medicineController.updateMedicine
);

router.delete(
  "/:id",
  medicineController.deleteMedicine
);

export default router;