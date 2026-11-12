import batchSerivce from "../services/batch.serivce.js";

const createBatch = async (req, res) => {
  const batch = await batchSerivce.createBatch(
    req.validatedBody
  );

  res.status(201).json({
    success: true,
    message: "Batch created successfully",
    data: batch
  });
};

const getBatches = async (req, res) => {
  const result = await batchSerivce.getBatches(req.query);

  res.status(200).json({
    success: true,
    data: result.batches,
    pagination: result.pagination
  });
};

const getBatchById = async (req, res) => {
  const batch = await batchSerivce.getBatchById(
    req.params.id
  );

  res.status(200).json({
    success: true,
    data: batch
  });
};

const getBatchesByMedicine = async (req, res) => {
  const batches = await batchSerivce.getBatchesByMedicine(
    req.params.medicineId
  );

  res.status(200).json({
    success: true,
    data: batches
  });
};

export default {
  createBatch,
  getBatches,
  getBatchById,
  getBatchesByMedicine
};