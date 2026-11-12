import express from "express";

import batchController from "../controllers/batch.controller.js";

import validate from "../middleware/validate.js";

import {
  createBatchSchema
} from "../validators/batch.validator.js";

const router = express.Router();

router.post(
  "/",
  validate(createBatchSchema),
  batchController.createBatch
);

router.get(
  "/",
  batchController.getBatches
);

router.get(
  "/medicine/:medicineId",
  batchController.getBatchesByMedicine
);

router.get(
  "/:id",
  batchController.getBatchById
);

export default router;