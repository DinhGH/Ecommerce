const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrderService = async (userId, data, proofImage) => {
  const {
    recipientName,
    email,
    phone,
    altRecipientName,
    altPhone,
    houseNumber,
    street,
    ward,
    province,
    country,
    deliveryTime,
    items,
  } = data;

  // Ghép địa chỉ đầy đủ
  const fullAddress = `${houseNumber}, ${street}, ${ward}, ${province}, ${country}`;

  // Parse items JSON
  const parsedItems = JSON.parse(items);

  // Tính tổng tiền
  const total = parsedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // ✅ Xoá giỏ hàng của user sau khi checkout
  await prisma.cartItem.deleteMany({
    where: {
      cart: { userId: userId },
    },
  });

  // Tạo đơn hàng
  return await prisma.order.create({
    data: {
      userId,
      total,
      recipientName,
      recipientPhone: phone,
      recipientEmail: email,
      address: fullAddress,
      altRecipientName,
      altRecipientPhone: altPhone,
      deliveryTime,
      proofImage,
      status: "PENDING",
      items: {
        create: parsedItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });
};

const getOrdersByUserService = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getAllOrdersService = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  createOrderService,
  getAllOrdersService,
  getOrdersByUserService,
};
