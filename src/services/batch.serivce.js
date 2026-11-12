import batchRepository from "../repositories/batch.repository.js";
import medicineRepository from "../repositories/medicine.repository.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createBatch = async (data) => {
  // Check whether the medicine exists
  const medicine = await medicineRepository.findById(
    data.medicineId
  );

  if (!medicine) {
    throw new AppError("Medicine not found", 404);
  }

  // Check for duplicate batch number for this medicine
  const existingBatch =
    await batchRepository.findByMedicineAndBatchNumber(
      data.medicineId,
      data.batchNumber
    );

  if (existingBatch) {
    throw new AppError(
      "This batch number already exists for this medicine",
      409
    );
  }

  // Every new batch starts with zero stock.
  // Stock must be added through a PURCHASE movement.
  return batchRepository.create({
    medicineId: data.medicineId,
    batchNumber: data.batchNumber,
    expiryDate: new Date(`${data.expiryDate}T00:00:00.000Z`),
    quantity: 0
  });
};

const getBatches = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);

  const limit = Math.min(
    100,
    Math.max(1, Number(query.limit) || 10)
  );

  const medicineId = query.medicineId || undefined;

  const status = query.status || undefined;

  const skip = (page - 1) * limit;

  const filters = {
    skip,
    take: limit,
    medicineId,
    status
  };

  const [batches, total] = await Promise.all([
    batchRepository.findAll(filters),
    batchRepository.count({ medicineId, status })
  ]);

  return {
    batches,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getBatchById = async (id) => {
  const batch = await batchRepository.findById(id);

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }

  return batch;
};

const getBatchesByMedicine = async (medicineId) => {
  const medicine = await medicineRepository.findById(medicineId);

  if (!medicine) {
    throw new AppError("Medicine not found", 404);
  }

  return batchRepository.findByMedicineId(medicineId);
};

export default {
  createBatch,
  getBatches,
  getBatchById,
  getBatchesByMedicine
};