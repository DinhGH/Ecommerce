const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const getUser = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const getUserPhone = async (phone) => {
  return await prisma.user.findUnique({
    where: { phone },
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      address: true,
      age: true,
      gender: true,
      avatar: true,
      role: true,
    },
  });
};

module.exports = { createUser, getUser, getUserPhone, getUserById };
