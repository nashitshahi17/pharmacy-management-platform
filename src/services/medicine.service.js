import medicineRepository from "../repositories/medicine.repository.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createMedicine = async (data) => {
  const existingMedicine = await medicineRepository.findBySku(
    data.sku
  );

  if (existingMedicine) {
    throw new AppError(
      "A medicine with this SKU already exists",
      409
    );
  }

  return medicineRepository.create(data);
};

const getMedicines = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);

  const limit = Math.min(
    100,
    Math.max(1, Number(query.limit) || 10)
  );

  const search = query.search?.trim() || undefined;

  const skip = (page - 1) * limit;

  const [medicines, total] = await Promise.all([
    medicineRepository.findAll({
      skip,
      take: limit,
      search
    }),

    medicineRepository.count(search)
  ]);

  return {
    medicines,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getMedicineById = async (id) => {
  const medicine = await medicineRepository.findById(id);

  if (!medicine) {
    throw new AppError("Medicine not found", 404);
  }

  return medicine;
};

const updateMedicine = async (id, data) => {
  const medicine = await medicineRepository.findById(id);

  if (!medicine) {
    throw new AppError("Medicine not found", 404);
  }

  if (data.sku && data.sku !== medicine.sku) {
    const existing = await medicineRepository.findBySku(data.sku);

    if (existing) {
      throw new AppError("SKU already exists", 409);
    }
  }

  return medicineRepository.update(id, data);
};

const deleteMedicine = async (id) => {
  const medicine = await medicineRepository.findById(id);

  if (!medicine) {
    throw new AppError("Medicine not found", 404);
  }

  const batchCount = await medicineRepository.countBatches(id);

  if (batchCount > 0) {
    throw new AppError(
      "Cannot delete medicine because batches are associated with it",
      409
    );
  }

  await medicineRepository.deleteById(id);

  return {
    message: "Medicine deleted successfully"
  };
};

export default {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};