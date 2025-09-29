const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      include: {
        user: true, // nếu muốn lấy thông tin user
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.order.count(),
  ]);

  const totalPages = Math.ceil(totalOrders / limit);

  return { orders, totalPages };
};

const updateOrderStatus = async (orderId, status) => {
  const order = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status },
  });
  return order;
};

const deleteOrder = async (orderId) => {
  await prisma.orderItem.deleteMany({
    where: { orderId: Number(orderId) },
  });

  const order = await prisma.order.delete({
    where: { id: Number(orderId) },
  });
  return order;
};

const createOrder = async (data) => {
  // lấy danh sách product từ DB
  const productIds = data.items.map((i) => Number(i.productId));
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true, discountPercentage: true },
  });

  // tính giá cuối cùng cho từng item
  const itemsToCreate = data.items.map((i) => {
    const product = products.find((p) => p.id === Number(i.productId));
    if (!product) throw new Error(`Product not found: ${i.productId}`);

    let finalPrice = product.price;
    if (product.discountPercentage) {
      finalPrice = finalPrice * (1 - product.discountPercentage / 100);
    }

    return {
      productId: Number(i.productId),
      quantity: Number(i.quantity),
      price: finalPrice,
    };
  });

  const total = itemsToCreate.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return await prisma.order.create({
    data: {
      userId: Number(data.userId),
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
      recipientEmail: data.recipientEmail || null,
      address: data.address,
      altRecipientName: data.altRecipientName || null,
      altRecipientPhone: data.altRecipientPhone || null,
      deliveryTime: data.deliveryTime || null,
      proofImage: data.proofImage || null,
      total,
      status: data.status || "PENDING",
      items: { create: itemsToCreate },
    },
    include: { items: { include: { product: true } } },
  });
};

// ========== UPDATE ORDER ==========
const updateOrder = async (id, data) => {
  // lấy danh sách product từ DB
  const productIds = data.items.map((i) => Number(i.productId));
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true, discountPercentage: true },
  });

  const itemsToCreate = data.items.map((i) => {
    const product = products.find((p) => p.id === Number(i.productId));
    if (!product) throw new Error(`Product not found: ${i.productId}`);

    let finalPrice = product.price;
    if (product.discountPercentage) {
      finalPrice = finalPrice * (1 - product.discountPercentage / 100);
    }

    return {
      productId: Number(i.productId),
      quantity: Number(i.quantity),
      price: finalPrice,
    };
  });

  const total = itemsToCreate.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return await prisma.order.update({
    where: { id: Number(id) },
    data: {
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
      recipientEmail: data.recipientEmail || null,
      address: data.address,
      altRecipientName: data.altRecipientName || null,
      altRecipientPhone: data.altRecipientPhone || null,
      deliveryTime: data.deliveryTime || null,
      proofImage: data.proofImage || null,
      total,
      status: data.status,
      items: {
        deleteMany: {}, // xoá hết items cũ
        create: itemsToCreate,
      },
    },
    include: { items: { include: { product: true } } },
  });
};

module.exports = {
  updateOrderStatus,
  getOrders,
  deleteOrder,
  createOrder,
  updateOrder,
};
