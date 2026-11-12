import medicineService from "../services/medicine.service.js";

const createMedicine = async (req, res) => {
  const medicine = await medicineService.createMedicine(req.validatedBody);

  res.status(201).json({
    success: true,
    message: "Medicine created successfully",
    data: medicine
  });
};

const getMedicines = async (req, res) => {
  const result = await medicineService.getMedicines(req.query);

  res.status(200).json({
    success: true,
    data: result.medicines,
    pagination: result.pagination
  });
};

const getMedicineById = async (req, res) => {
  const medicine = await medicineService.getMedicineById(
    req.params.id
  );

  res.status(200).json({
    success: true,
    data: medicine
  });
};

const updateMedicine = async (req, res) => {
  const medicine = await medicineService.updateMedicine(
    req.params.id,
    req.validatedBody
  );

  res.status(200).json({
    success: true,
    message: "Medicine updated successfully",
    data: medicine
  });
};

const deleteMedicine = async (req, res) => {
  const result = await medicineService.deleteMedicine(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: result.message
  });
};

export default {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};