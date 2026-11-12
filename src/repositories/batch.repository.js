import prisma from "../config/database.js";

const create = async (data) => {
  return prisma.batch.create({
    data
  });
};

const findAll = async ({ skip, take, medicineId, status }) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const where = {
    ...(medicineId && { medicineId }),

    ...(status === "expired" && {
      expiryDate: {
        lt: today
      }
    }),

    ...(status === "active" && {
      expiryDate: {
        gte: today
      }
    })
  };

  return prisma.batch.findMany({
    where,
    skip,
    take,

    include: {
      medicine: {
        select: {
          id: true,
          sku: true,
          name: true,
          strength: true
        }
      }
    },

    orderBy: {
      expiryDate: "asc"
    }
  });
};

const count = async ({ medicineId, status }) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const where = {
    ...(medicineId && { medicineId }),

    ...(status === "expired" && {
      expiryDate: {
        lt: today
      }
    }),

    ...(status === "active" && {
      expiryDate: {
        gte: today
      }
    })
  };

  return prisma.batch.count({ where });
};

const findById = async (id) => {
  return prisma.batch.findUnique({
    where: { id },

    include: {
      medicine: true
    }
  });
};

const findByMedicineAndBatchNumber = async (
  medicineId,
  batchNumber
) => {
  return prisma.batch.findUnique({
    where: {
      medicineId_batchNumber: {
        medicineId,
        batchNumber
      }
    }
  });
};

const findByMedicineId = async (medicineId) => {
  return prisma.batch.findMany({
    where: { medicineId },

    orderBy: {
      expiryDate: "asc"
    }
  });
};

const deleteById = async (id) => {
  return prisma.batch.delete({
    where: { id }
  });
};

export default {
  create,
  findAll,
  count,
  findById,
  findByMedicineAndBatchNumber,
  findByMedicineId,
  deleteById
};