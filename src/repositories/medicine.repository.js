import prisma from "../config/database.js";

const create = async (data) => {
  return prisma.medicine.create({
    data
  });
};

const findAll = async ({ skip, take, search }) => {
  return prisma.medicine.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sku: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        }
      : undefined,

    skip,
    take,

    orderBy: {
      createdAt: "desc"
    }
  });
};

const count = async (search) => {
  return prisma.medicine.count({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sku: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        }
      : undefined
  });
};

const findById = async (id) => {
  return prisma.medicine.findUnique({
    where: { id }
  });
};

const findBySku = async (sku) => {
  return prisma.medicine.findUnique({
    where: { sku }
  });
};

const update = async (id, data) => {
  return prisma.medicine.update({
    where: { id },
    data
  });
};

const deleteById = async (id) => {
  return prisma.medicine.delete({
    where: { id }
  });
};

const countBatches = async (medicineId) => {
  return prisma.batch.count({
    where: { medicineId }
  });
};

export default {
  create,
  findAll,
  count,
  findById,
  findBySku,
  update,
  deleteById,
  countBatches
};