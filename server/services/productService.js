const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (data) => {
  return prisma.product.create({
    data,
    include: { reviews: true },
  });
};

// const getAllProducts = async () => {
//   return prisma.product.findMany({
//     include: { dimensions: true, reviews: true, meta: true },
//     orderBy: { id: "asc" },
//   });
// };

const getProducts = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
      include: { reviews: true },
    }),
    prisma.product.count(),
  ]);

  return {
    data: products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    include: { reviews: true },
  });
};

// ✅ Update product
const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id: Number(id) },
    data,
    include: { reviews: true },
  });
};

const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: { id: Number(id) },
  });
};

const createManyProducts = async (productsData) => {
  return await prisma.product.createMany({
    data: productsData,
    skipDuplicates: true,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createManyProducts,
};
